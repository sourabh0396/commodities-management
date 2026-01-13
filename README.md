## Slooze Inventory (Take Home Challenge - Frontend)

Role-based commodities/products management UI built with Next.js, TypeScript, and Tailwind CSS.

### Prerequisites

- Node.js v18+ recommended
- npm (or yarn/pnpm)

### Install & Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## App Details

### Routes

- `/` - Landing page
- `/login` - Login page
- `/products` - Products list (requires login)
- `/dashboard` - Dashboard (requires login + Manager role)

### Sample Credentials

- Manager
  - Email: `manager@slooze.com`
  - Password: `manager123`
- Store Keeper
  - Email: `store@slooze.com`
  - Password: `store123`

### I given Role-Based Access Rules Hardcoded values

- Manager
  - Dashboard: allowed
  - Products: allowed
- Store Keeper
  - Dashboard: not allowed (redirects to `/products`)
  - Products: allowed

### Light/Dark Mode

- Theme toggle persists to `localStorage` (`theme=dark|light`).
- Adds/removes the `dark` class on `<html>` to enable Tailwind `dark:` styles.

### Data Source (Current)

- Users and products are currently data in:
  currently i used hardcoded
  - `src/data/users.ts`
  - `src/data/products.ts`

> Note: Backend API integration is not added in this yet.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
