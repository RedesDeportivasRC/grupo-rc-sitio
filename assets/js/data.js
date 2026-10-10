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
    color:['Negro'],
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

// ---------------- BLOG ----------------
const PORTADAS_BLOG = {"como-elegir-red-perimetral": "red-contencion-golf-alta-postes-negros.jpg", "como-instalar-red-perimetral": "instalacion-red-perimetral-postes-verdes-campo-golf.jpg", "errores-comprar-redes-deportivas": "porterias-futbol-red-hexagonal-blanca-cancha-techada.jpg", "preparar-instalacion-red-perimetral": "cimentacion-postes-red-perimetral-colado-concreto.jpg", "redes-1-2-3-4-pulgadas": "red-perimetral-negra-cancha-futbol-pasto-sintetico.jpg", "redes-deportivas-artesanales-yucatan": "tejido-artesanal-red-porteria-taller-yucatan.jpg"};
// Artículos de Reinier Coral (PDF del 10 oct 2026). Cada uno vive en blog/<slug>.html (HTML estático, bueno para Google).
const BLOG_POSTS = [
  { slug:'como-elegir-red-perimetral', titulo:'Cómo elegir una red perimetral para una cancha deportiva', categoria:'Guía técnica', minutos:7, fecha:'2026-10-10', extracto:'Abertura, material, clima e instalación: cómo comparar la inversión completa al elegir una red perimetral.' },
  { slug:'redes-1-2-3-4-pulgadas', titulo:'Redes de 1, 2, 3 y 4 pulgadas: diferencias y cómo elegir la adecuada', categoria:'Guía técnica', minutos:7, fecha:'2026-10-10', extracto:'Qué significan las pulgadas y los rombos de una red, y qué abertura conviene para golf, canchas o aves.' },
  { slug:'preparar-instalacion-red-perimetral', titulo:'Qué preparar antes de instalar una red perimetral', categoria:'Instalación', minutos:9, fecha:'2026-10-10', extracto:'Medidas, postes, sujeciones, techo, acceso y seguridad: lo que conviene planear antes del día de instalación.' },
  { slug:'redes-deportivas-artesanales-yucatan', titulo:'Redes deportivas artesanales de Yucatán: la historia de nuestro tejido tipo colmena', categoria:'Historia RC', minutos:7, fecha:'2026-10-10', extracto:'El origen familiar de nuestras redes hechas a mano, de poliéster y personalizadas a la medida.' },
  { slug:'errores-comprar-redes-deportivas', titulo:'Errores frecuentes al comprar redes deportivas y cómo evitarlos', categoria:'Compras', minutos:6, fecha:'2026-10-10', extracto:'Material, medidas, abertura, instalación y garantía: qué comparar para aprovechar mejor tu inversión.' },
  { slug:'como-instalar-red-perimetral', titulo:'Cómo instalar una red perimetral deportiva paso a paso', categoria:'Instalación', minutos:7, fecha:'2026-10-10', extracto:'El orden de montaje de nuestro manual: extender, fijar esquinas, distribuir la malla y subirla a los postes.' },
].map(b=>({ ...b, url:'blog/'+b.slug+'.html', imagen:'assets/img/trabajos/'+PORTADAS_BLOG[b.slug], contenido:'publicado' }));

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
  correo:'contacto@redesdeportivasrc.com',
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
  { archivo:'techo-de-red-cancha-futbol-pasto-sintetico.jpg', alt:'Cancha de fútbol de pasto sintético con red perimetral y techo de red', categoria:'perimetral' },
  { archivo:'porteria-futbol-forrada-roja-red-hexagonal-blanca.jpg', alt:'Portería de fútbol forrada en rojo con red hexagonal blanca tipo colmena', categoria:'porterias' },
  { archivo:'red-voleibol-playa-hexagonal-colores-personalizada.jpg', alt:'Jugadoras rematando sobre una red de voleibol de playa hexagonal de colores', categoria:'voleibol' },
  { archivo:'red-perimetral-negra-cancha-multiusos-basquetbol.jpg', alt:'Red perimetral negra con postes en una cancha multiusos de básquetbol', categoria:'perimetral' },
  { archivo:'red-voleibol-escolar-personalizada-nombre-tejido.jpg', alt:'Red de voleibol escolar personalizada con el nombre de la escuela tejido en la malla', categoria:'voleibol' },
  { archivo:'red-contencion-golf-alta-postes-negros.jpg', alt:'Red de contención para golf de gran altura con postes negros entre palmeras', categoria:'perimetral' },
  { archivo:'porteria-futbol-forrada-azul-pasto-sintetico-jardin.jpg', alt:'Portería de fútbol forrada en azul con red blanca en cancha de pasto sintético de jardín', categoria:'porterias' },
  { archivo:'red-basquetbol-tricolor-trenzada-aro.jpg', alt:'Red de básquetbol trenzada tricolor blanca, roja y azul colocada en el aro', categoria:'basquetbol' },
  { archivo:'red-perimetral-alta-complejo-canchas-futbol.jpg', alt:'Red perimetral alta con postes y reflectores en un complejo de canchas de fútbol', categoria:'perimetral' },
  { archivo:'red-perimetral-negra-cancha-futbol-pasto-sintetico.jpg', alt:'Red perimetral negra alrededor de una cancha de fútbol de pasto sintético', categoria:'perimetral' },
  { archivo:'detalle-red-perimetral-negra-rombo-cancha.jpg', alt:'Detalle de la malla en rombo de una red perimetral negra frente a una cancha', categoria:'perimetral' },
  { archivo:'red-perimetral-alta-sobre-barda-postes-curvos.jpg', alt:'Red perimetral de altura instalada sobre una barda con postes curvos', categoria:'perimetral' },
  { archivo:'red-perimetral-postes-verdes-campo-deportivo.jpg', alt:'Red perimetral con postes verdes para delimitar un campo deportivo', categoria:'perimetral' },
  { archivo:'red-perimetral-negra-gran-altura-vista-desde-abajo.jpg', alt:'Red perimetral negra de gran altura para cancha deportiva vista desde abajo', categoria:'perimetral' },
  { archivo:'porterias-futbol-red-hexagonal-blanca-cancha-techada.jpg', alt:'Porterías de fútbol con red hexagonal blanca tipo colmena en una cancha techada', categoria:'porterias' },
  { archivo:'base-concreto-anclaje-poste-red-contencion-golf.jpg', alt:'Base de concreto y anclajes de un poste para red de contención de golf en el Hotel Chablé', categoria:'instalacion' },
  { archivo:'instalacion-red-antipalomas-domo-deportivo.jpg', alt:'Instalación de una red antipalomas en un domo deportivo', categoria:'instalacion' },
  { archivo:'tejido-artesanal-red-porteria-taller-yucatan.jpg', alt:'Reinier Coral tejiendo a mano la red de una portería pequeña en el taller', categoria:'taller' },
  { archivo:'taller-redes-deportivas-tejido-a-mano-yucatan.jpg', alt:'Taller familiar tejiendo a mano redes deportivas sobre porterías de colores', categoria:'taller' },
  { archivo:'fabricacion-cordon-redes-deportivas-maquina.jpg', alt:'Máquina de fabricación de cordón para redes deportivas con bobinas de hilo blanco', categoria:'taller' },
  { archivo:'ajuste-red-hexagonal-porteria-pequena-alberca.jpg', alt:'Reinier Coral ajustando la red hexagonal de una portería pequeña junto a una alberca', categoria:'porterias' },
  { archivo:'red-voleibol-playa-borde-rojo-instalacion-mar.jpg', alt:'Instalación de una red de voleibol de playa con borde rojo frente al mar', categoria:'voleibol' },
  { archivo:'red-voleibol-playa-postes-rojos-arena.jpg', alt:'Red de voleibol de playa con postes forrados en rojo instalada en la arena', categoria:'voleibol' },
  { archivo:'red-voleibol-blanca-letras-tejidas-cancha-multiusos.jpg', alt:'Red de voleibol blanca con letras tejidas en una cancha multiusos', categoria:'voleibol' },
  { archivo:'red-contencion-golf-hotel-chable-vista-aerea.jpg', alt:'Vista aérea de la red de contención para golf con postes verdes en el Hotel Chablé', categoria:'perimetral' },
  { archivo:'instalacion-red-contencion-golf-hotel-chable.jpg', alt:'Instalación de red de contención para golf con postes verdes en el Hotel Chablé', categoria:'instalacion' },
  { archivo:'poste-verde-red-contencion-golf-hotel-chable.jpg', alt:'Poste verde y red de contención para golf del Hotel Chablé vistos desde el suelo', categoria:'perimetral' },
  { archivo:'instalacion-red-perimetral-postes-verdes-campo-golf.jpg', alt:'Instalación de red perimetral con postes verdes junto a un campo de golf', categoria:'instalacion' },
  { archivo:'red-voleibol-negra-banda-blanca-cancha-concreto.jpg', alt:'Red de voleibol negra con banda blanca en una cancha de concreto al aire libre', categoria:'voleibol' },
  { archivo:'red-voleibol-personalizada-letras-tejidas-roja-verde.jpg', alt:'Red de voleibol personalizada roja con borde verde y letras tejidas', categoria:'voleibol' },
  { archivo:'red-voleibol-hexagonal-roja-amarilla-negra.jpg', alt:'Bloqueo en una red de voleibol hexagonal roja, amarilla y negra', categoria:'voleibol' },
  { archivo:'red-nylon-negra-detalle-malla-rombo.jpg', alt:'Mano detrás de una red de nylon negra que muestra el tamaño de la malla en rombo', categoria:'perimetral' },
  { archivo:'instalacion-red-perimetral-canastilla-elevada-cancha-futbol.jpg', alt:'Instalador colocando red perimetral desde una canastilla elevada en una cancha de fútbol', categoria:'instalacion' },
  { archivo:'instalacion-red-perimetral-escalera-sobre-barda.jpg', alt:'Instalador colocando una red perimetral sobre una barda desde una escalera', categoria:'instalacion' },
  { archivo:'red-perimetral-sobre-barda-blanca-postes.jpg', alt:'Red perimetral sobre barda blanca con postes metálicos tipo escalera', categoria:'perimetral' },
  { archivo:'instalacion-red-en-altura-estructura-metalica.jpg', alt:'Trabajadores instalando una red en altura sobre una estructura metálica', categoria:'instalacion' },
  { archivo:'red-perimetral-negra-abertura-rombo-detalle.jpg', alt:'Detalle de la abertura en rombo de una red perimetral negra frente a una cancha', categoria:'perimetral' },
  { archivo:'cimentacion-postes-red-perimetral-colado-concreto.jpg', alt:'Cuadrilla colando concreto para la cimentación de postes de red perimetral', categoria:'instalacion' },
  { archivo:'techo-de-red-blanca-cable-soporte-poste.jpg', alt:'Techo de red blanca tensado con cables de soporte y poste visto desde abajo', categoria:'perimetral' },
  { archivo:'grua-izado-postes-red-perimetral.jpg', alt:'Camión grúa izando un poste para la instalación de una red perimetral', categoria:'instalacion' },
  { archivo:'postes-instalacion-red-perimetral-obra.jpg', alt:'Postes listos para izarse antes de instalar una red perimetral', categoria:'instalacion' },
  { archivo:'red-negra-malla-pelota-golf-abertura.jpg', alt:'Pelota de golf sobre una red negra para comparar la abertura de la malla', categoria:'perimetral' },
  { archivo:'instalacion-techo-de-red-cancha-futbol-andamio.jpg', alt:'Instalación nocturna de un techo de red sobre cancha de fútbol desde andamio', categoria:'instalacion' },
  { archivo:'red-porteria-hexagonal-nudos-azul-blanco-rojo.jpg', alt:'Detalle de los nudos de una red para portería en azul, blanco y rojo', categoria:'porterias' },
  { archivo:'porteria-futbol-azul-cancha-pasto-sintetico-quinta.jpg', alt:'Portería de fútbol azul con red blanca en cancha de pasto sintético de una quinta', categoria:'porterias' },
  { archivo:'porteria-futbol-marco-negro-red-hexagonal-blanca.jpg', alt:'Portería de fútbol con marco negro y red hexagonal blanca en un jardín', categoria:'porterias' },
  { archivo:'porteria-futbol-azul-red-hexagonal-blanca-pasto-sintetico.jpg', alt:'Portería de fútbol azul con red hexagonal blanca sobre pasto sintético', categoria:'porterias' },
  { archivo:'porteria-futbol-tubo-forrado-azul-parque.jpg', alt:'Jugador pateando hacia una portería de tubo forrado azul con red hexagonal blanca', categoria:'porterias' },
  { archivo:'porteria-futbol-forrada-azul-red-hexagonal-parque.jpg', alt:'Portería de fútbol forrada en azul con red hexagonal blanca en un parque', categoria:'porterias' },
  { archivo:'armado-porteria-futbol-forrada-azul.jpg', alt:'Técnico armando una portería de fútbol con tubos forrados en azul', categoria:'porterias' },
  { archivo:'porteria-futbol-marco-rojo-red-blanca-jardin.jpg', alt:'Portería de fútbol con marco rojo y red blanca en un jardín con palmeras', categoria:'porterias' },
  { archivo:'porteria-futbol-galvanizada-red-hexagonal-blanca.jpg', alt:'Portería de fútbol galvanizada con red hexagonal blanca en un campo de juego', categoria:'porterias' },
  { archivo:'porteria-futbol-blanca-red-hexagonal-entrega.jpg', alt:'Técnico de Grupo RC con una portería blanca de red hexagonal', categoria:'porterias' },
  { archivo:'mini-porteria-futbol-forrada-roja-entrenamiento.jpg', alt:'Mini portería de fútbol forrada en rojo para entrenamiento', categoria:'porterias' },
  { archivo:'mini-porteria-forrada-naranja-red-amarilla-escuela.jpg', alt:'Mini portería forrada en naranja con red amarilla en el patio de una escuela', categoria:'porterias' },
  { archivo:'red-basquetbol-blanca-trenzada-aro.jpg', alt:'Red de básquetbol blanca trenzada colocada en un aro negro', categoria:'basquetbol' },
  { archivo:'red-basquetbol-tricolor-escuela-tablero.jpg', alt:'Red de básquetbol tricolor en el tablero del patio de una escuela', categoria:'basquetbol' },
  { archivo:'redes-basquetbol-trenzadas-colores.jpg', alt:'Redes de básquetbol trenzadas en blanco, azul y verde con etiqueta de Grupo RC', categoria:'basquetbol' },
  { archivo:'balonera-cuerda-trenzada-verde-balon.jpg', alt:'Balonera de cuerda trenzada verde neón con argolla metálica y balón', categoria:'basquetbol' },
  { archivo:'balonera-cuerda-trenzada-azul.jpg', alt:'Balonera de cuerda trenzada azul con argolla metálica', categoria:'basquetbol' },
  { archivo:'red-proteccion-colores-patio-escuela.jpg', alt:'Redes de protección de colores alrededor del patio de una escuela', categoria:'perimetral' },
  { archivo:'red-proteccion-negra-area-juegos.jpg', alt:'Red de protección negra con postes forrados en un área de juegos', categoria:'perimetral' },
  { archivo:'cancha-futbol-rapido-pasto-sintetico-noche.jpg', alt:'Cancha de fútbol rápido de pasto sintético iluminada de noche', categoria:'perimetral' },
  { archivo:'taller-tejido-manual-redes-porterias-colores.jpg', alt:'Personal tejiendo redes deportivas a mano sobre marcos forrados de colores', categoria:'taller' },
];

