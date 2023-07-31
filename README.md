## Description

This is a small REST API built with Node.js and TypeScript using NestJS, TypeORM, and PostgreSQL. User authentication is implemented using cookies and sessions.


It allows to manage used cars prices. The users can submit reports about sold cars and later the application can calculate the estimate with the average price of the car based on the submitted reports.

## How to run

1. Install Dependencies: Run the following command in the terminal to install the required dependencies using PNPM(can be used interchangeably with NPM) package manager:
```bash
pnpm install
```

2. Start Docker Containers for the DB: Execute the following command in the terminal to start the PostgreSQL Docker containers in the background:
```bash
docker-compose up -d
```

3. Create a `.env.developmentd` file in the root directory of the project and fill it with the following environment variables:
```bash
DB_NAME=used-cars
DB_USERNAME=admin
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_LOGGING=false
COOKIE_KEY=test
```

In the same way, fill the `.env.test` and `.env.production` when needed.

4. Database Migration: Run the migration command to set up the database by executing the following command in the terminal:
```bash
pnpm run migrate:up
```

5. Start the Application: Start the application by running the following command in the terminal:
```bash
pnpm run start
```
The application should now be running and ready to accept requests.

## API Endpoints

Route | Method | Description | Authentication
--- | --- | --- | ---
`/auth/signup` | `POST` | Register a new user | No
`/auth/signin` | `POST` | Login a user | No
`/auth/signout` | `POST` | Logout a user | Yes
`/auth/profile` | `GET` | Get the current user | Yes
`/auth/:id` | `GET` | Get other user profile | No
`/auth/:id` | `PATCH` | Update profile info | Yes
`/reports` | `POST` | Create a new report | Yes
`/reports/:id` | `PATCH` | Approve report | Yes (Admin only)
`/reports` | `GET` | Get the estimate | No
