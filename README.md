# Brainly Backend

Backend service for the Brainly application that handles content management, authentication, and sharing.

## Setup

1. Install dependencies:

```sh
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
LINK_PREVIEW_API_KEY=<your-link-preview-api-key>
DB_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

3. Start development server:

```sh
npm run dev
```

The server will start on the port specified in your environment variables.

## Available Scripts

- `npm run dev` - Start development server with hot reload using nodemon
- `npm run build` - Build TypeScript files
- `npm start` - Start production server
- `npm run format` - Format code using Prettier

## API Endpoints

### Authentication

- `POST /api/v1/signin` - Sign in user
- `POST /api/v1/signup` - Create new user
- `POST /api/v1/logout` - Log out user

### Content Management (Protected Routes)

- `POST /api/v1/content` - Add new content
- `GET /api/v1/content` - Get user's content
- `DELETE /api/v1/delete` - Delete content

### Content Sharing

- `POST /api/v1/brain/share` - Generate share link
- `GET /api/v1/brain/share` - Get shared content

## Main Features

- JWT-based authentication
- Content management with MongoDB
- Link preview integration
- Content sharing functionality
- CORS configuration for frontend integration

## Tech Stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
