# Coding-Programming-26


## Project Overview

`NearMeer` is a web application built with **React** and **Vite**. It enables businesses and neighbors to interact through features such as profile management, properties, events, deals, and integrated mapping and chat functionalities. The application leverages modern frontend tooling and various open-source libraries to deliver a responsive, interactive experience.
A public deployment of the project is available at: [https://coding-programming-26.pages.dev](https://coding-programming-26.pages.dev)
---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/CodingProgramming-26.git
   cd CodingProgramming-26
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## Key Features

- Business and neighbor authentication flows (sign up, sign in)
- Dashboards for businesses
- Location-based property listings using maps
- Events, deals, and profile management
- Chatbot integration powered by OpenAI API
- Responsive UI with Tailwind CSS

---

## Libraries & Open Source Dependencies

The project relies on the following major libraries and tools, all of which are open source:

| Category | Library / Tool | Purpose |
|----------|----------------|---------|
| **Framework** | `react` / `react-dom` | UI components |
| **Build** | `vite` | Development server & bundler |
| **Routing** | `react-router-dom` | Client-side routing |
| **Styling** | `tailwindcss`, `@tailwindcss/vite` | Utility-first CSS, Vite plugin |
| **Maps & Location** | `leaflet`, `react-leaflet`, `@react-google-maps/api` | Interactive maps and Google Maps integration |
| **Animations** | `gsap`, `lenis` | Scroll and animation helpers |
| **Icons** | `lucide-react` | SVG icon set |
| **Backend / API** | `@supabase/supabase-js` | Supabase client for authentication and database |
| **Security** | `@marsidev/react-turnstile` | Cloudflare Turnstile CAPTCHA integration |
| **AI / Chatbot** | `openai` | OpenAI API client used in `Chatbot.jsx` |
| **TypeScript Support** | `@types/react`, `@types/react-dom` | Type definitions (workspace uses JS/JSX but types are installed) |

Each dependency is included via `package.json` and follows the licenses provided by the respective maintainers (mainly MIT, Apache-2.0, BSD, etc.). You can view the license for a specific package by inspecting its entry in `node_modules/<package>/LICENSE`.

---

## External APIs

In addition to the npm packages, the application consumes a few public APIs:

- **Overpass API** – used to fetch geographic data from OpenStreetMap (business locations, amenities) based on latitude/longitude queries. Endpoints such as `https://lz4.overpass-api.de/api/interpreter` are called from components like `Businesses.jsx`, `Deals.jsx`, and `UserLocation.jsx`.

- **Image placeholder service** – placeholder photos are generated via [loremflickr](https://loremflickr.com) in pages like `Deals.jsx` (`https://loremflickr.com/400/300/{category}?lock={id}`) and other dynamic image needs.

- **Ticketmaster Discovery API** – used in `Events.jsx` to fetch live event listings based on geolocation and selected category. Requests rely on a valid API key stored in `VITE_TICKETMASTER_KEY`; network errors (e.g. connection resets) are retried and surfaced to the user as error messages.

These APIs are free to use but may have rate limits; the code includes simple retry/backoff for Overpass calls.

---

## License & Open Source Credits

This repository itself does not include a separate license file and is considered private, but the code uses many open-source components under their respective licenses:

- **React**: MIT License
- **Vite**: MIT License
- **Tailwind CSS**: MIT License
- **Leaflet**: BSD-2-Clause License
- **GSAP**: Standard License (see [greensock.com/standard-license](https://greensock.com/standard-license/))
- **Supabase JS**: Apache-2.0 License
- **OpenAI**: MIT License

> Please consult the LICENSE file of each third-party library for full terms.

---

## Project Structure (relevant directories)

```
src/
  App.jsx
  index.css
  Index.jsx
  SupabaseClient.jsx
  context/        # Authentication context
  pages/          # Application pages and components
    Components/   # Shared UI components (Header, Footer, CardSwap, etc.)
```

Additional project assets reside under `public/` and `src/assets/` (images, icons).

---

## Contribution & Development Notes

- Adhere to existing lint rules (`npm run lint`).
- Components use functional React with hooks; maintain the pattern when adding new features.
- Environment variables for services like Supabase, OpenAI, and Google Maps should be stored in `.env` (not committed).

---

## Acknowledgements

Thanks to the open-source community for the libraries and tools used in this project. Special recognition to:

- **Tailwind Labs** for Tailwind CSS
- **Vite contributors** for fast builds and HMR
- **Supabase team** for the open-source backend
- **Leaflet community** for mapping solutions
- **OpenAI** for the API that powers the chatbot

---

If you have questions or need assistance, feel free to open an issue or contact the maintainers.

---