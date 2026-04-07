import { motion } from "framer-motion";
import { ArrowRight, Mail, Route, Truck } from "lucide-react";
import type React from "react";

interface PrintFlowHeroProps {
  onStartRouting?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const PrintFlowHero: React.FC<PrintFlowHeroProps> = ({ onStartRouting }) => {
  return (
    <section className="w-full border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16"
        >
          {/* Left side - Text content */}
          <motion.div variants={itemVariants} className="space-y-6 lg:w-1/2">
            <span className="badge">Print routing SaaS</span>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Automatic print routing — from order to doorstep
            </h1>
            <p className="max-w-xl text-pretty text-slate-300">
              Submit a print order via API or portal. The Print Route matches it to the best available provider based on format, material, destination, and price — then tracks fulfillment end-to-end.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://app.theprintroute.com"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open app
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <button
                className="text-sm text-slate-400 hover:text-slate-200"
                type="button"
                onClick={onStartRouting}
              >
                See how it works ↓
              </button>
            </div>
          </motion.div>

          {/* Right side - Flow diagram */}
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <div className="relative">
              {/* Connecting line - hidden on mobile, visible on desktop */}
              <div className="hidden lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:block">
                <div className="h-0.5 bg-gradient-to-r from-sky-500 via-emerald-500 to-purple-500" />
              </div>

              {/* Flow steps */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-4">
                {/* Step 1: Intake */}
                <motion.article
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative z-10 rounded-xl border border-slate-800 bg-slate-950/90 p-4 backdrop-blur-sm lg:w-1/3"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300">
                    <Mail className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                    <span>API / Portal</span>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-100">
                    Submit Order
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    REST API or web portal. Format, material, quantity, destination — tokens debited on confirmation.
                  </p>
                </motion.article>

                {/* Step 2: Routing */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="relative z-10 rounded-xl border border-slate-800 bg-slate-950/90 p-4 backdrop-blur-sm lg:w-1/3"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-900/40 px-2.5 py-1 text-xs text-emerald-200">
                    <Route className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                    <span>Provider Matching</span>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-100">
                    Capability + Price Routing
                  </h3>
                  <div className="space-y-1.5 text-xs leading-relaxed text-slate-300">
                    <p>
                      Matches by{" "}
                      <span className="font-semibold text-slate-50">
                        format, material, country
                      </span>
                    </p>
                    <p>
                      Selects{" "}
                      <span className="font-semibold text-slate-50">
                        lowest total cost
                      </span>{" "}
                      among eligible providers
                    </p>
                  </div>
                </motion.article>

                {/* Step 3: Fulfillment */}
                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="relative z-10 rounded-xl border border-slate-800 bg-slate-950/90 p-4 backdrop-blur-sm lg:w-1/3"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-900/40 px-2.5 py-1 text-xs text-indigo-200">
                    <Truck className="h-3.5 w-3.5 text-indigo-300" aria-hidden="true" />
                    <span>Fulfillment</span>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-100">
                    Fulfillment &amp; Tracking
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Provider accepts, produces, and ships. Tracking number flows back to you via webhook.
                  </p>
                  {/* Animated truck icon */}
                  <motion.div
                    className="mt-3 flex justify-center"
                    animate={{
                      x: [0, 8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Truck className="h-5 w-5 text-sky-400" aria-hidden="true" />
                  </motion.div>
                </motion.article>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrintFlowHero;
