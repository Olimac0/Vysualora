# Vysualora

## Desarrollo local

```bash
npm install
npm run dev
```

## Publicación (evitar pantalla en blanco)

Este proyecto usa Vite, por lo que necesitas compilar antes de publicar.

```bash
npm run build
```

Luego publica **el contenido de `dist/`** (no el repo completo).  
Si usas GitHub Pages, sube la carpeta `dist/` o configúrala como carpeta de publicación.

## Publicación automática en GitHub Pages

Este repo incluye un workflow que compila con `npm run build` y publica `dist/` en GitHub Pages.

1. Ve a **Settings → Pages**.
2. En **Build and deployment**, selecciona **GitHub Actions**.
3. Haz un push a `main` y GitHub publicará automáticamente el sitio.

URL esperada: `https://olimac0.github.io/Vysualora/` (no uses `/vysualora/index.html`).

> Si usas otra rama, actualiza el workflow en `.github/workflows/deploy.yml`.