// ---------------- BANNER PRINCIPAL DEL INICIO ----------------
// Cada diapositiva: foto (o null = fondo de marca), texto corto y botón.
const HERO_SLIDES = [
  { foto:'techo-de-red-cancha-futbol-pasto-sintetico.jpg', alt:'Cancha de fútbol de pasto sintético con red perimetral y techo de red', ojo:'Fabricantes de redes deportivas en Mérida, Yucatán', titulo:'Protege tus espacios deportivos con redes perimetrales fabricadas a la medida.', texto:'Soluciones en redes perimetrales, porterías y equipamiento deportivo para canchas, escuelas, clubes y espacios recreativos.', boton:{ texto:'🎧 Habla con un asesor', url:'tel:+529995538184' } },
  { foto:'red-perimetral-alta-complejo-canchas-futbol.jpg', alt:'Red perimetral alta con postes y reflectores en un complejo de canchas de fútbol', ojo:'Experiencia', titulo:'Más de 25 años en redes.', texto:'Más de 25 años comercializando redes y más de 20 instalándolas. Sabemos qué funciona en cada cancha.', boton:{ texto:'Conócenos', url:'nosotros.html' } },
  { foto:'red-voleibol-playa-hexagonal-colores-personalizada.jpg', alt:'Jugadoras rematando sobre una red de voleibol de playa hexagonal de colores', ojo:'Envíos', titulo:'Enviamos a toda la República.', texto:'Tu cotización ya incluye el envío. Estándar a domicilio de 4 a 8 días hábiles, o urgente por aerolínea en 24 a 48 horas.', boton:{ texto:'Cotizar con envío', url:'contacto.html' } },
  { foto:'instalacion-red-perimetral-canastilla-elevada-cancha-futbol.jpg', alt:'Instalador colocando red perimetral desde una canastilla elevada en una cancha de fútbol', ojo:'Asesoría', titulo:'Te asesoramos en la instalación.', texto:'Te decimos qué abertura, qué altura y qué fijación necesitas. En Yucatán la instalamos nosotros.', boton:{ texto:'Pedir asesoría', url:'contacto.html' } },
  { foto:'porteria-futbol-forrada-roja-red-hexagonal-blanca.jpg', alt:'Portería de fútbol forrada en rojo con red hexagonal blanca tipo colmena', ojo:'Porterías', titulo:'Porterías oficiales, fútbol 7 y micro.', texto:'Fabricación artesanal con red hexagonal tipo colmena, el estilo de las porterías europeas.', boton:{ texto:'Ver porterías', url:'productos/porterias.html' } },
  { foto:'red-perimetral-negra-cancha-multiusos-basquetbol.jpg', alt:'Red perimetral negra con postes en una cancha multiusos de básquetbol', ojo:'Fabricación a la medida', titulo:'Hecha para tu espacio.', texto:'Redes perimetrales en color negro, con abertura de 1", 2", 3" o 4" según el uso.', boton:{ texto:'Cotizar mi red', url:'contacto.html' } },
];

