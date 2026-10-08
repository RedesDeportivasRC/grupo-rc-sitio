/* ==========================================================================
   GRUPO RC — Capa de datos
   Esta es la "base de datos" del sitio mientras no existe un CMS real.
   Cada arreglo está pensado para migrar 1 a 1 a una tabla / colección
   cuando se conecte un backend (ver notas al final del archivo).
   Todo lo marcado [PLACEHOLDER] debe sustituirse con información real.
   ========================================================================== */

// ---------------- CATEGORÍAS (por tipo de producto) ----------------
const CATEGORIAS = [
  { slug:'redes-perimetrales', nombre:'Redes Perimetrales', descripcionCorta:'Una red, muchas soluciones: deporte, protección y contención.' },
  { slug:'redes-deportivas', nombre:'Redes Deportivas', descripcionCorta:'Redes para jugar: básquetbol, voleibol y usos especiales.' },
  { slug:'redes-para-porterias', nombre:'Redes para Porterías', descripcionCorta:'Tejido hexagonal de alta resistencia para arcos de fútbol.' },
  { slug:'porterias', nombre:'Porterías', descripcionCorta:'Porterías completas, fabricadas artesanalmente, en distintas medidas.' },
  { slug:'baloneras', nombre:'Baloneras', descripcionCorta:'Almacenamiento y transporte de balones para equipos e instalaciones.' },
  { slug:'redes-de-proteccion', nombre:'Redes de Protección y Seguridad', descripcionCorta:'Anticaídas, obra y resguardo industrial.' },
  { slug:'soluciones-especiales', nombre:'Soluciones Especiales', descripcionCorta:'Proyectos a la medida que no entran en una categoría fija.' },
];

// ---------------- DEPORTES (segunda forma de navegar, sin duplicar productos) ----------------
const DEPORTES = [
  { slug:'futbol', nombre:'Fútbol', productos:['perimetral-futbol','porteria-oficial','porteria-futbol7','porteria-micro','red-porteria-hexagonal'] },
  { slug:'basquetbol', nombre:'Básquetbol', productos:['red-basquetbol','balonera-basquetbol'] },
  { slug:'voleibol', nombre:'Voleibol', productos:['red-voleibol'] },
  { slug:'beisbol', nombre:'Béisbol / Sóftbol', productos:['jaula-bateo','red-backstop'] },
  { slug:'otros-deportes', nombre:'Otros deportes', productos:[] },
];

