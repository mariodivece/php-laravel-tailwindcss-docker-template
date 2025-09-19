# Single Page Web App

## User Requirements
 - A landing page with general info. For now, simply display
 - On that same landing page, a newsletter subscription form that saves records to a database.
 - On that same landing page, a contact form that sends an email to a predefined email address.
 - Exposes aan API URL with a configurable Admin Token to download newsletter subscription records in CSV format.
 - Make sure favicon, robots.txt are included as part of the project.
 - Produce an appropriate .gitignore file for the project.
 - Produce an appropriate .editorconfig file for the project.

## Technology Stack Requirements:
 - Use PHP 8.2
 - Use Composer for PHP dependency management.
 - Use Laravel 12 with blade templates for components.
 - Use React with TypeScript
 - Use Tailwind css v3 or higher for CSS formatting
 - Use Vite for the static resources build process. Do not setup a Vite dev server.
 - Use sqlite as a database engine.
 - Use nginx HTTP server to serve the web application.
 
## Technical Requirements
 - Sessions, Cache and Newsletter subscriptions need to be stored in a lightweight database
 - Do not install or create any unit testing framework or tests or any additional frameworks or dependencies that are not absolutely necessary for the project.
 - The project should be minimal and depend on as few files as possible

## Deployment Requirements
 - The application needs to run within a docker container. It must be compatible with WSL2 and Docker Desktop under Windows and also with docker compose under Debian 12
 - Make sure the project has a `.env` file where the composer `APP_KEY` is defined, `ADMIN_TOKEN` for CSV download, and SMTP parameters.
 - Make sure the project has a Dockerfile that builds the project image entirely and installs any dependencies in the container.
 - Use the official php:8.2-fpm docker image as a base image
 - All node modules and composer setup needs to be performed INSIDE the container from the Dockerfile. Keep the project repository clean of generated or downloaded files and use a named volume for node_modules and generated resources.
 - Use a named volume for all applicatication resources, overlaying the project files into the container's named volume.
 - The container does not need any hot reload capabilities.
 - Create a deploy.sh script that stops the running container (if running), deletes the named volume if it exists, and recreates everything from scratch. The `deploy.sh` script must run the web application in production mode and check if `APP_KEY` and `ADMIN_TOKEN` environment variables are set.
 - Pre-populate the `APP_KEY` and `ADMIN_TOKEN` in the .env file. I will change that manually later.