// ---------------- FORTALEZAS (franja bajo el banner) ----------------
const FORTALEZAS = [
  { ico:'trofeo', titulo:'+25 años de experiencia', texto:'Y más de 20 años instalando.' },
  { ico:'camion', titulo:'Envíos a toda la República', texto:'La cotización incluye el envío.' },
  { ico:'herramientas', titulo:'Asesoría en instalación', texto:'Te orientamos en cada paso.' },
  { ico:'escuadra', titulo:'Fabricación a la medida', texto:'Según las necesidades de tu espacio.' },
  { ico:'casco', titulo:'Capacitamos instaladores', texto:'En diferentes partes de México.' },
  { ico:'carrito', titulo:'También en Mercado Libre', texto:'Encuentra algunos productos en nuestra tienda.' },
];

// ---------------- INICIO: productos con foto (maqueta 10 oct 2026) ----------------
// foto: ruta dentro de assets/img/. null = recuadro de marca hasta tener foto real.
const PRODUCTOS_INICIO = [
  { slug:'redes-perimetrales', titulo:'Redes Perimetrales', texto:'Protección y delimitación de espacios.', foto:'trabajos/red-perimetral-negra-cancha-futbol-pasto-sintetico.jpg', alt:'Red perimetral negra alrededor de una cancha de fútbol de pasto sintético' },
  { slug:'porterias', titulo:'Porterías de Fútbol', texto:'Modelos para fútbol 11, fútbol 7 y fútbol rápido.', foto:'trabajos/porteria-futbol-forrada-azul-pasto-sintetico-jardin.jpg', alt:'Portería de fútbol forrada en azul con red blanca en cancha de pasto sintético de jardín' },
  { slug:'redes-para-porterias', titulo:'Redes para Porterías', texto:'Tejido hexagonal tipo colmena.', foto:'trabajos/red-porteria-hexagonal-nudos-azul-blanco-rojo.jpg', alt:'Detalle de los nudos de una red para portería en azul, blanco y rojo' },
  { slug:'redes-deportivas', titulo:'Redes Deportivas', texto:'Básquetbol, voleibol y usos especiales.', foto:'trabajos/red-voleibol-escolar-personalizada-nombre-tejido.jpg', alt:'Red de voleibol escolar personalizada con el nombre de la escuela tejido en la malla' },  { slug:'jaulas-bateo', titulo:'Jaulas de Bateo', texto:'Redes para béisbol y sóftbol a la medida.', foto:null },
];

