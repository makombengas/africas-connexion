#  Africa's Connexion

![Africa's Connexion Banner](/public/images/screenShot/screen_one.jpg)

 **Hinweis:** Dies ist ein persönliches Lernprojekt zur Entwicklung meiner Programmierfähigkeiten. Die Anwendung ist nicht für kommerzielle Zwecke bestimmt.

##  Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologie-Stack](#technologie-stack)
- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Verwendete Abhängigkeiten](#verwendete-abhängigkeiten)
- [Projektstruktur](#projektstruktur)
- [Entwicklung](#entwicklung)
- [Lizenz](#lizenz)

## Über das Projekt

**Africa's Connexion** ist eine moderne Chat- und Video-Streaming-Anwendung, die mit Next.js 15 entwickelt wurde. Das Projekt dient als praktische Übung zur Vertiefung meiner Kenntnisse in modernen Web-Technologien, Echtzeit-Kommunikation und Video-Streaming.

### Lernziele

- Implementierung von Echtzeit-Chat-Funktionalität
- Integration von Video-Streaming
- Benutzerauthentifizierung und -verwaltung
- Moderne UI/UX-Gestaltung mit React und Tailwind CSS
- State Management mit Convex

##  Features

-  **Echtzeit-Chat**: Sofortige Nachrichtenübermittlung zwischen Benutzern
- 🎥 **Video-Streaming**: Integrierte Video-Call-Funktionalität
-  **Authentifizierung**: Sichere Benutzeranmeldung mit Clerk
-  **Modernes UI**: Responsive Design mit Radix UI-Komponenten
-  **Performance**: Optimiert mit Next.js 15
-  **Echtzeit-Datenbank**: Powered by Convex

## Screenshots

### Authentifizierung
![Startseite](/public/images/screenShot/auth.jpg)

### Chat-Interface
![Chat-Interface](/public/images/screenShot/chat.jpg)

### Video-Call
![Video-Call](/public/images/screenShot/video.jpg)


## 🛠 Technologie-Stack

### Frontend
- **Framework**: Next.js 15.5.2
- **UI-Library**: React 19.1.0
- **Styling**: Tailwind CSS
- **Komponenten**: Radix UI
- **Icons**: Lucide React, React Icons

### Backend & Services
- **Datenbank**: Convex
- **Authentifizierung**: Clerk
- **Video**: Stream.io Video SDK
- **Chat**: Stream Chat React

### Utility-Bibliotheken
- **Styling-Utilities**: clsx, class-variance-authority, tailwind-merge

## Voraussetzungen

Bevor du beginnst, stelle sicher, dass folgende Software installiert ist:

- **Node.js**: Version 18.x oder höher
- **npm** oder **yarn** oder **pnpm**
- **Git**: Zur Versionsverwaltung

## Installation

### 1. Repository klonen

```bash
git clone https://github.com/dein-username/africas-connexion.git
cd africas-connexion
```

### 2. Abhängigkeiten installieren

```bash
npm install
# oder
yarn install
# oder
pnpm install
```

### 3. Umgebungsvariablen einrichten

Erstelle eine `.env.local`-Datei im Projektstammverzeichnis:

```env
# Clerk Authentifizierung
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=dein_clerk_publishable_key
CLERK_SECRET_KEY=dein_clerk_secret_key

# Convex
NEXT_PUBLIC_CONVEX_URL=dein_convex_url
CONVEX_DEPLOYMENT=dein_convex_deployment

# Stream.io
NEXT_PUBLIC_STREAM_API_KEY=dein_stream_api_key
STREAM_SECRET_KEY=dein_stream_secret_key
```

### 4. Convex einrichten

```bash
npx convex dev
```

### 5. Entwicklungsserver starten

```bash
npm run dev
# oder
yarn dev
# oder
pnpm dev
```

Die Anwendung ist nun unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Verwendete Abhängigkeiten

### Produktions-Abhängigkeiten

| Paket | Version | Beschreibung |
|-------|---------|--------------|
| `@clerk/nextjs` | ^6.31.9 | Authentifizierungs- und Benutzerverwaltung |
| `@radix-ui/react-dialog` | ^1.1.15 | Modale Dialoge und Overlays |
| `@radix-ui/react-separator` | ^1.1.7 | Visuelle Trennelemente |
| `@radix-ui/react-slot` | ^1.2.3 | Komponenten-Komposition |
| `@radix-ui/react-tooltip` | ^1.2.8 | Tooltips und Hinweise |
| `@stream-io/video-react-sdk` | ^1.21.1 | Video-Call-Funktionalität |
| `class-variance-authority` | ^0.7.1 | Varianten-basiertes Styling |
| `clsx` | ^2.1.1 | Klassennamen-Utility |
| `convex` | ^1.26.2 | Echtzeit-Backend |
| `lucide-react` | ^0.542.0 | Icon-Bibliothek |
| `next` | 15.5.2 | React-Framework |
| `react` | 19.1.0 | UI-Bibliothek |
| `react-dom` | 19.1.0 | React DOM-Renderer |
| `react-icons` | ^5.5.0 | Zusätzliche Icons |
| `stream-chat` | ^9.19.1 | Chat-Funktionalität |
| `stream-chat-react` | ^13.6.4 | React-Komponenten für Chat |
| `tailwind-merge` | ^3.3.1 | Tailwind-Klassen zusammenführen |

## Projektstruktur

```
africas-connexion/
├── app/                    # Next.js App-Verzeichnis
│   ├── (auth)/            # Authentifizierungsrouten
│   ├── (main)/            # Hauptanwendungsrouten
│   ├── layout.tsx         # Root-Layout
│   └── page.tsx           # Startseite
├── components/            # React-Komponenten
│   ├── ui/               # Wiederverwendbare UI-Komponenten
│   ├── chat/             # Chat-spezifische Komponenten
│   └── video/            # Video-spezifische Komponenten
├── convex/               # Convex-Backend-Funktionen
│   ├── schema.ts         # Datenbankschema
│   └── functions/        # Backend-Funktionen
├── lib/                  # Utility-Funktionen
│   └── utils.ts          # Hilfsfunktionen
├── public/               # Statische Assets
├── styles/               # Globale Styles
├── .env.local           # Umgebungsvariablen (nicht im Repo)
├── next.config.js       # Next.js-Konfiguration
├── tailwind.config.js   # Tailwind-Konfiguration
└── package.json         # Projekt-Metadaten
```

## Entwicklung

### Verfügbare Skripte

```bash
# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Produktionsserver starten
npm start

# Code-Linting
npm run lint

# Convex entwickeln
npx convex dev

# Convex deployen
npx convex deploy
```

### Code-Konventionen

- **TypeScript**: Strikte Typisierung für bessere Code-Qualität
- **ESLint**: Automatische Code-Überprüfung
- **Prettier**: Konsistente Code-Formatierung
- **Komponenten**: Funktionale React-Komponenten mit Hooks

##  Was ich gelernt habe

Durch die Entwicklung dieses Projekts konnte ich:

- ✅ Echtzeit-Kommunikation mit WebSockets implementieren
- ✅ Komplexe UI-Komponenten mit Radix UI erstellen
- ✅ Video-Streaming-Funktionalität integrieren
- ✅ Moderne Authentifizierungsflows implementieren
- ✅ State Management mit Convex verstehen
- ✅ Responsive Design-Prinzipien anwenden
- ✅ Next.js 15 App-Router nutzen

## Lizenz

Dieses Projekt ist ein persönliches Lernprojekt und dient ausschließlich Bildungszwecken.

---

## Danksagungen

Vielen Dank an:
- **Next.js-Team** für das fantastische Framework
- **Clerk** für die unkomplizierte Authentifizierung
- **Stream.io** für die leistungsstarken Chat- und Video-SDKs
- **Convex** für die innovative Backend-Lösung
- **Radix UI** für die barrierefreien Komponenten

---

**Entwickelt mit ❤️ als Lernprojekt**

![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)