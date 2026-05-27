# Fullstack Gallery App — Client

React frontend for the Fullstack Gallery App. Handles public gallery browsing, authenticated personal gallery management, image uploads, and an admin dashboard.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router v7
- TanStack Query v5
- Axios
- React Hook Form + Zod
- Tailwind CSS v4
- React Hot Toast
- Lucide React

## Getting Started

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:8000/api
```

## Pages & Routes

| Route | Description | Auth required |
|-------|-------------|---------------|
| `/` | Home page | No |
| `/user/register` | Registration | No |
| `/user/login` | Login | No |
| `/public-gallery-titles` | Browse public galleries | No |
| `/public-gallery-titles/:id` | View public gallery images | No |
| `/my-gallery-titles` | Personal gallery list | Yes |
| `/my-gallery-titles/create` | Create new gallery | Yes |
| `/my-gallery-titles/:id` | View own gallery images | Yes |
| `/my-gallery-titles/update/:id` | Edit gallery title | Yes |
| `/my-gallery-titles/:id/add` | Upload images | Yes |
| `/admin/users` | Admin: user list | Admin only |
| `/admin/users/:userId` | Admin: user galleries | Admin only |
| `/admin/users/:userId/:galleryTitleId` | Admin: gallery images | Admin only |

## Auth Flow

- Access token stored in module-level variable inside apiClient.ts (not localStorage)
- Refresh token stored in httpOnly cookie, handled server-side
- On app mount, UserContextProvider calls /user/refresh to restore session
- Axios response interceptor automatically retries requests on 401 with a fresh access token
- Route guards (useProtection) check userObj and isAuthLoading from UserContext

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # TypeScript check + Vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```
