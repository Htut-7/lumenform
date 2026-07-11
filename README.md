# LUMENFORM

A 3D e-commerce site built with React, react-three-fiber, and Firebase.
Products are rendered as live, rotatable 3D forms (procedurally built from
primitives — no external model files needed), with Firebase handling
authentication and data (users, carts, orders).

## Stack

- **React 18 + Vite** — app shell and routing (`react-router-dom`)
- **@react-three/fiber + @react-three/drei + three** — the 3D product viewer
- **Firebase Auth** — email/password + Google sign-in
- **Firestore** — user profiles, per-user carts, order history

## Getting started

```bash
npm install
```

### 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. In the project, go to **Build → Authentication → Get started**, and enable
   the **Email/Password** and **Google** sign-in providers.
3. Go to **Build → Firestore Database → Create database** (start in
   production mode — the security rules below lock it down).
4. Go to **Project settings → General → Your apps**, click the web icon
   (`</>`) to register a web app, and copy the config values it gives you.

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env` with the values from step 1:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Deploy Firestore security rules

The included `firestore.rules` restricts every user to their own cart,
profile, and orders. Deploy with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase init firestore   # point it at this project, keep the existing firestore.rules
firebase deploy --only firestore:rules
```

(Or paste the contents of `firestore.rules` into the Firebase Console →
Firestore Database → Rules tab and click Publish.)

### 4. Run it

```bash
npm run dev
```

Visit `http://localhost:5173`.

## Project structure

```
src/
  components/
    ProductViewer3D.jsx   # the 3D canvas — builds each lamp procedurally
    ProductCard.jsx        # catalog card with a mini live 3D render
    Nav.jsx, Footer.jsx
  context/
    AuthContext.jsx        # Firebase auth state + signup/login/logout
    CartContext.jsx        # cart state, synced to Firestore per-user
  data/
    products.js             # catalog data (edit this to add real products)
  pages/
    Home.jsx, Shop.jsx, ProductDetail.jsx, Cart.jsx,
    Login.jsx, Signup.jsx, Account.jsx, Checkout.jsx
  firebase.js               # Firebase app/auth/db initialization
firestore.rules             # security rules (deploy these!)
```

## Adding real products

Edit `src/data/products.js`. Each product needs a `form` value (one of
`arc`, `terra`, `obelisk`, `orb`, `stele`, `fulcrum` — see
`ProductViewer3D.jsx` for the builders) and a `tone` hex color for the
shade/glass material. To use a real 3D model instead of a procedural one,
swap in `useGLTF` from `@react-three/drei` and load a `.glb` file.

## Checkout

`Checkout.jsx` records an order to Firestore but does **not** process
payment. Wire in Stripe (or another processor) via a Cloud Function before
taking real orders — never handle card details directly in the client.

## Deploying

```bash
npm run build
```

Deploy the `dist/` folder to Firebase Hosting, Vercel, Netlify, or any
static host. For Firebase Hosting:

```bash
firebase init hosting   # public directory: dist
firebase deploy --only hosting
```
