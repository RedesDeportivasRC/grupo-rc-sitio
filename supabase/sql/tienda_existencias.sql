-- Tienda en línea: función pública que la página usa para leer las piezas LIBRES de Inventarios.
-- Solo devuelve categoría, cantidad y medidas/color/modelo. NO devuelve costos, notas, órdenes ni clientes.
-- NO APLICADA: espera el sí de Reinier (abre a cualquier visitante la lista de medidas en existencia).
create or replace function public.tienda_existencias()
returns table(categoria text, cantidad int, d jsonb)
language sql stable security definer set search_path = public as $$
  select categoria, cantidad,
         jsonb_strip_nulls(jsonb_build_object(
           'tipo',datos->'tipo','ancho',datos->'ancho','largo',datos->'largo',
           'modelo',datos->'modelo','color',datos->'color',
           'trav',datos->'trav','poste',datos->'poste','psup',datos->'psup','pinf',datos->'pinf','m2',datos->'m2'))
  from inventario_productos
  where retirado_en is null and apartado_en is null and cantidad > 0
    and categoria in ('perimetrales','porterias','voleibol');
$$;
revoke all on function public.tienda_existencias() from public;
grant execute on function public.tienda_existencias() to anon, authenticated;
