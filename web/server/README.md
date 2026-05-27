# Fullstack Gallery App — Server

Express REST API backend for the Fullstack Gallery App. Handles authentication, gallery and image management, Cloudinary file uploads, and admin operations.

## Tech Stack

- Node.js + Express v5
- TypeScript
- MongoDB + Mongoose
- JWT (access + refresh token)
- Cloudinary + Multer
- bcrypt
- Zod
- cookie-parser, cors, dotenv

## Getting Started

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## API Endpoints

### Auth
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /api/user/register | Register new user | No |
| POST | /api/user/login | Login, returns access token + sets cookie | No |
| POST | /api/user/logout | Clears refresh token cookie | No |
| POST | /api/user/refresh | Returns new access token from cookie | No |
| POST | /api/user/delete-account/:userId | Delete own account | Yes |

### My Gallery
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | /api/my-gallery-titles | Get own galleries | Yes |
| POST | /api/my-gallery-titles/create | Create gallery title | Yes |
| GET | /api/my-gallery-titles/update/:id | Get gallery for edit | Yes |
| PUT | /api/my-gallery-titles/update/:id | Update gallery title | Yes |
| PUT | /api/my-gallery-titles/:id | Toggle public/private | Yes |
| DELETE | /api/my-gallery-titles/:id | Delete gallery title | Yes (owner) |
| GET | /api/my-gallery-titles/:id | Get gallery images | Yes |
| POST | /api/my-gallery-titles/:id/add | Upload images | Yes |
| DELETE | /api/my-gallery-titles/:id/:imageId | Delete single image | Yes (owner) |
| POST | /api/my-gallery-titles/:id/delete-many | Delete multiple images | Yes (owner) |

### Public Gallery
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | /api/public-gallery-titles | List public galleries | No |
| GET | /api/public-gallery-titles/:id | Get public gallery images | No |

### Admin
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | /api/admin/users | List all users | Admin |
| GET | /api/admin/users/:userId | Get user galleries | Admin |
| GET | /api/admin/users/:userId/:galleryTitleId | Get gallery images | Admin |
| DELETE | /api/admin/users/:userId/:galleryTitleId | Delete gallery | Admin |
| DELETE | /api/admin/users/:userId/:galleryTitleId/:imageId | Delete image | Admin |
| POST | /api/admin/users/:userId | Delete user account | Admin |

## Middleware Chain

- verifyAccessTokenMW — validates JWT from Authorization header, attaches req._id and req.userRole
- isAdminMW — checks req.userRole === ADMIN, verifies user still exists in DB
- hasPermissionMW — allows admins through, checks gallery userId ownership for regular users
- limitGalleryTitlesMW — max 2 gallery titles per user
- limitGalleryImagesMW — max 6 images per user
- validateDataMW — Zod schema validation on request body

## Scripts

```bash
npm run dev     # tsx watch (hot reload)
npm run build   # TypeScript compile to dist/
npm start       # Run compiled dist/index.js
```
