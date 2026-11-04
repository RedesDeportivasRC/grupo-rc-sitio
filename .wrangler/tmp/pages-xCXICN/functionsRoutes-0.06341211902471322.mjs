import { onRequestPost as __api_visita_js_onRequestPost } from "/home/user/grupo-rc-sitio/functions/api/visita.js"
import { onRequest as __api_visita_js_onRequest } from "/home/user/grupo-rc-sitio/functions/api/visita.js"
import { onRequest as ___middleware_js_onRequest } from "/home/user/grupo-rc-sitio/functions/_middleware.js"

export const routes = [
    {
      routePath: "/api/visita",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_visita_js_onRequestPost],
    },
  {
      routePath: "/api/visita",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_visita_js_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]