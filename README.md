# NOVA Admin Panel

A responsive admin dashboard built with React, TypeScript and Vite.

## Features

- Login flow with protected admin routes
- Logout from the application header
- Dashboard with shortcuts to product and user management
- Product and user lists with search
- Add-product and add-user forms with Formik and Yup validation
- Persian / English language switching with RTL / LTR layout direction
- Light / dark theme
- Responsive, mobile-first layout with a collapsible mobile sidebar
- Loading, error, empty and success feedback states

## Tech stack

- React + TypeScript + Vite
- React Router
- Redux Toolkit
- styled-components
- i18next + react-i18next
- Axios
- Formik + Yup
- SweetAlert2
- Lucide React icons
- FakeStoreAPI

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## API notes

The project uses FakeStoreAPI for authentication and sample product / user data. FakeStoreAPI is a demo API: create requests may return a successful response but do not provide durable database persistence. Newly added records are therefore shown in the current client-side session only.

## Responsive checks

Before submitting, verify the app at these viewport widths:

- 375px (small mobile)
- 768px (tablet)
- 1024px (small desktop)
- 1440px (desktop)

Also test both Persian (RTL) and English (LTR), and both light and dark themes.
