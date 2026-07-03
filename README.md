# Fomi — AI Content Generation

A responsive, production-quality frontend implementation of the Fomi AI image and video generation interface, built as a technical assessment submission for Tarum.

## Project Overview

This application replicates the provided Fomi design mockup as a fully functional Next.js web page. Users can switch between image and video generation, enter prompts, configure generation parameters, and view results fetched from a mock API — including loading, empty, and error states.

The UI is mobile-first, accessible, and optimized for performance across viewports from 320px to ultrawide displays.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript |
| Styling | Tailwind CSS v4 + CSS Modules |
| Images | `next/image` with remote pattern config |
| API | Next.js Route Handlers (mock backend) |
| State | React hooks (no external state library) |

## Folder Structure

```
fomi-app/
├── app/
│   ├── api/
│   │   ├── content/route.js      # GET generated content (supports empty/error states)
│   │   ├── generate/route.js     # POST trigger generation with simulated delay
│   │   └── history/route.js      # GET history thumbnails
│   ├── globals.css               # Design tokens, theme variables, utilities
│   ├── layout.js                 # Root layout, fonts, theme provider
│   └── page.js                   # Home page entry
├── components/
│   ├── generation/
│   │   ├── GenerationPage.jsx    # Page-level composition
│   │   ├── GenerationSidebar.jsx # Left control panel
│   │   ├── GenerationWorkspace.jsx
│   │   ├── PromptCard.jsx        # Prompt recap card
│   │   ├── ResultsGrid.jsx       # Image/video grid with states
│   │   └── ResultsGrid.module.css
│   ├── history/
│   │   ├── HistoryBar.jsx        # Horizontal scroll history
│   │   └── HistoryBar.module.css
│   ├── icons/
│   │   └── Icons.jsx             # Inline SVG icons (no icon library)
│   ├── layout/
│   │   ├── MainLayout.jsx
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.css
│   └── ui/
│       ├── Accordion.jsx
│       ├── Avatar.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Dropdown.jsx
│       ├── IconButton.jsx
│       ├── Modal.jsx
│       ├── TextArea.jsx
│       └── Toggle.jsx
├── context/
│   └── ThemeProvider.jsx         # Light/dark theme with localStorage
├── hooks/
│   ├── useContent.js
│   ├── useGenerate.js
│   └── useHistory.js
├── lib/
│   ├── api.js                    # Frontend API client
│   ├── constants.js              # Shared config and seed data
│   ├── utils.js
│   └── mock/
│       ├── contentData.js
│       └── historyData.js
├── next.config.mjs
├── package.json
└── README.md
```

## Installation

```bash
git clone <your-repo-url>
cd fomi-app
npm install
```

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Mock API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/history` | GET | Returns history thumbnail items |
| `/api/content?type=image\|video` | GET | Returns generated content |
| `/api/content?state=empty\|error` | GET | Simulates empty/error states |
| `/api/generate` | POST | Simulates generation with ~2.2s delay |

**Generate request body:**

```json
{
  "prompt": "Your prompt here",
  "type": "image",
  "imageCount": 8,
  "aspectRatio": "1:1",
  "model": "fomi-v1"
}
```

## Design Decisions

- **Design tokens via CSS variables** — Colors, radii, and shadows are centralized in `globals.css` for consistent theming and dark mode support.
- **CSS Modules only where needed** — Progress bar, history scroll, and grid layout use modules for scoped styles; Tailwind handles the rest.
- **No icon library** — Custom inline SVGs keep bundle size minimal and match the mockup stroke style.
- **API-driven content** — No hardcoded image arrays in components; all media flows through route handlers.
- **Picsum Photos** — Seeded URLs provide stable placeholder images without bundling assets.

## Responsiveness Strategy

| Breakpoint | Behavior |
|------------|----------|
| 320px–639px | Single column; 2-col results grid; compact nav labels hidden |
| 640px–1023px | 3-col results grid; nav labels visible |
| 1024px+ | Sidebar + results side-by-side; 4-col image grid |
| 1600px max | Content container capped to prevent over-stretching on ultrawide |

## Performance Optimizations

- `memo()` on expensive leaf components (Navbar, HistoryBar, ResultsGrid, PromptCard)
- `next/image` with responsive `sizes` attribute
- Lazy video loading via `preload="metadata"`
- Skeleton loaders instead of layout shift
- No unnecessary third-party dependencies

## Accessibility Features

- Semantic HTML (`header`, `nav`, `main`, `section`, `aside`)
- `aria-label`, `aria-expanded`, `aria-selected`, `role="listbox"` on interactive controls
- Keyboard-accessible dropdowns (Escape to close)
- Focus-visible outlines with accent color
- `prefers-reduced-motion` respected
- Sufficient color contrast in both light and dark themes

## Suggested Commit Messages

```
chore: scaffold Next.js app with Tailwind CSS
feat: add mock API routes for history, content, and generation
feat: implement design token system and theme provider
feat: build reusable UI component library
feat: implement navbar and history bar from design mockup
feat: add generation workspace with sidebar and results grid
feat: wire API hooks and generation flow with loading states
docs: add README with setup and architecture notes
```

## Future Improvements

- Real backend integration with streaming generation progress
- Image lightbox with download and remix actions
- Virtualized history scroll for large libraries
- E2E tests with Playwright across breakpoints
- PWA offline shell for returning users

## Responsiveness Testing

Test at these widths before submission:

- 320px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (laptop)
- 1440px (desktop)
- 1920px+ (ultrawide)

Take screenshots at each breakpoint for the assessment deliverable.
