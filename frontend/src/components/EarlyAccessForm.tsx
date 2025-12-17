import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import type React from "react";

interface EarlyAccessFormProps {
  webhookUrl?: string;
}

// Rate limiting: max 3 submissions per 10 minutes
const MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds

export const EarlyAccessForm: React.FC<EarlyAccessFormProps> = ({
  webhookUrl,
}) => {
  const defaultWebhookUrl = webhookUrl || import.meta.env.VITE_N8N_WEBHOOK_URL || "";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field (should be empty)
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "rate-limited">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submissionsRef = useRef<number[]>([]);

  // Clean up old submissions from rate limit tracking
  useEffect(() => {
    const now = Date.now();
    submissionsRef.current = submissionsRef.current.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Honeypot check - if this field is filled, it's a bot
    if (formData.website) {
      console.warn("Spam detected: honeypot field filled");
      setStatus("error");
      setErrorMessage("Spam detected. Please try again.");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    
    // Rate limiting check
    const now = Date.now();
    submissionsRef.current = submissionsRef.current.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    
    if (submissionsRef.current.length >= MAX_SUBMISSIONS) {
      const minutesLeft = Math.ceil(
        (RATE_LIMIT_WINDOW - (now - submissionsRef.current[0])) / 60000
      );
      setStatus("rate-limited");
      setErrorMessage(`Too many submissions. Please wait ${minutesLeft} minute(s) before trying again.`);
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    
    if (!defaultWebhookUrl) {
      setErrorMessage("Webhook URL is not configured. Please set VITE_N8N_WEBHOOK_URL in your .env file.");
      setStatus("error");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    
    setStatus("submitting");

    try {
      const response = await fetch(defaultWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
          source: "the-print-route-website",
        }),
      });

      if (response.ok) {
        // Track successful submission
        submissionsRef.current.push(now);
        setStatus("success");
        setFormData({ name: "", email: "", message: "", website: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage("Failed to send message. Please try again later.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-md space-y-4">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div>
        <textarea
          placeholder="Tell us about your use case..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
        />
      </div>
      {/* Honeypot field - hidden from users, bots will fill it */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {errorMessage && (
        <div className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-4 py-2">
          {errorMessage}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "submitting" || status === "rate-limited"}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          "Sending..."
        ) : status === "success" ? (
          "✓ Sent! We'll be in touch soon."
        ) : status === "rate-limited" ? (
          "Too many requests - please wait"
        ) : status === "error" ? (
          "Error - please try again"
        ) : (
          <>
            Send us your routing scenario
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default EarlyAccessForm;

