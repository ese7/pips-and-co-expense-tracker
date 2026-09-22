# Pips & Co Expense Tracker - GitHub Pages

This is your expense tracker ready for GitHub Pages + Firebase sync.

## Deploy in 2 minutes

1. Create a new GitHub repo: `pips-and-co-expense-tracker`
2. Upload ALL files from this folder to the repo root (drag & drop)
3. GitHub > Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Save
4. Wait 1-2 min, your site will be at `https://YOURUSERNAME.github.io/pips-and-co-expense-tracker/`

## Custom domain tracker.pipsandco.net

1. Pages > Custom domain > enter `tracker.pipsandco.net` > Save
2. GitHub will show DNS records. In Cloudflare:
   - Add CNAME `tracker` -> `YOURUSERNAME.github.io` -> set to DNS Only (grey) first
   - After cert issued, you can turn proxy back on (orange)
3. Enforce HTTPS checked

## Firebase setup (already configured)

- Firestore Database must be created (test mode)
- Auth > Google provider enabled
- Auth > Settings > Authorized domains > add `tracker.pipsandco.net` and `YOURUSERNAME.github.io`

Your Firebase config is already in index.html.

## What this version includes

- Quarterly & Semi-annually recurrence
- Google Sign-in cloud sync across devices
- Offline PWA support
- Same design as your v51 working version
