# Chatbot Widget

A beautiful, reusable React chatbot widget with a floating chat icon and Intercom/Crisp-style chat window.

## Features

- 🎯 Floating chat icon at bottom-right corner
- 💬 Smooth animated chat window
- 📱 Responsive design with TailwindCSS
- ⚡ Real-time message handling
- 🤖 Typing indicator when bot is "thinking"
- 📜 Auto-scroll to latest messages
- 🎨 Modern, polished UI

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Functional Components + Hooks** - Modern React patterns

## Project Structure

```
chatbotUI/
├── src/
│   ├── chatbot/
│   │   ├── ChatWidget.jsx    # Main widget wrapper + floating icon
│   │   ├── ChatWindow.jsx     # Chat box UI with header
│   │   ├── MessageList.jsx    # Message rendering + auto-scroll
│   │   ├── ChatInput.jsx      # Input field + send button
│   │   └── api.js             # FHIR API utility functions
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles + Tailwind
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

1. Click the floating chat icon (💬) in the bottom-right corner
2. Type a message and press Enter or click Send
3. The bot will process your query and fetch data from the FHIR API
4. Close the chat window by clicking the X button in the header

### Example Queries

- **Patient Search**: "search patient name Karketi" or "find patient family Karketi"
- **Conditions**: "get conditions for patient 10006" or "show diagnosis for patient 10006"
- **Procedures**: "show procedures for patient 10117"
- **Encounters**: "get encounters for patient 10006"
- **Observations**: "show observations for patient 10011" or "get lab results for patient 10011"
- **Prescriptions**: "get prescriptions for patient 42458" or "show medications for patient 42458"

## API Integration

The widget integrates with a FHIR (Fast Healthcare Interoperability Resources) API:

**Base URL**: `http://10.131.58.59:481/baseR4`

### Available Endpoints

1. **Patient Search** - `GET /Patient?family={name}&given={name}&email={email}&birthdate={date}&gender={gender}`
2. **Conditions** - `GET /Condition?subject={patientId}&code={code}`
3. **Procedures** - `GET /Procedure?subject={patientId}&encounter={encounterId}&code={code}`
4. **Encounters** - `GET /Encounter?subject={patientId}`
5. **Observations** - `GET /Observations?subject={patientId}&code={code}&encounter={encounterId}`
6. **Prescriptions** - `GET /MedicationRequest?subject={patientId}&prescriptionId={id}`

The chatbot intelligently routes user queries to the appropriate endpoint based on keywords in the message. You can modify the routing logic in `src/chatbot/api.js`.

## Customization

### Styling
All styles use TailwindCSS. You can customize colors, sizes, and animations by:
- Modifying Tailwind classes in component files
- Updating `tailwind.config.js` for theme customization

### API Endpoint
Edit `src/chatbot/api.js` to change the API endpoint and response handling.

### Widget Position
Modify the `fixed bottom-6 right-6` classes in `ChatWidget.jsx` to change the icon position.

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## License

MIT

