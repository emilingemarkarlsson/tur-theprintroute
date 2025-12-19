# SEO Optimizations - Setup Guide

Denna sida har optimerats med omfattande SEO-förbättringar för både traditionell sökmotoroptimering och LLM/AI-sökning.

## Genomförda optimeringar

### 1. Meta Tags & Open Graph
- ✅ Komplett meta-tagg struktur i `index.html`
- ✅ Open Graph tags för social media delning
- ✅ Twitter Card tags
- ✅ Dynamiska meta-taggar via custom SEO-komponent (React 19-kompatibel)

### 2. Structured Data (JSON-LD)
Följande Schema.org strukturerad data har lagts till för bättre LLM/AI-sökning:
- ✅ SoftwareApplication schema
- ✅ Organization schema
- ✅ WebSite schema med SearchAction
- ✅ BreadcrumbList schema

### 3. Semantisk HTML
- ✅ Korrekt heading hierarchy (h1, h2, h3)
- ✅ Semantiska element (`<article>`, `<section>`, `<nav>`, `<main>`)
- ✅ Förbättrad tillgänglighet med ARIA labels

### 4. Tekniska SEO-filer
- ✅ `robots.txt` - Sökmotorinstruktioner
- ✅ `sitemap.xml` - Sitemap för sökmotorer
- ✅ Canonical URLs

### 5. Performance & Core Web Vitals
- ✅ Preconnect/DNS-prefetch för externa resurser
- ✅ Optimerad viewport-inställningar

## Konfiguration

### Miljövariabler

För att konfigurera bas-URL för SEO-taggar, lägg till i `.env`:

```bash
VITE_SITE_URL=https://theprintroute.com
```

Om inte satt, används den aktuella window.location.origin automatiskt.

### Domain Configuration

Uppdatera följande filer med din produktions-URL:

1. **index.html** - Uppdatera canonical, og:url, twitter:url
2. **public/sitemap.xml** - Uppdatera `<loc>` med din domän
3. **public/robots.txt** - Uppdatera Sitemap-URL
4. **src/components/SEO.tsx** - Standardvärden för defaultImage och defaultUrl

### OG Image

Skapa en Open Graph-bild (`og-image.jpg`) och lägg den i `public/` mappen:
- Rekommenderad storlek: 1200x630px
- Format: JPG eller PNG
- Filnamn: `og-image.jpg`

## Installation

Efter att ha klonat repot, installera dependencies:

```bash
cd frontend
npm install
```

**Notera:** Vi använder en custom SEO-komponent som fungerar med React 19, utan externa dependencies. Lösningen manipulerar direkt DOM:en via `useEffect` för att sätta meta-taggar och structured data.

## Verifiering

### 1. Testa Meta Tags
Använd verktyg som:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. Testa Structured Data
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 3. Testa robots.txt och sitemap
- Gå till `https://yourdomain.com/robots.txt`
- Gå till `https://yourdomain.com/sitemap.xml`

### 4. Lighthouse SEO Audit
Kör Lighthouse i Chrome DevTools:
- Öppna DevTools → Lighthouse → SEO
- Verifiera att alla SEO-kriterier är gröna

## Ytterligare förbättringar (valfritt)

### Dynamisk Sitemap Generation
För flersidiga sajter, överväg att generera sitemap dynamiskt:
- Installera `sitemap` paketet
- Skapa en endpoint eller build-time script

### Multilingual Support
För flerspråkig sajt:
- Lägg till `hreflang` tags i SEO-komponenten
- Uppdatera lang-attribute dynamiskt

### Analytics Integration
Överväg att lägga till:
- Google Analytics 4
- Google Search Console verifiering
- Microsoft Clarity eller liknande

## Noteringar för LLM/AI-sökning

Strukturerad data (JSON-LD) är särskilt viktig för LLM-baserade sökmotorer:
- Schema.org markup hjälper AI:er att förstå innehållet
- Tydlig heading hierarchy gör innehållet lättare att indexera
- Beskrivande meta-taggar ger kontext till AI-modeller

## Support

För frågor om SEO-konfiguration, se dokumentationen för:
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
