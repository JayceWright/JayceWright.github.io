# Jayce Wright — Portfolio

Personal portfolio site. Hosted via **GitHub Pages** at `https://jaycewright.github.io`

## Stack

- Pure HTML + CSS + Vanilla JS (no framework, no build step)
- Google Fonts: JetBrains Mono + Inter
- GitHub Pages hosting

## Structure

```
├── index.html          ← main page
├── css/
│   └── style.css       ← design system (CSS variables → easy to retheme)
├── js/
│   └── main.js         ← EN/RU toggle, typed animation, scroll reveal
└── assets/
    ├── img/            ← photos, og-image
    └── files/          ← resume.pdf
```

## Customization

- **Colors**: edit CSS variables at top of `style.css` (`:root { ... }`)
- **Content**: edit sections directly in `index.html`
- **EN/RU text**: use `data-en="..."` and `data-ru="..."` attributes on any element
- **Resume PDF**: drop file into `assets/files/resume.pdf`
- **Typed roles**: edit `ROLES` object in `js/main.js`
