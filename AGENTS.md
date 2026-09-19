# AGENTS.md — grupo-rc-sitio

Este repo es la **página web pública** de Redes Deportivas RC (Grupo RC). Este archivo está
diseñado para que puedas ejecutar una tarea normal de este repo con seguridad **aunque no tengas
acceso al repo `panel-directivo-rc` ni a su carpeta `/docs`**.

## Este repo en una vista rápida

- Sitio multi-página (`index.html` + páginas por categoría), HTML autocontenido, sin build step.
  `assets/js/common.js` tiene funciones compartidas (header, footer, formularios, carrusel).
- **Despliegue:** Vercel, proyecto `grupo-rc-sitio` → `grupo-rc-sitio.vercel.app`.
- **`/api/nuevo-lead.js`** — función serverless con privilegio elevado (usa
  `SUPABASE_SERVICE_ROLE_KEY`, no la llave pública) que recibe el formulario de contacto y lo
  guarda en `contacts`. Trátala como código sensible, no como una función cualquiera.
- **Base de datos:** el mismo proyecto Supabase que CRM/Perfil/Cotizador. El sitio LEE contenido
  editable (`sitio_productos`, `sitio_clientes`, `sitio_banner`) que Reinier administra desde
  AndyControl — no está hardcodeado en el HTML.

## Identidad de marca confirmada (lo único que puedes dar por hecho sin preguntar)

- Color de marca principal: `#2bbdf3`.
- Nombre del negocio: "Redes Deportivas RC" / "Grupo RC". Nombre alterno si no se quiere asociar
  la marca al nombre de Reinier: "Redes De Contención".
- Equipo de ventas activo, canal de publicidad principal: Facebook Ads.
- **Todo lo demás de marca/negocio (tono de voz, público objetivo, diferenciadores) NO está
  confirmado todavía** — no lo inventes; si una tarea lo requiere, repórtalo como información
  faltante en vez de improvisarlo.

## FLUJO NORMAL — trabaja de corrido sobre "desarrollo", sin detenerte a pedir permiso

Interfaz, estilos, responsividad, botones, filtros, ordenamiento, secciones con contenido que la
tarea ya te dio explícitamente. Trabaja directo sobre la rama persistente `desarrollo` de este
repo (URL fija de Vercel) — no crees una rama nueva por tarea; Reinier pide correcciones sucesivas
sobre la misma URL hasta decir "ya quedó", momento en el que se promueve a producción. Antes de
empezar, consulta `tareas_rc` (proyecto `panel-directivo-rc`) si tienes esa conectividad; si no la
tienes, dilo e igual continúa — no le pidas a Reinier que entre a Supabase manualmente solo para
revisarla por ti.

## FLUJO SENSIBLE — detente y pide autorización explícita ANTES de proceder

- Cualquier texto de marca, producto, testimonio o cifra de negocio que no esté ya confirmado
  arriba o dado explícitamente en la tarea.
- Cambios a `/api/nuevo-lead.js` o a cómo se capturan leads.
- Modificar o borrar estructura/datos de Supabase que ya existen. Crear algo nuevo con default
  seguro es FLUJO NORMAL — ante la duda, trátalo como que requiere autorización.
- Cualquier decisión de negocio que la tarea no haya definido explícitamente.
- Exponer credenciales/tokens (especialmente `SUPABASE_SERVICE_ROLE_KEY`), borrar datos reales, o
  hardcodear contenido de productos/clientes/banner que debería administrarse desde AndyControl —
  esto nunca se hace, ni con autorización.
- Reproducir contenido con derechos de autor ajeno — los íconos de redes sociales ya existen como
  SVG propio en `common.js`, reutilízalos en vez de buscar alternativas.
- Publicar a producción fuera del flujo autorizado.

## NO AMPLIAR EL ALCANCE

No refactorices, "limpies", corrijas ni modernices código que la tarea no pidió. Documenta el
hallazgo y recomienda una tarea separada.

## Trabajo en paralelo

Trabaja siempre en tu propia rama. Ver la nota de `tareas_rc` en FLUJO NORMAL arriba: revisar esa
tabla es deseable, no un requisito bloqueante si no tienes cómo consultarla.

## Entrega de cambios

Rama `rc-XXX-descripcion` → commit → Vercel Preview → Reinier revisa → aprueba → producción.

## Si hay conflicto entre este archivo y la documentación maestra

Si tienes acceso a `panel-directivo-rc/docs` y encuentras algo que contradice lo escrito aquí,
detente y repórtalo — no decidas por tu cuenta cuál versión es la correcta.

## Dónde está el resto del conocimiento (si tienes acceso)

`panel-directivo-rc/docs`: `RC-BRAIN.md`, `ai/AI-RULES.md`, `ai/DECISIONS.md`, `ai/AGENTS.md`,
`brand/BRAND.md`, `business/BUSINESS.md`, `products/PRODUCTS.md`. Si no tienes acceso, este
archivo ya cubre lo necesario para una tarea normal.
