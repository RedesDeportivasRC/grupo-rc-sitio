// Funciones del formulario de la página web (antes /api/* en Vercel). Se movieron a Supabase para dejar
// Vercel (migración a Cloudflare, Reinier 2026-10-22). El código de cada una es el mismo de Vercel:
// aquí solo se adapta la petición/respuesta de Node al servidor de Supabase.
//   POST/GET https://jofotwgbbdysrywgxkwi.supabase.co/functions/v1/sitio-api/<nuevo-lead|resena|solicitar-cotizacion>
// Secretos opcionales: RECAPTCHA_SECRET_KEY, RESEND_API_KEY, CORREO_AVISO_LEADS.
import { Buffer } from "node:buffer";
(globalThis as any).Buffer = Buffer;
(globalThis as any).process = { env: Deno.env.toObject() };
import nuevoLead from "./nuevo-lead.js";
import resena from "./resena.js";
import solicitarCotizacion from "./solicitar-cotizacion.js";

const RUTAS: Record<string, any> = { "nuevo-lead": nuevoLead, "resena": resena, "solicitar-cotizacion": solicitarCotizacion };
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const url = new URL(req.url);
  const handler = RUTAS[url.pathname.split("/").filter(Boolean).pop() ?? ""];
  if (!handler) return new Response(JSON.stringify({ error: "No existe" }), { status: 404, headers: { ...CORS, "Content-Type": "application/json" } });
  const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
  let estado = 200, salida: unknown = null;
  const res = { status(s: number) { estado = s; return res; }, json(o: unknown) { salida = o; return res; }, setHeader() { return res; } };
  await handler({ method: req.method, body, query: Object.fromEntries(url.searchParams), headers: Object.fromEntries(req.headers) }, res);
  return new Response(JSON.stringify(salida), { status: estado, headers: { ...CORS, "Content-Type": "application/json" } });
});
