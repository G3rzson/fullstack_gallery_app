# Fullstack Gallery App

Fullstack portfolio project built around a personal gallery management flow with public gallery browsing, image uploads, authentication, and an admin dashboard for user and content management.

## Links

- Live Demo: https://fullstack-gallery-app.vercel.app
- GitHub: https://github.com/G3rzson/fullstack_gallery_app

## About The Project

This project was built to demonstrate practical fullstack development in a monorepo structure with a separate React client and Express server. It covers both public-facing and authenticated workflows, including image management, role-based access control, file uploads to Cloudinary, and JWT-based authentication with refresh token rotation.

The application includes:

- public gallery browsing for galleries marked as public by their owners
- authenticated personal gallery management with create, update, and delete flows
- image upload with drag-and-drop support and Cloudinary storage
- JWT authentication with access and refresh token handling
- admin dashboard for managing users and their gallery content
- role-based authorization protecting both API routes and frontend pages

## Main Features

- Public gallery pages browsable without authentication
- Personal gallery management: create titles, upload images, toggle public/private access
- Bulk image deletion with checkbox selection
- User authentication: register, login, logout, token refresh, and current-user handling
- Admin dashboard for viewing and deleting any user's galleries and images
- Account deletion with full cascade cleanup (images from Cloudinary, galleries, user record)
- Role-based access control on both frontend route guards and backend middleware
- Cookie-based refresh token with httpOnly flag and secure production settings

## Engineering Highlights

- Implemented JWT authentication with short-lived access tokens and httpOnly cookie refresh tokens, including silent refresh via Axios response interceptor
- Designed a layered backend middleware chain: token verification → role check → resource ownership check
- Built a dedicated hasPermissionMW that allows admins through immediately while verifying gallery ownership for regular users via a DB lookup
- Added DB existence check in the refresh endpoint to immediately invalidate sessions for deleted accounts
- Unified \_id field naming between JWT payload, MongoDB documents, and API responses to eliminate field name mismatches across the stack
- Used sessionStorage flags to suppress auth guard error toasts during account deletion before React state resets

## Tech Stack

**Frontend**

- React 19
- TypeScript
- Vite
- React Router v7
- TanStack Query v5
- Axios
- React Hook Form + Zod
- Tailwind CSS v4
- React Hot Toast

**Backend**

- Node.js + Express v5
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Cloudinary + Multer
- bcrypt
- Zod

**Deployment**

- Client: Vercel
- Server: Render
- Database: MongoDB Atlas

## What I Practiced

- Designing and shipping fullstack CRUD features end to end
- Working with authentication, authorization, and token lifecycle management
- Structuring a clean REST API with layered middleware and a service/repository pattern
- Debugging React state lifecycle issues across context, React Query, and Axios interceptors
- Securing API routes against unauthorized access with role and ownership checks

## Project Structure

```
fullstack_gallery_app/
├── client/     # React frontend → see client/README.md
└── server/     # Express backend → see server/README.md
```

## License

This project was created for learning and portfolio purposes.

## Author

**G3rzson**

- GitHub: [@G3rzson](https://github.com/G3rzson)
