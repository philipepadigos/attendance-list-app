This project is a Vite + React app. Deployment options:

1) Vercel (recommended)
   - Push your repo to GitHub.
   - Import the project in Vercel and select the GitHub repo.
   - Vercel auto-detects Vite; set build command `npm run build` and output directory `dist` if needed.

2) Netlify
   - Push your repo to GitHub.
   - New site from Git → select repo.
   - Build command: `npm run build`
   - Publish directory: `dist`

3) GitHub Pages (using Actions)
   - The repository contains `.github/workflows/deploy_pages.yml` which builds and deploys `dist` from `main`.
   - To enable Pages: in repo Settings → Pages, select `gh-pages` or the default deployment from the Actions workflow.

Local test (build and serve):
```bash
npm ci
npm run build
npx serve -s dist -l 5000
# open http://localhost:5000
```

Notes
- Do not serve raw `index.html` via `file://` — the browser needs transformed JS from `dist`.
- Use branch protection to require PR reviews and passing CI before merging to `main`.
