begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated;

create table public.clients (
  code_number bigint generated always as identity primary key,
  id text generated always as ('C-' || code_number::text) stored unique,
  nombre text not null check (length(btrim(nombre)) > 0),
  contenido text not null,
  whatsapp text not null default '',
  fuentes integer not null check (fuentes > 0),
  fuentes_listas integer not null default 0 check (fuentes_listas between 0 and fuentes),
  estado text not null default 'espera' check (estado in ('espera', 'listo', 'entregado')),
  total numeric(12, 2) not null check (total >= 0),
  adelanto numeric(12, 2) not null check (adelanto between 0 and total),
  debe numeric(12, 2) generated always as (total - adelanto) stored,
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;
revoke all on public.clients from public, anon, authenticated;
grant select, delete on public.clients to authenticated;
grant insert (nombre, contenido, whatsapp, fuentes, total, adelanto)
  on public.clients to authenticated;
grant update (nombre, contenido, whatsapp, fuentes, fuentes_listas, estado, total, adelanto)
  on public.clients to authenticated;

create policy blacknavidad_admin_clients on public.clients
  for all to authenticated
  using ((select auth.jwt() -> 'app_metadata' -> 'blacknavidad_admin') = 'true'::jsonb)
  with check ((select auth.jwt() -> 'app_metadata' -> 'blacknavidad_admin') = 'true'::jsonb);

-- This schema must not be included in the Data API's exposed schemas.
create function private.blacknavidad_public_status(p_code text)
returns table (id text, estado text, fuentes integer, fuentes_listas integer)
language sql
stable
security definer
set search_path = ''
as $$
  select c.id, c.estado, c.fuentes, c.fuentes_listas
  from public.clients as c
  where p_code ~ '^C-[0-9]{1,19}$' and c.id = p_code;
$$;

revoke all on function private.blacknavidad_public_status(text) from public;
grant execute on function private.blacknavidad_public_status(text) to anon, authenticated;

create function public.lookup_order_status(p_code text)
returns table (id text, estado text, fuentes integer, fuentes_listas integer)
language sql
stable
security invoker
set search_path = ''
as $$
  select * from private.blacknavidad_public_status(p_code);
$$;

revoke all on function public.lookup_order_status(text) from public;
grant execute on function public.lookup_order_status(text) to anon, authenticated;

alter publication supabase_realtime add table public.clients;

commit;
