# ShallowL

A beautiful local translator using Ollama, inspired by DeepL.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🌐 **Local Translation** - Powered by Ollama, completely private and offline
- ⚡ **Fast & Responsive** - Built with Electron, Vite, and React for optimal performance
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS
- 🔐 **Secure** - All processing happens locally on your machine
- ⌨️ **Keyboard Shortcut** - Quick access with `Ctrl+Alt+T`

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Desktop**: Electron
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: Zustand
- **Backend**: Node.js with native Ollama API integration

## Prerequisites

- Node.js 18+
- Ollama (running on `http://192.168.0.67:11434`)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shallowl.git
cd shallowl
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server with Electron:

```bash
npm run dev
```

This will:
- Compile TypeScript files
- Start the Vite development server
- Launch the Electron app with hot reload
- Open DevTools for debugging

## Building

Create a production build:

```bash
npm run build
```

This will:
- Compile TypeScript
- Build with Vite
- Package with Electron Builder

## Project Structure

```
shallowl/
├── electron/           # Electron main process
│   ├── main.ts         # App entry point
│   └── preload.ts      # IPC bridge
├── src/                # React frontend
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── store/          # Zustand store
│   ├── utils/          # Utilities
│   ├── App.tsx         # Main app component
│   └── main.tsx        # React entry point
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Environment Variables

Create a `.env` file for configuration (see `.env.example`):

```env
# Add your configuration here
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+T` | Show/Hide Application |

## IPC Handlers

The app provides these IPC channels for translation:

- `translate` - Send translation request to Ollama
- `check-ollama` - Check Ollama connection status
- `list-models` - Get available Ollama models

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Port 5173 already in use
The dev server will automatically try another port if 5173 is busy.

### Can't connect to Ollama
Make sure:
1. Ollama is running on the configured address
2. The IP address is correct (currently: `192.168.0.67:11434`)
3. Network connectivity between machines is working

### Cache errors on Windows
These are harmless and don't affect functionality. They're normal Electron/Chromium cache warnings.

## Support

For issues and questions, please create an issue in the repository.
