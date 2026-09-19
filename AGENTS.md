# AGENTS.md — grupo-rc-sitio

Este repo es la **página web pública** de Redes Deportivas RC (Grupo RC). Si trabajas aquí sin
acceso a otros repos, esto es lo mínimo que necesitas para no romper nada.

## Este repo en una vista rápida

- Sitio multi-página (`index.html` + páginas por categoría de producto), HTML autocontenido, sin
  build step. `assets/js/common.js` tiene las funciones compartidas entre páginas (header, footer,
  formularios de contacto, carrusel del banner).
- **Despliegue:** Vercel, proyecto `grupo-rc-sitio` → `grupo-rc-sitio.vercel.app` (o el dominio
  propio si ya está conectado). Push a la rama principal = producción inmediata. Cualquier otra
  rama = Vercel genera vista previa sola.
- **`/api/nuevo-lead.js`** — función serverless que recibe el formulario de contacto y lo guarda
  directo en la misma base de datos del CRM (tabla `contacts`, origen "Página web").
- **Base de datos:** el mismo proyecto Supabase que CRM/Perfil/Cotizador — el sitio LEE contenido
  editable (`sitio_productos`, `sitio_clientes`, `sitio_banner`) que Reinier administra desde
  AndyControl, no están hardcodeados en el HTML.

## Reglas críticas que NUNCA debes romper aquí

- **Nunca inventes contenido de marca, textos de producto, testimonios, proyectos o cifras de
  negocio.** Si no está confirmado en la documentación de marca/productos o dicho directamente por
  Reinier, es mejor señalarlo como pendiente que improvisarlo.
- **Productos, clientes y banner del Inicio se administran desde AndyControl, no se hardcodean en
  el HTML.** Si necesitas agregar contenido de ese tipo, la solución correcta es una fila nueva en
  Supabase, no texto fijo en el archivo.
- **No reproduzcas contenido con derechos de autor** (logos de terceros como si fueran propios,
  texto copiado de otros sitios, imágenes sin licencia) — los íconos de redes sociales ya existen
  como SVG propio en `common.js`, reutilízalos en vez de buscar alternativas.
- Las imágenes que suban los agentes o el propio sitio deben comprimirse antes de guardarse en
  Supabase Storage (bucket `sitio-fotos`) — no subas imágenes pesadas sin comprimir.
- El formulario de contacto alimenta directamente al CRM real — cualquier cambio ahí afecta leads
  de clientes de verdad, no datos de prueba.
- Antes de tocar cualquier archivo de este repo, revisa la tabla `tareas_rc` en Supabase (proyecto
  `panel-directivo-rc`) — si otra tarea activa ya tiene ese archivo en su campo `archivos`, no lo
  toques en paralelo.
- Todo cambio se entrega por rama (`rc-XXX-descripcion`) → commit → Vercel Preview → aprobación
  de Reinier. Nunca push directo a la rama principal salvo autorización explícita.

## Dónde está el resto del conocimiento

La documentación completa del Ecosistema RC — arquitectura, decisiones de negocio, marca,
productos, reglas de comportamiento de IA — vive en el repo **`panel-directivo-rc`, carpeta
`/docs`**:

- `docs/RC-BRAIN.md`, `docs/ai/AI-RULES.md`, `docs/ai/DECISIONS.md`, `docs/ai/AGENTS.md`,
  `docs/brand/BRAND.md`, `docs/business/BUSINESS.md`, `docs/products/PRODUCTS.md`.

Si tienes acceso a ese repo, léelo antes de cualquier tarea no trivial. Si no lo tienes, pídele a
Reinier que te dé acceso o que te comparta el contenido relevante.
