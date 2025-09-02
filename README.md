# 🚀 Firebase Deployment with GitHub Actions

This project is deployed to **Firebase Hosting** using **GitHub Actions** for continuous deployment.  
Follow the steps below if you want to replicate the setup.

---

## 📌 Deployment Steps

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push origin main
```

### 2. Install Firebase CLI

```
npm install -g firebase-tools

```

### 3. Login to Firebase & Generate Token

```
firebase login:ci
```

Copy the generated token (used in GitHub Secrets).

### 4. Initialize Firebase Hosting

```
firebase init
```

- Select Hosting
- Choose your project
- Set dist as the public directory (for Vite builds)
- Configure as SPA → Yes
- This creates .firebaserc and firebase.json

### 5. GitHub Actions Workflow

Create a file: .github/workflows/main.yml

```
name: Firebase Deployment

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      - name: Install Dependencies
        run: npm install

      - name: Build
        env:
          CI: false
        run: npm run build

      - name: Archive Production Artifact
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist   # Vite outputs to dist instead of build

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      - name: Download Artifact
        uses: actions/download-artifact@v4
        with:
          name: build
          path: dist

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@v2.2.0
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

```

### 6. Add Firebase Token to GitHub Secrets

- Go to GitHub Repo → Settings → Secrets → Actions

- Add a new secret:

- Name: FIREBASE_TOKEN

- Value: (Paste the token from step 3)

### 7. Commit Config Files

```
git add .firebaserc firebase.json .github/workflows/main.yml
git commit -m "Setup Firebase CI/CD"
git push origin main
```

### 8. 🎉 Deployment

Every push to main will:

- Build the project

- Upload the dist folder

- Deploy to Firebase Hosting

Your site is live at:

```
https://<your-project-id>.web.app
```
