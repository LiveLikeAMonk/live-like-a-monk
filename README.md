# Live Like a Monk — ISKCON NVCC Pune

A bilingual (Hindi-first / English) Next.js website for the Residential Gurukul Training Course at ISKCON NVCC Pune.

## Features

- Hindi is the default language; English is available from the header.
- Professional, mobile-first landing page.
- NVCC Pune temple and deity imagery sourced from the official ISKCON Pune website.
- Three program tracks: Working Professionals, Temple Volunteers, and Aspiring for Celibacy Life.
- Step-by-step spiritual development and chanting progression.
- Temple norms, technology/dietary discipline, Brahmachari Ashram training and screening pathway.
- Interest registration form.
- Registration email notification through Resend.

## Email setup

Copy `.env.example` to `.env.local` and set:

```env
RESEND_API_KEY=re_your_key
NOTIFICATION_EMAIL=madhavcarandas@gmail.com
RESEND_FROM_EMAIL=Live Like a Monk <onboarding@resend.dev>
```

For production, verify a sending domain in Resend and change `RESEND_FROM_EMAIL` to the verified sender.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy

Push the project to GitHub and import the repository into Vercel. Add the three environment variables in Vercel Project Settings → Environment Variables.

The site does not display a WhatsApp number.
