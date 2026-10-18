<div id="top"></div>

<div align="center">

<img src="./web/public/favicon.svg" alt="Hands-Free Pilot Logo" width="88" height="88" />

# Hands-Free - Voice-Controlled macOS Assistant & Web Simulation

**A High-Performance System for Voice-Driven Computing.**  
*Turn Natural Speech Into Instant, Deterministic Desktop Action.*

<br />

[![Live App](https://img.shields.io/badge/Live_Demo-nohandspilot.vercel.app-000000.svg?style=for-the-badge&logo=vercel&logoColor=white&color=000000)](https://nohandspilot.vercel.app)
[![Video Walkthrough](https://img.shields.io/badge/Video_Demo-YouTube_svUKJ5K3ZRI-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/svUKJ5K3ZRI)
[![License: MIT](https://img.shields.io/badge/License-MIT-d4af37.svg?style=for-the-badge)](LICENSE)
[![macOS 14+](https://img.shields.io/badge/macOS-14+_Sonoma_%26_Sequoia-000000.svg?style=for-the-badge&logo=apple&logoColor=white)](https://apple.com/macos)
[![Swift 5.9](https://img.shields.io/badge/Swift-5.9+-F05138.svg?style=for-the-badge&logo=swift&logoColor=white)](https://swift.org)
[![React 19](https://img.shields.io/badge/React-19.2-050505.svg?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-050505.svg?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-050505.svg?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tested-2EAD33.svg?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-0e8a16.svg?style=for-the-badge)](CONTRIBUTING.md)

<br />

> 🌐 **Live Web Simulator**: Experience Hands-Free Pilot live in your browser at **[https://nohandspilot.vercel.app](https://nohandspilot.vercel.app)**  
> 🎥 **Video Demo & Walkthrough**: Watch the timed demo script running on live macOS at **[YouTube Walkthrough](https://youtu.be/svUKJ5K3ZRI)**

<br />

[Live Demo](https://nohandspilot.vercel.app) · [Video Demo](https://youtu.be/svUKJ5K3ZRI) · [About](#about) · [Foundational Principles](#foundational-principles) · [Quick Start](#quick-start) · [Core Features](#core-features) · [Visual Identity](#visual-identity--design-philosophy) · [Architecture](#architecture) · [Project Structure](#project-structure) · [Supported Commands](#supported-voice-commands) · [Documentation](#documentation) · [Contributing](#contributing) · [License](#license)

</div>

---

<div align="center">
  <h2>About</h2>
</div>

Most voice assistants suffer from **conversational drag**—they ask clarifying questions, introduce artificial latency, hallucinate non-deterministic actions, or require round-tripping through cloud AI models just to switch a window or click a button. Meanwhile, legacy accessibility software often relies on clunky numbered grids or sluggish speech engines that fail to keep pace with modern developer workflows.

**Hands-Free (Pilot)** is an open-source, dual-layer system designed for effortless, high-speed, voice-driven computing:
1. **A Native macOS Menu-Bar Daemon** written in **Swift 5.9** that intercepts speech dictation from Wispr Flow via low-level `CGEvent` taps, resolves commands deterministically in under 2 ms using `PilotBrain`, and synthesizes native keystrokes, clicks, window focus, and screen navigation through Apple Accessibility APIs.
2. **An Interactive Web Desktop Simulator** built with **React 19**, **TypeScript 5.9**, **Tailwind CSS v4**, **Vite**, and **Framer Motion** that runs the exact same matching engine in-browser, offering a sandboxed virtual macOS desktop environment to test voice commands and shortcuts before running them natively.

### Foundational Principles

1. **Zero-Latency Execution (<2 ms Matching)**: Voice command parsing uses a deterministic rule matcher (`PilotBrain`) rather than conversational LLM inference for routine desktop operations. Commands are evaluated in 1.4 to 1.9 ms.
2. **Clean Clipboard Isolation**: Wispr Flow dictates text by simulating a paste operation. Pilot intercepts the paste directly from Wispr's process bundle via session taps, swallows the clipboard payload before any frontmost application receives it, and keeps the user's system pasteboard uncontaminated.
3. **Dual Architecture with 100% Logic Parity**: The command matching rules, token normalization, context routing, and app aliasing are authored identically in Swift (`Brain.swift`) and TypeScript (`brain.ts`), verified by reciprocal unit test suites (`BrainCheck` and Vitest).
4. **Privacy-First Local Execution**: Pilot runs entirely on-device. Audio buffers for the "Pilot" wake word are processed locally via Apple's Speech framework, and command execution never leaves your Mac.
5. **Human-Centric Feedback**: Status is communicated through a floating HUD toast, a subtle menu-bar indicator, and a single warm amber waveform that illuminates strictly while Pilot is acting.

---

<div align="center">
  <h2>Quick Start</h2>
</div>

### Prerequisites

| Component | Native macOS App | Web Desktop Simulator |
|---|---|---|
| **Operating System** | macOS 14.0+ (Sonoma or Sequoia) | Any modern OS (macOS, Linux, Windows) |
| **Runtime / Compiler** | Swift 5.9+ / Xcode Command Line Tools | Node.js `v20.x` or higher |
| **Dependencies** | Wispr Flow (recommended for voice dictation) | `npm` (v10+) or `pnpm` |
| **Permissions** | Accessibility & Input Monitoring | None (Browser sandboxed) |

---

### Native macOS App Setup

```bash
# 1. Clone the repository
git clone https://github.com/TheVicky1/Hands-Free.git
cd Hands-Free

# 2. Build, run BrainCheck, sign, and install Pilot.app to ~/Applications
cd app
./build.sh

# 3. Launch Pilot from Applications
open ~/Applications/Pilot.app
```

#### Grant macOS Permissions (One-Time)
1. **Accessibility**: Open **System Settings → Privacy & Security → Accessibility** and toggle **Pilot** ON.
2. **Input Monitoring**: In **Privacy & Security → Input Monitoring**, ensure **Pilot** is authorized to observe global shortcut taps.
3. **Wispr Flow Dictionary**: In Wispr Flow Settings → Dictionary, add the term **`Pilot`** so voice triggers are never transcribed as "Pilate" or "pilot's".

---

### Web Desktop Simulator Setup

```bash
# 1. Navigate to the web workspace
cd web

# 2. Install reproducible dependencies
npm install

# 3. Start local Vite development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

---

### Validation & Quality Gates

```bash
# Run Swift native BrainCheck test suite (27+ assertion benchmarks)
cd app && swift run BrainCheck


<!-- Work in progress: docs(readme): add Control+Option+P command bar shortcut specifications -->