// ---------------- PRODUCTOS ----------------
// Estructura completa por producto, lista para volverse un producto de tienda.
const PRODUCTOS = [
  {
    sku:'RC-PERI-001',
    nombre:'Red Perimetral',
    categoria:'redes-perimetrales',
    subcategoria:'Cerramiento deportivo e industrial',
    descripcionCorta:'Cierra, protege y delimita canchas, obras, almacenes y espacios de todo tipo.',
    descripcionCompleta:'[PLACEHOLDER] Descripción completa a definir contigo: material exacto, proceso de fabricación y ventajas frente a otras opciones del mercado.',
    fotos:['[PLACEHOLDER foto 1]','[PLACEHOLDER foto 2]','[PLACEHOLDER foto 3]'],
    video:null,
    material:'[PLACEHOLDER — nylon / polietileno / polipropileno, confirmar]',
    calibre:'[PLACEHOLDER]',
    color:['Blanco','Negro','[otros colores disponibles]'],
    medidas:'A la medida — se cotiza por m²',
    usos:['Canchas de fútbol','Fútbol rápido','Fútbol 7','Fútbol 11','Básquetbol','Voleibol','Complejos deportivos','Escuelas','Hoteles','Clubes','Universidades','Construcción','Protección contra caídas','Pajareras','Jaulas','Ganado','Anaqueles','Separación de espacios','Protección industrial'],
    caracteristicas:['Resistente a intemperie','Instalación a la medida','Distintas aberturas de malla (1", 2", 3", 4")'],
    precio:null,
    disponibilidad:'A pedido',
    productosRelacionados:['red-porteria-hexagonal','red-basquetbol'],
    descargas:['ficha-tecnica-perimetral'],
    etiquetas:['perimetral','multiuso','industrial','deportivo'],
    estado:'activo',
  },
  {
    sku:'RC-PORT-HEX-001',
    nombre:'Red de Portería Hexagonal (estilo europeo)',
    categoria:'redes-para-porterias',
    subcategoria:'Fútbol',
    descripcionCorta:'Tejido hexagonal ("colmena") de poliéster trenzado de alta resistencia.',
    descripcionCompleta:'Red tejida en poliéster trenzado de alta resistencia, aproximadamente 60 filamentos por hilo, con patrón hexagonal tipo "colmena" — el estándar visual de las porterías europeas modernas.',
    fotos:['[PLACEHOLDER foto portería hexagonal 1]','[PLACEHOLDER foto 2]'],
    video:null,
    material:'Poliéster trenzado de alta resistencia',
    calibre:'~60 filamentos por hilo',
    color:['Blanco','Negro'],
    medidas:'Según medida de portería (ver sección Porterías)',
    usos:['Porterías de fútbol 11, 7 y micro'],
    caracteristicas:['Tejido hexagonal tipo colmena','Alta resistencia a impacto','Buena caída y estética profesional'],
    precio:null,
    disponibilidad:'A pedido',
    productosRelacionados:['porteria-oficial','porteria-futbol7'],
    descargas:['ficha-tecnica-red-hexagonal'],
    etiquetas:['porteria','futbol','hexagonal'],
    estado:'activo',
  },
  {
    sku:'RC-PORT-OFI-001',
    nombre:'Portería Oficial — Fútbol 11',
    categoria:'porterias',
    subcategoria:'Fútbol 11',
    descripcionCorta:'Medida reglamentaria 7.5 × 2.5 m, fabricación artesanal.',
    descripcionCompleta:'[PLACEHOLDER] Detalle de estructura (material del marco, acabado, anclaje) a confirmar contigo.',
    fotos:['[PLACEHOLDER foto portería oficial]'],
    video:null,
    material:'[PLACEHOLDER — estructura]',
    calibre:null,
    color:['[PLACEHOLDER]'],
    medidas:'7.5 x 2.5 m',
    usos:['Canchas reglamentarias de fútbol 11'],
    caracteristicas:['Fabricación artesanal','Red hexagonal incluida'],
    precio:null,
    disponibilidad:'A pedido',
    productosRelacionados:['red-porteria-hexagonal'],
    descargas:[],
    etiquetas:['porteria','futbol','fut11'],
    estado:'activo',
  },
  {
    sku:'RC-PORT-F7-001',
    nombre:'Portería Fútbol 7',
    categoria:'porterias',
    subcategoria:'Fútbol 7',
    descripcionCorta:'Disponible en 6 × 2 m y 5 × 2 m.',
    descripcionCompleta:'[PLACEHOLDER]',
    fotos:['[PLACEHOLDER foto portería fut7]'],
    video:null, material:'[PLACEHOLDER]', calibre:null, color:['[PLACEHOLDER]'],
    medidas:'6 x 2 m / 5 x 2 m',
    usos:['Canchas de fútbol 7'],
    caracteristicas:['Fabricación artesanal'],
    precio:null, disponibilidad:'A pedido',
    productosRelacionados:['red-porteria-hexagonal'], descargas:[],
    etiquetas:['porteria','futbol','fut7'], estado:'activo',
  },
  {
    sku:'RC-PORT-MIC-001',
    nombre:'Portería Micro',
    categoria:'porterias',
    subcategoria:'Micro fútbol',
    descripcionCorta:'Disponible en 4 × 1.8 m, 4 × 2 m y 3.2 × 1.8 m.',
    descripcionCompleta:'[PLACEHOLDER]',
    fotos:['[PLACEHOLDER foto portería micro]'],
    video:null, material:'[PLACEHOLDER]', calibre:null, color:['[PLACEHOLDER]'],
    medidas:'4 x 1.8 m / 4 x 2 m / 3.2 x 1.8 m',
    usos:['Micro fútbol','Escuelas','Canchas reducidas'],
    caracteristicas:['Fabricación artesanal','Ideal para espacios reducidos'],
    precio:null, disponibilidad:'A pedido',
    productosRelacionados:['red-porteria-hexagonal'], descargas:[],
    etiquetas:['porteria','futbol','micro'], estado:'activo',
  },
  {
    sku:'RC-BASQ-001',
    nombre:'Red de Básquetbol',
    categoria:'redes-deportivas',
    subcategoria:'Básquetbol',
    descripcionCorta:'Red reforzada para aro, uso rudo y competencia.',
    descripcionCompleta:'[PLACEHOLDER]',
    fotos:['[PLACEHOLDER foto red basquetbol]'],
    video:null, material:'[PLACEHOLDER]', calibre:'[PLACEHOLDER]', color:['Blanco'],
    medidas:'Estándar de aro',
    usos:['Canchas de básquetbol'],
    caracteristicas:['Resistente a uso rudo'],
    precio:null, disponibilidad:'A pedido',
    productosRelacionados:['balonera-basquetbol'], descargas:[],
    etiquetas:['basquetbol','deportiva'], estado:'activo',
  },
  {
    sku:'RC-VOL-001',
    nombre:'Red de Voleibol',
    categoria:'redes-deportivas',
    subcategoria:'Voleibol',
    descripcionCorta:'Redes de competencia y recreativas, con o sin antena.',
    descripcionCompleta:'[PLACEHOLDER]',
    fotos:['[PLACEHOLDER foto red voleibol]'],
    video:null, material:'[PLACEHOLDER]', calibre:'[PLACEHOLDER]', color:['Blanco','Negro'],
    medidas:'Estándar de cancha',
    usos:['Canchas de voleibol de playa y techado'],
    caracteristicas:['Con o sin antena','Refuerzo en orillas'],
    precio:null, disponibilidad:'A pedido',
    productosRelacionados:[], descargas:[],
    etiquetas:['voleibol','deportiva'], estado:'activo',
  },
  {
    sku:'RC-BALO-001',
    nombre:'Balonera',
    categoria:'baloneras',
    subcategoria:'Almacenamiento',
    descripcionCorta:'Para transporte y resguardo de balones en equipos e instalaciones.',
    descripcionCompleta:'[PLACEHOLDER]',
    fotos:['[PLACEHOLDER foto balonera]'],
    video:null, material:'[PLACEHOLDER]', calibre:null, color:['[PLACEHOLDER]'],
    medidas:'[PLACEHOLDER — capacidades disponibles]',
    usos:['Escuelas','Clubes','Equipos deportivos'],
    caracteristicas:['Fácil transporte'],
    precio:null, disponibilidad:'A pedido',
    productosRelacionados:[], descargas:[],
    etiquetas:['balonera','accesorio'], estado:'activo',
  },
  {
    sku:'RC-PROT-001',
    nombre:'Red de Protección / Anticaídas',
    categoria:'redes-de-proteccion',
    subcategoria:'Obra y seguridad industrial',
    descripcionCorta:'Protección perimetral para construcción y resguardo industrial.',
    descripcionCompleta:'[PLACEHOLDER — normativa aplicable a confirmar]',
    fotos:['[PLACEHOLDER foto obra]'],
    video:null, material:'[PLACEHOLDER]', calibre:'[PLACEHOLDER]', color:['[PLACEHOLDER]'],
    medidas:'A la medida',
    usos:['Construcción','Protección contra caídas','Resguardo industrial'],
    caracteristicas:['[PLACEHOLDER cumplimiento normativo]'],
    precio:null, disponibilidad:'A pedido',
    productosRelacionados:['red-perimetral'], descargas:[],
    etiquetas:['proteccion','obra','seguridad'], estado:'activo',
  },
];

