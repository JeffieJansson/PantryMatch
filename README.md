# PantryMatch

PantryMatch is a full-stack web application that helps users discover recipes based on ingredients they already have at home. It includes user authentication, recipe search powered by the Spoonacular API, and a responsive React frontend.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Run Locally](#run-locally)
- [Deployment / Live Demo](#deployment--live-demo)
- [Planned Improvements](#planned-improvements)

## About

PantryMatch lets users enter ingredients they have in their pantry and returns recipes that show which ingredients are matched and which are missing. To simplify the matching logic, the app uses Spoonacular's complex search endpoint with the `fillIngredients=true` parameter, which returns detailed ingredient usage information.

## Features

- Search recipes by multiple ingredients
- Show matched and missing ingredients per recipe
- Save recipes to a user account (requires login)
- Responsive UI built with React and styled-components

## 🛠 Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React, Vite, styled-components, react-icons

## Getting Started

These instructions will get the project running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud)

### Install

Clone the repo and install dependencies for both backend and frontend:

```bash
git clone <your-repo-url>
cd PantryMatch

# Backend
cd backend
npm install

# In a separate terminal: Frontend
cd ../frontend
npm install
```

## Configuration

Create a `.env` file in the `backend/` folder with the following variables:

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `SPOONACULAR_API_KEY` — Spoonacular API key

## Run Locally

Start the backend (development):

```bash
cd backend
npm run dev
```

Start the frontend (in a separate terminal):

```bash
cd frontend
npm run dev
```

Open the app at `http://localhost:5173` (Vite default) or the URL shown in your terminal.

## Deployment / Live Demo

If deployed, example links used in the project README:

- Frontend: https://pantrymatch.netlify.app/
- Backend: https://pantrymatch.onrender.com/

If you have different deployment URLs, tell me and I'll update the README accordingly.



## Planned Improvements

- Add autocomplete for ingredient input
- Improve saved-recipe synchronization and UI state
- Add user profiles, ratings and comments
- Add shopping list export for missing ingredients



