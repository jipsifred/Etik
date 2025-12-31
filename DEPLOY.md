# PocketBase + React App Deployment

This format allows you to deploy the entire stack (Frontend + Backend + Database) as a single unit using Docker Compose.

## How it works
- **Frontend Container**: Runs Nginx, serves your React app, AND acts as a generic proxy. Requests to `/api/` are forwarded to PocketBase.
- **Backend Container**: Runs PocketBase. It automatically creates the database schema using the migration file in `./pb_migrations`.

## Deployment on Coolify
1. **Create a new Service**: Select **"Docker Compose"**.
2. **Repository**: Point to this Git repository.
3. **Build Pack**: Use "Docker Compose".
4. **Ports**: Coolify should detect the exposed port (80 from the `app` service, mapped to 8080 or similar). 
   - Ensure the Application Domain in Coolify points to the `app` service.

## Local Testing
To test the full stack locally exactly as it runs on the server:

```bash
docker-compose up --build
```

Then visit `http://localhost:8080`.
- The App is at `/`
- The Admin UI is at `/_/` (e.g. `http://localhost:8080/_/`)
- No manual PocketBase configuration needed! The `themes` collection is created automatically.