// ---------------- PROYECTOS (portafolio) ----------------
// [PLACEHOLDER] — nombres mencionados en el brief, SIN inventar detalles.
// Reinier: llena fotos, descripción y productos usados de cada uno.
const PROYECTOS = [
  { slug:'universidad-modelo', nombre:'Universidad Modelo', cliente:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', tipo:'[PLACEHOLDER]', fotos:['[PLACEHOLDER]'], descripcion:'[PLACEHOLDER — pendiente de información real]', productosUsados:[], fecha:'[PLACEHOLDER]', categorias:['educativo'], video:null, testimonio:null },
  { slug:'instituto-alianz', nombre:'Instituto Alianz', cliente:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', tipo:'[PLACEHOLDER]', fotos:['[PLACEHOLDER]'], descripcion:'[PLACEHOLDER — pendiente de información real]', productosUsados:[], fecha:'[PLACEHOLDER]', categorias:['educativo'], video:null, testimonio:null },
  { slug:'hotel-chable', nombre:'Hotel Chablé', cliente:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', tipo:'[PLACEHOLDER]', fotos:['[PLACEHOLDER]'], descripcion:'[PLACEHOLDER — pendiente de información real]', productosUsados:[], fecha:'[PLACEHOLDER]', categorias:['hotelero'], video:null, testimonio:null },
  { slug:'proyecto-perimetral-1', nombre:'[PLACEHOLDER — nombre de proyecto]', cliente:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', tipo:'Redes perimetrales', fotos:['[PLACEHOLDER]'], descripcion:'[PLACEHOLDER]', productosUsados:['red-perimetral'], fecha:'[PLACEHOLDER]', categorias:['perimetral'], video:null, testimonio:null },
];

// ---------------- CLIENTES ----------------
const CLIENTES = [
  { nombre:'[PLACEHOLDER — cliente 1]', logo:null, sector:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', proyectoRelacionado:null, testimonio:null, fotos:[] },
  { nombre:'[PLACEHOLDER — cliente 2]', logo:null, sector:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', proyectoRelacionado:null, testimonio:null, fotos:[] },
  { nombre:'[PLACEHOLDER — cliente 3]', logo:null, sector:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', proyectoRelacionado:null, testimonio:null, fotos:[] },
  { nombre:'[PLACEHOLDER — cliente 4]', logo:null, sector:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', proyectoRelacionado:null, testimonio:null, fotos:[] },
  { nombre:'[PLACEHOLDER — cliente 5]', logo:null, sector:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', proyectoRelacionado:null, testimonio:null, fotos:[] },
  { nombre:'[PLACEHOLDER — cliente 6]', logo:null, sector:'[PLACEHOLDER]', ubicacion:'[PLACEHOLDER]', proyectoRelacionado:null, testimonio:null, fotos:[] },
];

// ---------------- BLOG (contenido de ejemplo, claramente marcado) ----------------
const BLOG_POSTS = [
  { slug:'como-elegir-red-perimetral', titulo:'Cómo elegir una red perimetral', imagen:'[PLACEHOLDER]', categoria:'Guías', autor:'Grupo RC', fecha:'[EJEMPLO — pendiente]', extracto:'[CONTENIDO DE EJEMPLO] Qué preguntarte antes de cotizar tu red perimetral.', contenido:'[CONTENIDO DE EJEMPLO — pendiente de redacción real]', galeria:[], video:null, productosRelacionados:['red-perimetral'], proyectosRelacionados:[], seoTitle:'Cómo elegir una red perimetral | Grupo RC', metaDescription:'[EJEMPLO]' },
  { slug:'que-calibre-necesitas', titulo:'Qué calibre de red necesitas', imagen:'[PLACEHOLDER]', categoria:'Guías', autor:'Grupo RC', fecha:'[EJEMPLO — pendiente]', extracto:'[CONTENIDO DE EJEMPLO] Diferencias prácticas entre calibres.', contenido:'[CONTENIDO DE EJEMPLO]', galeria:[], video:null, productosRelacionados:['red-perimetral'], proyectosRelacionados:[], seoTitle:'Qué calibre de red necesitas | Grupo RC', metaDescription:'[EJEMPLO]' },
  { slug:'nylon-vs-poliester', titulo:'Diferencias entre nylon y poliéster', imagen:'[PLACEHOLDER]', categoria:'Materiales', autor:'Grupo RC', fecha:'[EJEMPLO — pendiente]', extracto:'[CONTENIDO DE EJEMPLO] Cuándo conviene cada material.', contenido:'[CONTENIDO DE EJEMPLO]', galeria:[], video:null, productosRelacionados:[], proyectosRelacionados:[], seoTitle:'Nylon vs. poliéster | Grupo RC', metaDescription:'[EJEMPLO]' },
  { slug:'como-instalar-red-perimetral', titulo:'Cómo instalar una red perimetral', imagen:'[PLACEHOLDER]', categoria:'Instalación', autor:'Grupo RC', fecha:'[EJEMPLO — pendiente]', extracto:'[CONTENIDO DE EJEMPLO] Paso a paso general de instalación.', contenido:'[CONTENIDO DE EJEMPLO]', galeria:[], video:null, productosRelacionados:['red-perimetral'], proyectosRelacionados:[], seoTitle:'Cómo instalar una red perimetral | Grupo RC', metaDescription:'[EJEMPLO]' },
  { slug:'como-medir-tu-cancha', titulo:'Cómo medir tu cancha antes de cotizar', imagen:'[PLACEHOLDER]', categoria:'Guías', autor:'Grupo RC', fecha:'[EJEMPLO — pendiente]', extracto:'[CONTENIDO DE EJEMPLO] Herramientas y pasos para medir bien.', contenido:'[CONTENIDO DE EJEMPLO]', galeria:[], video:null, productosRelacionados:[], proyectosRelacionados:[], seoTitle:'Cómo medir tu cancha | Grupo RC', metaDescription:'[EJEMPLO]' },
  { slug:'redes-proteccion-construccion', titulo:'Redes de protección para construcción', imagen:'[PLACEHOLDER]', categoria:'Seguridad', autor:'Grupo RC', fecha:'[EJEMPLO — pendiente]', extracto:'[CONTENIDO DE EJEMPLO] Qué considerar en obra.', contenido:'[CONTENIDO DE EJEMPLO]', galeria:[], video:null, productosRelacionados:['red-proteccion'], proyectosRelacionados:[], seoTitle:'Redes de protección para construcción | Grupo RC', metaDescription:'[EJEMPLO]' },
];

// ---------------- RECURSOS / DESCARGAS ----------------
const RECURSOS = [
  { slug:'catalogo-general', nombre:'Catálogo general', descripcion:'Todos nuestros productos y medidas en un solo documento.', imagen:null, archivo:'[PLACEHOLDER — subir PDF]', categoria:'Catálogo', fecha:'[PLACEHOLDER]', version:'1.0' },
  { slug:'manual-instalacion', nombre:'Manual de instalación', descripcion:'Guía paso a paso para instalar tu red perimetral.', imagen:null, archivo:'[PLACEHOLDER — subir PDF]', categoria:'Manual', fecha:'[PLACEHOLDER]', version:'1.0' },
  { slug:'ficha-tecnica-perimetral', nombre:'Ficha técnica — Red Perimetral', descripcion:'Especificaciones de material, calibre y resistencia.', imagen:null, archivo:'[PLACEHOLDER — subir PDF]', categoria:'Ficha técnica', fecha:'[PLACEHOLDER]', version:'1.0' },
  { slug:'ficha-tecnica-red-hexagonal', nombre:'Ficha técnica — Red hexagonal para portería', descripcion:'Poliéster trenzado, ~60 filamentos, tejido colmena.', imagen:null, archivo:'[PLACEHOLDER — subir PDF]', categoria:'Ficha técnica', fecha:'[PLACEHOLDER]', version:'1.0' },
  { slug:'guia-medidas', nombre:'Guía de medidas', descripcion:'Cómo tomar las medidas correctas antes de cotizar.', imagen:null, archivo:'[PLACEHOLDER — subir PDF]', categoria:'Guía', fecha:'[PLACEHOLDER]', version:'1.0' },
];

// ---------------- VIDEOS ----------------
const VIDEOS = [
  { titulo:'[PLACEHOLDER — instalación de red perimetral]', categoria:'Instalaciones', url:null, miniatura:null },
  { titulo:'[PLACEHOLDER — proceso de fabricación]', categoria:'Fabricación', url:null, miniatura:null },
  { titulo:'[PLACEHOLDER — proyecto entregado]', categoria:'Proyectos', url:null, miniatura:null },
];

// ---------------- BANNERS (inicio, franjas promocionales) ----------------
const BANNERS = [
  { tipo:'producto', titulo:'Redes Perimetrales', subtitulo:'Protección, seguridad y delimitación para todo tipo de espacios.', boton:'Conoce las redes', url:'productos/redes-perimetrales.html', orden:1, activo:true },
  { tipo:'aplicacion', titulo:'Una red. Muchas soluciones.', subtitulo:'Deporte, construcción, agro e industria — el mismo producto, distintas necesidades.', boton:'Ver aplicaciones', url:'productos/redes-perimetrales.html#usos', orden:2, activo:true },
  { tipo:'cta', titulo:'¿Tienes un proyecto?', subtitulo:'No necesitas saber qué producto exacto buscas — cuéntanos qué necesitas resolver.', boton:'Hablar con un asesor', url:'contacto.html', orden:3, activo:true },
];

// ---------------- Datos de la empresa (config global) ----------------
const EMPRESA = {
  nombre:'Grupo RC',
  nombreLargo:'Redes Deportivas RC',
  frase:'Déjate atrapar por nuestras redes.',
  proposito:'Que el deporte no se detenga.',
  frasesSecundarias:[
    'No vendemos solamente redes, resolvemos necesidades.',
    'Cada proyecto tiene una solución.',
    'Redes para deporte, protección y mucho más.',
    'Soluciones a la medida.',
  ],
  telefono:'999 553 8184',
  telefonoHref:'+529995538184',
  whatsapp:'529995538184',
  correo:'redesdeportivasrc@gmail.com',
  direccion:'C. 114 #581-1 x 29 y 29A, Los Ángeles, Caucel, Mérida, Yucatán, México',
  horarios:'Lunes a viernes, 9:00 a.m. – 6:00 p.m.',
  mapaUrl:'https://maps.app.goo.gl/9jCNwpsFQGWjsxzC6',  // liga de Google Maps que mandó Reinier (8 oct 2026)
  mapaBusqueda:'Redes Deportivas RC, C. 114 581, Caucel, Mérida, Yucatán',
  estadosDondeVendemos:['Yucatán','[PLACEHOLDER — resto de estados donde venden]'],
  redes:{
    facebook:'https://facebook.com/redesdeportivasrc',
    instagram:'https://instagram.com/redesdeportivasrc',
    youtube:'https://www.youtube.com/@RedesDeportivasRC',
  },
};

// Lista para el desplegable de "Estado" en el formulario de contacto.
const ESTADOS_MEXICO = [
  'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua',
  'Ciudad de México','Coahuila','Colima','Durango','Guanajuato','Guerrero','Hidalgo','Jalisco',
  'Estado de México','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro',
  'Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala',
  'Veracruz','Yucatán','Zacatecas','Fuera de México',
];

// ---------------- FOTOS REALES DE TRABAJOS (assets/img/trabajos) ----------------
const FOTOS_TRABAJOS = [
  { archivo:'cancha-multiusos-perimetral.jpg', alt:'Red perimetral negra en cancha multiusos', categoria:'proyecto' },
  { archivo:'cancha-futbol-perimetral.jpg', alt:'Red perimetral en cancha de fútbol de pasto sintético', categoria:'deporte' },
  { archivo:'red-perimetral-campo.jpg', alt:'Red perimetral instalada en campo abierto', categoria:'proyecto' },
  { archivo:'detalle-malla-cancha.jpg', alt:'Detalle de la malla romboidal frente a una cancha', categoria:'producto' },
  { archivo:'estructura-red-altura.jpg', alt:'Red perimetral de altura sobre muro', categoria:'aplicacion' },
  { archivo:'red-perimetral-cielo.jpg', alt:'Red perimetral alta vista desde abajo', categoria:'producto' },
];

// ---------------- BANNER PRINCIPAL DEL INICIO ----------------
// Cada diapositiva: foto (o null = fondo de marca), texto corto y botón.
const HERO_SLIDES = [
  { foto:'cancha-multiusos-perimetral.jpg', ojo:'Redes perimetrales a la medida', titulo:'Que el deporte no se detenga.', texto:'Fabricamos la red exacta para tu cancha, escuela u obra, con las medidas de tu espacio.', boton:{ texto:'Ver redes perimetrales', url:'productos/redes-perimetrales.html' } },
  { foto:'cancha-futbol-perimetral.jpg', ojo:'Experiencia', titulo:'Más de 25 años en redes.', texto:'Más de 25 años comercializando redes y más de 20 instalándolas. Sabemos qué funciona en cada cancha.', boton:{ texto:'Conócenos', url:'nosotros.html' } },
  { foto:'red-perimetral-campo.jpg', ojo:'Envíos', titulo:'Enviamos a toda la República.', texto:'Tu cotización ya incluye el envío. Estándar a domicilio de 4 a 8 días hábiles, o urgente por aerolínea en 24 a 48 horas.', boton:{ texto:'Cotizar con envío', url:'contacto.html' } },
  { foto:'estructura-red-altura.jpg', ojo:'Asesoría', titulo:'Te asesoramos en la instalación.', texto:'Te decimos qué abertura, qué altura y qué fijación necesitas. En Yucatán la instalamos nosotros.', boton:{ texto:'Pedir asesoría', url:'contacto.html' } },
  { foto:null, ojo:'Porterías', titulo:'Porterías oficiales, fútbol 7 y micro.', texto:'Fabricación artesanal con red hexagonal tipo colmena, el estilo de las porterías europeas.', boton:{ texto:'Ver porterías', url:'productos/porterias.html' } },
  { foto:'detalle-malla-cancha.jpg', ojo:'Fabricación a la medida', titulo:'Hecha para tu espacio.', texto:'Aberturas de 1", 2", 3" y 4", en blanco o negro.', boton:{ texto:'Cotizar mi red', url:'contacto.html' } },
];

// ---------------- FORTALEZAS (franja bajo el banner) ----------------
const FORTALEZAS = [
  { ico:'🏆', titulo:'+25 años en redes', texto:'Y más de 20 instalando.' },
  { ico:'🚚', titulo:'Envíos a toda la República', texto:'La cotización incluye el envío.' },
  { ico:'🛠️', titulo:'Asesoría en instalación', texto:'Abertura, altura y fijación.' },
  { ico:'📐', titulo:'Fabricación a la medida', texto:'Con las medidas de tu espacio.' },
  { ico:'👷', titulo:'Capacitamos instaladores', texto:'En diferentes partes de México.' },
  { ico:'🛒', titulo:'También en Mercado Libre', texto:'Ya estamos en Mercado Libre.' },
];

// ---------------- CLIENTES SATISFECHOS ----------------
// Comentarios REALES copiados tal cual de Facebook (Recomendaciones) y Google Maps.
// Capturas que mandó Reinier el 8 oct 2026. Nunca inventar ni editar el sentido de un comentario.
// Nombre + inicial del apellido. Si queda vacío, la sección no aparece en el sitio publicado.
// inicio:true = aparece en la página de Inicio; todos aparecen en Clientes.
const RESUMEN_OPINIONES = { facebookPct:100, facebookTotal:19 };
const TESTIMONIOS = [
  { nombre:'Carlos Lobo R.', fuente:'facebook', lugar:'Guadalajara', inicio:true, texto:'Recomiendo ampliamente a GRUPO RC. Me atendieron y ayudaron en todo momento con asesoría cuando fue requerida mientras instalaba una red. Estando yo en Guadalajara me hicieron llegar la red en tiempo y forma, además me ayudaron con asesoría vía telefónica para su instalación.' },
  { nombre:'Rommel S.', fuente:'google', inicio:true, texto:'Súper recomendable, personas amables y comprometidas con su trabajo. Me asesoraron y ayudaron a instalar una red que les compré, son rápidos en la entrega y manejan buena calidad de sus materiales. Les he comprado redes perimetrales y porterías.' },
  { nombre:'Arturo V.', fuente:'facebook', lugar:'Linares, N.L.', inicio:true, texto:'Muy buen producto, atención al cliente rápida y buena, envío rápido, recomendados.' },
  { nombre:'Rogelio Axel S.', fuente:'facebook', inicio:true, texto:'Buena atención y rapidez en la compra. El producto era más que lo que esperaba, muy detallado y profesional. Recomendado al 100.' },
  { nombre:'Raúl Medina C.', fuente:'facebook', inicio:true, texto:'Muy buena atención y la portería y la red de muy buena calidad, mi hijo está super feliz, lo recomiendo ampliamente.' },
  { nombre:'Roger V.', fuente:'google', inicio:true, texto:'¡Los recomiendo mucho! Excelente compra, el personal fue muy amable y me asesoró en todo momento, ayudándome a elegir justo lo que necesitaba.' },
  { nombre:'Emmanuel C.', fuente:'facebook', texto:'Muy buen material en las redes y las porterías muy resistente y muy práctico y las baloneras muy buenas.' },
  { nombre:'Alexis V.', fuente:'facebook', texto:'¡Redes de excelente calidad! Quedé encantado con el material, calidad y precio. Muchas gracias.' },
  { nombre:'Academia de Béisbol JV', fuente:'facebook', texto:'Recomendable ampliamente. Una atención muy buena. Seguimiento. Entrega en un tiempo muy aceptable.' },
  { nombre:'José E. G.', fuente:'facebook', texto:'Excelente calidad en las redes y excelente atención. 100% recomendable.' },
  { nombre:'Max H.', fuente:'facebook', texto:'Muy rápidos en enviar y a buen precio.' },
  { nombre:'Pina V.', fuente:'facebook', texto:'El más feliz con su balonera. Son de muy buena calidad y la entrega rapidísima.' },
  { nombre:'Juan E.', fuente:'facebook', texto:'Baloneras de muy buena calidad, resistentes y muy útiles, 100% recomendado.' },
  { nombre:'Eduardo P.', fuente:'facebook', texto:'Los recomiendo, buena y pronta atención, ¡la mejor opción!' },
];

// ---------------- Posicionamiento de marca (Misión / Visión / Valores / Quiénes somos) ----------------
const MARCA_RC = {
  mision:'Crear soluciones que protejan, conecten y hagan posible el deporte.',
  misionTexto:'Acompañamos a nuestros clientes desde la planeación hasta la colocación de sus redes, brindándoles asesoría profesional para elegir la solución adecuada para su espacio, su necesidad y su presupuesto. No buscamos simplemente entregar una red. Buscamos que nuestros clientes sepan qué están comprando, por qué lo necesitan y cómo aprovecharlo al máximo.',
  vision:'Que ninguna cancha en México tenga que detener un partido por falta de protección o por una red que no cumple su función.',
  visionTexto:'Queremos contribuir a que los espacios deportivos de todo el país cuenten con redes de calidad, funcionales y con una apariencia profesional, convirtiéndonos en una de las empresas más recomendadas y en un referente nacional en soluciones de protección deportiva. Y llevar el conocimiento que hemos construido durante décadas a cada vez más clientes, instaladores y proyectos en México.',
  valores:[
    { nombre:'Asesoría', texto:'No todos nuestros clientes son expertos en redes. Nosotros sí. Escuchamos, preguntamos y recomendamos la solución que realmente necesitan, desde el tipo de red y material hasta la altura, fijación e instalación.' },
    { nombre:'Confianza', texto:'Queremos que nuestros clientes tengan la tranquilidad de saber con quién están haciendo negocios. Construimos confianza siendo transparentes, mostrando quiénes somos y respaldando nuestro trabajo con experiencia, presencia y certeza legal.' },
    { nombre:'Compromiso', texto:'Nuestro trabajo no termina cuando entregamos una red. Acompañamos al cliente durante el proyecto y buscamos que la solución funcione correctamente mucho después de la compra.' },
    { nombre:'Experiencia', texto:'Más de 25 años comercializando redes y más de 20 años participando en su instalación nos han enseñado algo que ningún catálogo puede explicar: cada proyecto tiene sus propias necesidades.' },
    { nombre:'Calidad', texto:'Elegimos materiales y soluciones pensando en el uso real que tendrán. Porque una red no solamente debe verse bien el día que se instala; debe cumplir su función con el paso del tiempo.' },
    { nombre:'Adaptabilidad', texto:'No creemos en soluciones iguales para todos. Buscamos alternativas de acuerdo con las necesidades, características y posibilidades de cada proyecto.' },
    { nombre:'Transparencia', texto:'Creemos que invertir en un proyecto requiere confianza. Por eso procuramos que nuestros clientes conozcan nuestra empresa, nuestra experiencia y las condiciones de su compra antes de tomar una decisión.' },
  ],
  quienesSomos:'Somos Grupo RC, una empresa mexicana especializada en redes deportivas y soluciones de protección para espacios deportivos. Nuestra experiencia comenzó hace más de 25 años y, desde entonces, hemos aprendido que colocar una red correctamente es mucho más que elegir una medida. Por eso acompañamos a nuestros clientes antes, durante y después de cada proyecto. Les ayudamos a determinar qué solución necesitan de acuerdo con el deporte que practican, las características de su espacio, el nivel de protección que buscan y el presupuesto disponible. También compartimos nuestra experiencia en instalación: desde la elección de los materiales y sistemas de fijación hasta las recomendaciones necesarias para lograr una instalación funcional y duradera. Nuestra experiencia no se queda en nuestra propia operación. Capacitamos instaladores en diferentes partes de México y continuamos realizando instalaciones directamente en Yucatán. Creemos que una buena compra comienza con una buena decisión. Y una buena decisión se toma cuando tienes la información, las alternativas y la confianza necesarias para elegir correctamente. Hoy nuestro objetivo es llevar esa experiencia a cada vez más espacios deportivos de México.',
  filosofia:[
    'Creemos que el deporte debe poder disfrutarse sin interrupciones.',
    'Que un balón no debería detener un partido.',
    'Que una cancha debe verse tan profesional como el deporte que se practica en ella.',
    'Y que elegir una red no debería convertirse en una decisión complicada.',
    'Por eso compartimos nuestra experiencia, escuchamos las necesidades de cada proyecto y buscamos soluciones que realmente tengan sentido para cada cliente.',
    'No se trata solamente de colocar una red. Se trata de proteger el espacio, cuidar la inversión y ayudar a que cada partido pueda seguir jugando.',
    'Porque cuando la red cumple su función, el deporte no se detiene.',
  ],
};

/* ==========================================================================
   NOTA DE MIGRACIÓN A CMS/BACKEND (léase antes de conectar una API real):
   - Cada arreglo de arriba = una tabla/colección (products, projects,
     clients, blog_posts, resources, videos, banners).
   - Cada objeto = una fila/documento con exactamente estos campos.
   - Los renderers en common.js (renderProductCard, renderProjectCard, etc.)
     ya reciben estos objetos como parámetro — el día que esto venga de una
     API en vez de este archivo, solo se reemplaza CÓMO se obtienen los
     arreglos (fetch en vez de const), el resto del sitio no cambia.
   ========================================================================== */
