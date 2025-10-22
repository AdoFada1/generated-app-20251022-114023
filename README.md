# AcademiaPortal: GDSS School Management System

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AdoFada1/generated-app-20251022-114023)

A sophisticated, secure, and user-friendly management system for students and staff of GDSS Waziri Ibrahim, featuring role-based access and administrative control.

AcademiaPortal is a modern, visually stunning, and highly functional school management system designed for GDSS Waziri Ibrahim. It provides a centralized platform for students (SS1, SS2, SS3) and staff to manage their academic and administrative activities. The system features distinct roles with tailored dashboards: Students can view their information, Staff (like Teachers and the Principal) can manage their profiles and responsibilities, and a powerful Admin role, managed by ABJ-IT Support, has full control over user management, including the ability to create, update, and manage login credentials and user profiles. The application is built for performance and usability on Cloudflare's edge network, ensuring a fast and seamless experience for all users.

## ✨ Key Features

*   **Role-Based Access Control:** Tailored dashboards and permissions for Admins, Staff, and Students.
*   **Secure Authentication:** Elegant and secure login system for all user types.
*   **Comprehensive Admin Dashboard:** At-a-glance overview of key school statistics and management modules.
*   **Full User Management:** Admins can create, view, edit, and delete student and staff profiles with ease.
*   **Personalized Dashboards:** Dedicated interfaces for Staff and Students to access relevant information.
*   **Profile Management:** Users can view and manage their own profile information, including photos.
*   **Modern & Responsive UI:** A visually stunning and intuitive interface that works flawlessly on all devices.

## 🛠️ Technology Stack

*   **Frontend:**
    *   [React](https://react.dev/)
    *   [Vite](https://vitejs.dev/)
    *   [React Router](https://reactrouter.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [shadcn/ui](https://ui.shadcn.com/)
    *   [Zustand](https://zustand-demo.pmnd.rs/) for state management
    *   [Framer Motion](https://www.framer.com/motion/) for animations
    *   [Lucide React](https://lucide.dev/) for icons
    *   [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for form validation
*   **Backend:**
    *   [Cloudflare Workers](https://workers.cloudflare.com/)
    *   [Hono](https://hono.dev/)
    *   [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) for stateful storage
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
*   [Node.js](https://nodejs.org/) (v18 or later)
*   [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/academia_portal.git
    cd academia_portal
    ```

2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```sh
    bun install
    ```

## 🖥️ Development

To start the local development server, which includes the Vite frontend and a local instance of the Cloudflare Worker, run:

```sh
bun run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

### Available Scripts

*   `bun run dev`: Starts the development server.
*   `bun run build`: Builds the application for production.
*   `bun run lint`: Lints the codebase using ESLint.
*   `bun run deploy`: Deploys the application to Cloudflare Workers.

## ☁️ Deployment

This project is designed for seamless deployment to the Cloudflare network.

1.  **Login to Wrangler:**
    If you haven't already, authenticate with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script. This will build the frontend and deploy the worker.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own instance with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AdoFada1/generated-app-20251022-114023)

## 🏗️ Architecture Overview

The application follows a modern full-stack architecture leveraging the Cloudflare ecosystem.

*   **Frontend:** A React single-page application (SPA) built with Vite provides a rich, interactive user experience.
*   **Backend:** A Hono-based API runs on a Cloudflare Worker, handling business logic and data requests.
*   **Data Storage:** A single `GlobalDurableObject` is used as the primary data store, providing a simple yet powerful persistence layer for user and school data.
*   **Type Safety:** Shared TypeScript types between the frontend and backend ensure end-to-end type safety and reduce runtime errors.