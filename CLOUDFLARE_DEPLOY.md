# Deploy to Cloudflare Pages via GitHub

Use this guide to deploy the Crafted Bathrooms site to Cloudflare Pages using the GitHub repo **craftedbaths-website-preview** and the Cloudflare project **craftedbaths-website-preview**.

---

## 1. Create the GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Set **Repository name** to: `craftedbaths-website-preview`
3. Choose **Public**.
4. Do **not** add a README, .gitignore, or license (the project already has these).
5. Click **Create repository**.

---

## 2. Push this project to GitHub

In your project folder, run (replace `YOUR_USERNAME` with your GitHub username):

```powershell
cd "G:\Crafted Bathrooms Website"

# Add the GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/craftedbaths-website-preview.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub
git push -u origin main
```

If the repo is under an organization, use:

`https://github.com/ORG_NAME/craftedbaths-website-preview.git`

---

## 3. Create the Cloudflare Pages project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in.
2. In the left sidebar, open **Workers & Pages**.
3. Click **Create** → **Pages** → **Connect to Git**.
4. Choose **GitHub** and authorize Cloudflare if prompted.
5. Select the repository **craftedbaths-website-preview**.
6. Click **Begin setup**.

---

## 4. Configure the Pages project

Use these settings and the project name below.

| Setting | Value |
|--------|--------|
| **Project name** | `craftedbaths-website-preview` |
| **Production branch** | `main` |
| **Framework preset** | `Next.js` |
| **Build command** | `npm run build` |
| **Build output directory** | *(leave as set by Next.js preset)* |
| **Root directory** | *(leave blank)* |

---

## 5. Environment variables (Supabase)

1. In the same setup flow, open **Environment variables**.
2. Add:

   - **Variable name:** `NEXT_PUBLIC_SUPABASE_URL`  
     **Value:** your Supabase project URL  

   - **Variable name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
     **Value:** your Supabase anon/public key  

3. Apply to **Production** (and **Preview** if you use branch previews).

---

## 6. Deploy

1. Click **Save and Deploy**.
2. Wait for the build to finish. The site will be at:
   - **Production:** `https://craftedbaths-website-preview.pages.dev`

---

## Updating the live site

From the project folder:

```powershell
git add -A
git commit -m "Your update message"
git push origin main
```

Cloudflare Pages will auto-build and deploy from the `main` branch.
