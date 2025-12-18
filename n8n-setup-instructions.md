# n8n Workflow Setup - Early Access Form

Detta workflow tar emot formulärdata från hemsidan och skickar den till en Slack-kanal.

## Steg 1: Importera Workflow i n8n

1. Öppna din n8n-instans
2. Klicka på "Workflows" i menyn
3. Klicka på "Import from File" eller "Import from URL"
4. Välj filen `tur-contactnotificationtoslack.json` (eller liknande)
5. Workflow kommer att importeras med 4 noder:
   - **Webhook** - Tar emot POST requests (/webhook/contact)
   - **Format for Slack** - Formaterar meddelandet
   - **Post to Slack** - Skickar till Slack (kanal: #all-tur-ab)
   - **Respond to Webhook** - Svarar till hemsidan

## Steg 2: Konfigurera Slack

1. Klicka på "Post to Slack" noden
2. Klicka på "Create New Credential" eller använd befintlig Slack OAuth2 credential
3. Följ instruktionerna för att autentisera med Slack
4. Välj kanal (t.ex. `#all-tur-ab`) eller använd miljövariabel `SLACK_CHANNEL`

## Steg 3: Aktivera Webhook

1. Klicka på "Webhook" noden
2. Klicka på "Listen for Test Event" eller "Execute Workflow"
3. Webhook URL:en är: `https://n8n.theunnamedroads.com/webhook/contact`
4. Denna URL behöver du i nästa steg

## Steg 4: Konfigurera Frontend

1. Skapa en `.env` fil i `frontend/` mappen:
```bash
VITE_N8N_WEBHOOK_URL=https://n8n.theunnamedroads.com/webhook/contact
```

2. Starta om dev-servern:
```bash
npm run dev
```

## Steg 5: Testa

1. Gå till hemsidan
2. Scrolla ner till "Early access" sektionen
3. Fyll i formuläret (namn, email, meddelande)
4. Klicka på "Send us your routing scenario"
5. Kontrollera att meddelandet kommer till Slack-kanalen

## Workflow-struktur

```
Webhook (POST) 
  → Format for Slack (JavaScript)
    → Post to Slack
      → Respond to Webhook (JSON response)
```

## Anpassning

### Ändra Slack-kanal
- I n8n: Redigera "Post to Slack" noden och ändra `channel` parameter
- Eller sätt miljövariabel `SLACK_CHANNEL` i n8n

### Ändra meddelandeformat
- Redigera "Format for Slack" noden för att ändra hur meddelandet ser ut

### Lägg till fler fält
1. Uppdatera `EarlyAccessForm.tsx` med nya fält
2. Uppdatera "Format for Slack" noden i n8n för att inkludera nya fält

## Felsökning

**Problem: Data visar "Not provided" i Slack**
- Öppna "Format for Slack" noden i n8n
- Klicka på "Execute Node" för att se vad som kommer in
- Kontrollera output från Webhook-noden - data kan ligga i `body` eller direkt i root
- Om data ligger i `body`, uppdatera koden till: `const data = $input.item.json.body;`
- Om data ligger direkt i root, använd: `const data = $input.item.json;`
- Den uppdaterade workflow-filen hanterar båda fallen automatiskt

**Problem: Webhook svarar inte**
- Kontrollera att workflow är aktiverad i n8n
- Kontrollera att webhook URL:en är korrekt

**Problem: Meddelanden kommer inte till Slack**
- Kontrollera Slack-autentisering i n8n
- Kontrollera att kanalnamnet är korrekt
- Kontrollera att bot har behörighet att skriva i kanalen

**Problem: CORS-fel i webbläsaren**
- Kontrollera att n8n tillåter requests från din domän
- Lägg till din domän i n8n CORS-inställningar

