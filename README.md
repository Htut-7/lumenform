# LumenForm

<p align="center">
  <img src="https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Ready-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/3D%20UI-react--three--fiber-000000?style=for-the-badge" alt="3D UI" />
</p>

## Overview

LumenForm is a modern 3D e-commerce storefront built with **React**, **react-three-fiber**, and **Firebase**.
Instead of static product photos, products are presented as interactive 3D forms that users can rotate and explore directly in the browser.

The project includes secure authentication, a personalized cart, and order storage powered by Firebase Auth and Firestore.

## Features

* Interactive 3D product catalog
* Drag-to-rotate product viewer
* Zoom controls for detailed inspection
* Firebase Authentication with email/password and Google sign-in
* Persistent cart data synced per user
* Order history saved to Firestore
* Firestore security rules for user-specific access
* Responsive and modern storefront UI

## Tech Stack

* **Frontend:** React, Vite
* **3D Rendering:** react-three-fiber, Three.js
* **Backend / Services:** Firebase Auth, Firestore
* **Styling:** CSS
* **Deployment:** Vite-compatible hosting

## Project Structure

```bash
lumenform/
├── src/
├── public/
├── firestore.rules
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

* Node.js installed
* Firebase project configured
* Firebase credentials ready
* A supported browser

### Installation

```bash
git clone https://github.com/Htut-7/lumenform.git
cd lumenform
npm install
```

### Environment Setup

Create a `.env` file in the root of the project and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run the Project

```bash
npm run dev
```

The app will run locally in development mode.

## Firebase Setup

Make sure the following are configured in your Firebase project:

* Authentication enabled for email/password and Google sign-in
* Firestore database created
* Security rules published from `firestore.rules`

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Screenshots

Add screenshots here to showcase the 3D product viewer, cart, and checkout flow.

## Roadmap

* Add product filtering and search
* Add wishlist support
* Improve mobile interaction for 3D models
* Add admin dashboard for inventory management
* Add payment integration

## Contributing

Contributions are welcome.
If you find a bug or want to improve the experience, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
