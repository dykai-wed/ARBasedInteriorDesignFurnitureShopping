# AI Tool Ranker (Bootstrap/HTML/JS Version)

A modern, mobile-friendly web app for discovering, ranking, and submitting AI tools for content creators and video editors.

## Features
- Homepage with hero, featured tools, and categories
- Tool listing with sorting
- Tool detail page with info, reviews, screenshots, and demo video
- Tool submission form (with validation)
- Responsive Bootstrap UI
- No build step: works as static HTML/JS/CSS

## Getting Started

1. Open the `public/index.html` file in your browser to preview locally.
2. For a local server (recommended):
   - Use VS Code Live Server, Python's `http.server`, or `npx serve public`
   - Example (Python):
     ```bash
     cd public
     python -m http.server 8080
     # Visit http://localhost:8080
     ```

## File Structure
```
public/
  index.html        # Homepage
  tools.html        # Tool listing
  tool.html         # Tool detail
  submit.html       # Submit tool form
  main.js           # JS logic for all pages
  styles.css        # Custom styles
```

## Customization
- Edit `main.js` to add or update sample tools.
- Replace placeholder images/logos as needed.
- Connect to a backend (Firebase, etc.) for dynamic data.

## License
MIT
