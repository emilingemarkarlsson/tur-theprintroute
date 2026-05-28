---
title: "CMYK vs RGB file preparation for EU print-on-demand: avoiding colour shift on your orders"
description: "Files designed in RGB look different when printed in CMYK. Here is how to prepare your print-on-demand files correctly for EU suppliers and avoid the colour shifts that ruin otherwise good designs."
publishDate: 2026-05-07
tags: ["CMYK", "RGB", "print-on-demand", "file preparation", "colour management"]
author: The Print Route
draft: false
---

You designed a t-shirt with a vivid electric blue. The mockup looks sharp. The print arrives and the blue is dull, slightly grey-green, and nothing like what you saw on screen.

This is the CMYK problem. Almost every new print-on-demand seller runs into it once. Here is what it is and how to prevent it from happening again.

## Why the Colour Shift Happens

Screens display colour using light — red, green, and blue channels combined at varying intensities. This is RGB mode. You can produce extremely bright, saturated colours in RGB because you are working with light itself.

Printers work differently. They use physical inks: cyan, magenta, yellow, and black (CMYK). Ink absorbs light rather than emitting it. The colour gamut — the range of colours physically producible — is smaller than what a screen can display.

When you save an RGB file and send it to a printer, the print driver or RIP software converts the colours to CMYK at print time. That conversion is automatic and often imprecise. Colours outside the CMYK gamut are shifted to the nearest printable equivalent — and that equivalent is almost always duller.

Neon pinks, electric blues, and vivid greens are the most vulnerable. They live at the edge of the CMYK gamut or outside it entirely.

## Designing in CMYK From the Start

The most reliable solution is to design in CMYK mode so you see exactly what the printer will produce while you work.

In Adobe Photoshop: **Image → Mode → CMYK Color** before you start designing, or convert early before committing to colour choices.

In Adobe Illustrator: **File → Document Color Mode → CMYK Color** at the start of your project.

In Affinity Designer or Photo: set the document colour profile to a CMYK profile (ISO Coated v2 is standard for European offset printers; sRGB profiles are for screens).

Canva works in RGB only. If you design in Canva for print, you should expect some colour shift on saturated colours. For straightforward designs with desaturated palettes — blacks, whites, earth tones — the shift is minimal. For bright, saturated work, use Photoshop or Illustrator.

## The EU Standard: ISO Coated v2 (FOGRA39)

European commercial printers and most EU print-on-demand suppliers use the **ISO Coated v2** colour profile (also known as FOGRA39). This is the standard for coated paper stock across the EU.

When you prepare files in CMYK, assign this profile:
- In Photoshop: **Edit → Convert to Profile → ISO Coated v2 (FOGRA39)**
- In Illustrator: **Edit → Assign Profile → ISO Coated v2**

If you are working with an EU supplier that uses a different profile (some DTG printers use custom profiles), they should provide it. Download it and apply it before submitting your file.

## Soft Proofing: See the Print Before You Print

Soft proofing simulates on screen how your file will look when printed in a specific colour profile. It is not perfect — your screen is still emitting light — but it reveals colour shifts before you submit.

In Photoshop: **View → Proof Setup → Custom** → select ISO Coated v2 → then **View → Proof Colors** (Ctrl+Y / Cmd+Y). Your image now shows an approximation of the printed result.

Colours that look noticeably different in soft proof mode are colours that will shift. Adjust them now rather than after a failed print run.

## Preparing Your File for Submission

For most EU print-on-demand suppliers, the expected file format is:

- **Format:** PDF or TIFF (not JPEG — JPEG has compression artefacts that degrade print quality)
- **Colour mode:** CMYK
- **Resolution:** 300 DPI at print size (not screen resolution — 300 pixels per inch at the actual physical dimensions of the final product)
- **Bleed:** 3mm on all sides for products with bleed (full-coverage prints, packaging)
- **Embedded profile:** ISO Coated v2 embedded in the file

If you are submitting a transparent PNG for DTG (direct-to-garment) apparel, the transparency is preserved but the RGB colours will be converted on the supplier's end. Request the supplier's colour profile and soft proof accordingly.

## Checking Your Existing Files

If you have existing designs in RGB that are already selling, it is worth checking each one for colour shift risk before your next reorder or supplier change.

Open the file in Photoshop, soft proof with ISO Coated v2, and look for:
- Blues and purples that become visibly duller
- Greens that shift toward yellow-green
- Neons that lose their intensity

For those files, create a CMYK version with adjusted colours. Keep both — the RGB original for web mockups, the CMYK version for print submission.

The preparation step takes 10–15 minutes per design. The alternative is receiving a print run that requires rejection and reorder. The preparation is worth it.

## Quick Reference: EU Print-on-Demand File Checklist

- [ ] Colour mode: CMYK
- [ ] Colour profile: ISO Coated v2 (FOGRA39)
- [ ] Resolution: 300 DPI at print dimensions
- [ ] Format: PDF or TIFF (not JPEG)
- [ ] Bleed: 3mm if required
- [ ] Soft proofed against ISO Coated v2 before submission
- [ ] Neon/electric colours adjusted to CMYK equivalents
