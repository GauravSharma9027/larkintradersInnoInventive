# Larkin Traders — React Homepage Demo

A responsive React homepage reproduction based on the 1024 × 1536 client-provided mockup.
The application uses React, Vite, React Router, Tailwind CSS v4 and Lucide icons.

## 1. Requirements

- Node.js 20.19+ or 22.12+ (required by current Vite releases)
- npm
- Internet connection for the first dependency install and the Google Fonts stylesheet

## 2. Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Create a production build:

```bash
npm run build
npm run preview
```

## 3. Folder structure

```text
larkin-traders-react-homepage/
├── public/
│   └── assets/                         # Cropped image assets extracted from the client mockup, including transparent logo variants
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── HomePage/
│   │   │   │   ├── HomePage.jsx        # Composes the homepage sections in order
│   │   │   │   └── sections/           # One component per homepage section
│   │   │   └── PlaceholderPage/        # Temporary routed pages outside current scope
│   │   └── routes/
│   │       └── AppRoutes.jsx           # Central route definitions
│   ├── components/
│   │   └── ui/                         # Small reusable UI components
│   ├── styles/
│   │   └── index.css                   # Tailwind import and font tokens only
│   └── main.jsx                        # React and BrowserRouter entry point
├── index.html
├── package.json
└── vite.config.js
```

## 4. Component convention

The homepage follows the requested page-and-sections convention. `HomePage.jsx` only composes sections. Every visible homepage section has its own JSX file in `src/app/pages/HomePage/sections/`. Section-specific labels, links and content arrays are declared at the top of the matching component file for easy editing.

## 5. Routes

- `/` — Fully implemented homepage
- `/about-us`
- `/products`
- `/services`
- `/solutions`
- `/industries`
- `/contact-us`

The non-homepage routes intentionally render a simple placeholder. Their full designs were not included in the requested scope.

## 6. Styling approach

Tailwind CSS v4 is integrated through `@tailwindcss/vite`. Layout, spacing, typography, colors, breakpoints and states are implemented through Tailwind utility classes. `src/styles/index.css` contains only the Tailwind import and two font tokens; there is no custom component stylesheet.

Typography approximates the flattened reference using Roboto Condensed for headings/navigation and Roboto for body text. The exact client font was not supplied.

## 7. Image and logo limitation

The source artwork was extracted from the supplied 1024 × 1536 flattened screenshot. These are screenshot crops, not original high-resolution photos or vector brand files. They preserve the mockup's appearance at similar display sizes but may soften when enlarged. Several crops contain baked-in text; do not retype or duplicate that text over the same image.

For production-quality fidelity, request the original logo (preferably SVG), original hero and service photos, and exact font files/CSS from the client.

## 8. Content and contact verification

Contact details are copied from the supplied mockup. Confirm phone numbers, email addresses, and social profile destinations with the client before production deployment. The WhatsApp CTA currently uses the mockup phone number.

## 9. Change scope

Only the homepage is designed in this project delivery. Do not interpret placeholder routes as approved page designs. Keep new content and interactions aligned with the client-approved reference.
