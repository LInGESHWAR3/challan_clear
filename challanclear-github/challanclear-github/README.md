# 🛡️ ChallanClear — AI Traffic Fine Dispute Platform

> Smart India Hackathon 2025 · AI + Blockchain Powered

ChallanClear is a fully interactive traffic fine dispute resolution platform that lets citizens upload photo/video evidence, capture their GPS location, and get an instant AI analysis via Claude. Traffic officers can review all evidence on a dedicated admin dashboard and deliver transparent verdicts.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🗂 Project Structure

```
challanclear/
├── index.html
├── src/
│   ├── App.jsx                   # Root component + shared state
│   ├── main.jsx                  # React DOM entry point
│   ├── index.css                 # Global styles + keyframes
│   │
│   ├── data/
│   │   └── seed.js               # 5 mock challans for demo
│   │
│   ├── utils/
│   │   ├── theme.js              # Shared color tokens
│   │   ├── helpers.js            # Date formatter, ID generators, constants
│   │   └── api.js                # Anthropic API call + reverse geocoding
│   │
│   ├── components/ui/
│   │   ├── Btn.jsx               # Button (primary/green/red/ghost/dark)
│   │   ├── Badge.jsx             # Coloured status badge
│   │   ├── Inp.jsx               # Input / Textarea / Select
│   │   ├── Card.jsx              # Card container + Sep + Lbl helpers
│   │   ├── AIBox.jsx             # AI verdict display block
│   │   └── index.js              # Barrel export
│   │
│   ├── screens/
│   │   ├── Home.jsx              # Landing — portal selector
│   │   ├── CitizenPortal.jsx     # Citizen router
│   │   └── AdminPortal.jsx       # Admin router
│   │
│   ├── citizen/
│   │   ├── VehicleLookup.jsx     # Vehicle number search
│   │   ├── ChallanList.jsx       # List of challans for a vehicle
│   │   ├── DisputeWizard.jsx     # 5-step dispute filing wizard
│   │   └── TrackCase.jsx         # Case status timeline
│   │
│   └── admin/
│       ├── AdminLogin.jsx        # Password gate
│       ├── AdminDashboard.jsx    # Stats + filterable case list
│       ├── AdminCase.jsx         # Evidence review + verdict delivery
│       └── AddChallan.jsx        # Create new challan record
```

---

## 🔑 Demo Credentials

| Role   | Credential            |
|--------|-----------------------|
| Admin  | Password: `admin@123` |

### Demo Vehicle Numbers
| Vehicle     | Challans |
|-------------|----------|
| MH12AB1234  | 2 (1 pending, 1 disputed) |
| KA01CD5678  | 1 pending |
| DL08EF9012  | 1 resolved/approved |
| TN22GH3456  | 1 pending |

---

## ✨ Features

### Citizen Portal
- 🔍 **Challan Lookup** — search by vehicle registration number
- 📋 **Challan List** — view all active/resolved challans with status badges
- 📸 **5-Step Dispute Wizard:**
  1. Confirm challan details
  2. Upload photo or video evidence (drag & drop)
  3. Capture GPS location via browser Geolocation API
  4. Write a detailed statement
  5. AI analysis via Claude — instant verdict with confidence score
- 📊 **Case Tracking** — timeline view, AI results, Google Maps link

### Admin Portal
- 🔐 **Secure Login** — password protected
- 📊 **Dashboard** — filterable case list with stat cards
- 👁️ **Case Review** — view evidence image, GPS, statement, AI report
- ⚖️ **Verdict Delivery** — approve or reject with officer notes
- ➕ **Add Challan** — create new violations directly from admin panel

---

## 🤖 AI Integration

Evidence images are sent to the **Anthropic Claude API** (`claude-sonnet-4-20250514`) for analysis. The AI returns:

```json
{
  "desc":    "Description of what is visible in the image",
  "verdict": "SUPPORTS_DISPUTE | REFUTES_DISPUTE | INCONCLUSIVE",
  "conf":    85,
  "obs":     ["Observation 1", "Observation 2", "Observation 3"],
  "rec":     "APPROVE_DISPUTE | REJECT_DISPUTE | NEEDS_REVIEW",
  "summary": "One-line summary for the reviewing officer"
}
```

> **Note:** The API key is handled by the hosting environment. No key is required in the codebase.

---

## 📍 Location Services

- Uses browser `navigator.geolocation` API
- Reverse geocodes coordinates via **OpenStreetMap Nominatim**
- Falls back to simulated coordinates in demo/denied mode

---

## 🛠 Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | React 18 + Vite                |
| Styling    | Inline styles (design tokens)  |
| AI         | Anthropic Claude API           |
| Geocoding  | OpenStreetMap Nominatim        |
| State      | React useState (no Redux)      |

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 📜 License

MIT — Built for Smart India Hackathon 2025
