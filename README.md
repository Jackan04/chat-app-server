# Chat App — Server

REST API for Chat App. This is the backend part of the project. For the frontend, see [chat-app-client](https://github.com/Jackan04/chat-app).

## Tech

- Node.js / Express
- PostgreSQL / Prisma
- JWT authentication (passport-jwt and jsonwebtoken)
- bcrypt
- express-validator
- sanitize-html
- supertest & jest

## API

| Method | Endpoint                        | Description                             | Auth |
| ------ | ------------------------------- | --------------------------------------- | ---- |
| POST   | /api/auth/register              | Register a new user                     | No   |
| POST   | /api/auth/login                 | Log in                                  | No   |
| GET    | /api/auth/me                    | Get current user                        | Yes  |
| GET    | /api/users                      | List users (supports ?username= search) | Yes  |
| GET    | /api/users/:id                  | Get user by ID                          | Yes  |
| PATCH  | /api/users/:id                  | Update profile                          | Yes  |
| GET    | /api/conversations              | List conversations for current user     | Yes  |
| POST   | /api/conversations              | Create or return existing conversation  | Yes  |
| GET    | /api/conversations/:id          | Get conversation with messages          | Yes  |
| POST   | /api/conversations/:id/messages | Send a message                          | Yes  |

## Setup

**Requirements:** Node.js, PostgreSQL

```bash
git clone https://github.com/Jackan04/chat-app-server
cd chat-app-server
npm install
```

Create a `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/chat_app
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/chat_app_test
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
PORT=3000
```

Run database migrations:

```bash
npm run prisma:migrate
npm run prisma:generate
```

Start the server:

```bash
npm start
```

## Tests

Uses Jest and SuperTest against a separate test database.

```bash
npm test
```
