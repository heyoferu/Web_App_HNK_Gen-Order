# HNK Order — Generador de Pedidos

Proyecto mínimo para ejecutar la UI de Pedidos (Heineken) basada en Vite + React + Tailwind.

Requisitos
- Node.js 18+ (o la versión instalada en tu sistema)
- npm (o pnpm/yarn — los comandos abajo usan `npm`)

Instalación (fish shell example)
```fish
cd /home/feru/Documents/dev/HNK_Order
npm install
npm run dev
```

Acceso
- Abre `http://localhost:5173` (Vite por defecto)

Notas
- El proyecto usa `lucide-react` para iconos.
- Las imágenes de productos se esperan en `src/assets/products/<SKU>.png`. Añade tus imágenes ahí o deja los placeholders.
- Para generar imágenes del ticket el app carga `html2canvas` dinámicamente desde CDN.