// ---------------- INICIO: asesoría (cada pregunta lleva a su artículo del blog) ----------------
const ASESORIA = [
  { ico:'escuadra', titulo:'¿Qué medidas necesito?', texto:'Te orientamos según tu espacio.', url:'blog/preparar-instalacion-red-perimetral.html' },
  { ico:'red', titulo:'¿Qué tipo de red o portería?', texto:'Diferencias y recomendaciones.', url:'blog/redes-1-2-3-4-pulgadas.html' },
  { ico:'herramientas', titulo:'¿Cómo se instala?', texto:'Pasos, accesorios y guía básica.', url:'blog/como-instalar-red-perimetral.html' },
  { ico:'precio', titulo:'¿Cuánto puede costar?', texto:'Factores que influyen en el precio.', url:'blog/como-elegir-red-perimetral.html' },
];

// ---------------- INICIO: proyectos realizados (solo trabajos reales, sin inventar clientes) ----------------
const PROYECTOS_INICIO = [
  { foto:'trabajos/red-contencion-golf-hotel-chable-vista-aerea.jpg', alt:'Vista aérea de la red de contención para golf con postes verdes en el Hotel Chablé', etiqueta:'Redes de contención', titulo:'Hotel Chablé', texto:'Redes de contención para el campo de golf.' },
  { foto:'trabajos/techo-de-red-cancha-futbol-pasto-sintetico.jpg', alt:'Cancha de fútbol de pasto sintético con red perimetral y techo de red', etiqueta:'Perímetro y techo de red', titulo:'Cancha de fútbol techada', texto:'Red perimetral y techo de red sobre pasto sintético.' },
  { foto:'trabajos/red-voleibol-escolar-personalizada-nombre-tejido.jpg', alt:'Red de voleibol escolar personalizada con el nombre de la escuela tejido en la malla', etiqueta:'Redes personalizadas', titulo:'Red de voleibol escolar', texto:'Nombre de la escuela tejido en la red.' },
  { foto:'trabajos/red-perimetral-negra-cancha-multiusos-basquetbol.jpg', alt:'Red perimetral negra con postes en una cancha multiusos de básquetbol', etiqueta:'Redes perimetrales', titulo:'Cancha multiusos', texto:'Red perimetral negra para cerrar una cancha multiusos.' },
  { foto:'trabajos/porteria-futbol-forrada-azul-pasto-sintetico-jardin.jpg', alt:'Portería de fútbol forrada en azul con red blanca en cancha de pasto sintético de jardín', etiqueta:'Porterías', titulo:'Portería para jardín', texto:'Portería forrada con red hexagonal en pasto sintético.' },
  { foto:'trabajos/red-voleibol-playa-borde-rojo-instalacion-mar.jpg', alt:'Instalación de una red de voleibol de playa con borde rojo frente al mar', etiqueta:'Voleibol de playa', titulo:'Red de voleibol de playa', texto:'Red de voleibol con borde rojo frente al mar.' },
  { foto:'trabajos/red-perimetral-alta-complejo-canchas-futbol.jpg', alt:'Red perimetral alta con postes y reflectores en un complejo de canchas de fútbol', etiqueta:'Redes de altura', titulo:'Complejo de canchas', texto:'Red perimetral alta alrededor de canchas de fútbol.' },
  { foto:'trabajos/red-basquetbol-tricolor-escuela-tablero.jpg', alt:'Red de básquetbol tricolor en el tablero del patio de una escuela', etiqueta:'Redes de básquetbol', titulo:'Escuela primaria', texto:'Red de básquetbol trenzada tricolor.' },
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
