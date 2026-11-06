# BlackNavidad

Panel de pedidos y consulta pública de horneados con React, Vite y Supabase.
La base arranca vacía: no se importan usuarios ni pedidos de Firebase.

## Configurar Supabase

1. Abre **BlackNavidad** (referencia `vqdtilscrhrcqrwjlitz`), no Viper Shop.
2. En **SQL Editor**, ejecuta [la migración inicial](supabase/migrations/20261105000000_blacknavidad.sql) una vez.
   Mantén activa la Data API. No incluyas `private` en los esquemas expuestos.
3. En **Authentication → Users → Add user**, crea y confirma tu usuario administrador.
   Desactiva el registro público en los ajustes de Auth.
4. Ejecuta este SQL con el correo de tu nuevo usuario. Debe devolver un correo:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
     || '{"blacknavidad_admin": true}'::jsonb
   where email = 'tu-correo@example.com'
   returning email;
   ```

   Si ya habías iniciado sesión, ciérrala y vuelve a entrar.
5. En **Project Settings → API Keys**, usa la clave **Publishable**.
   No uses `sb_secret_...` ni `service_role` en variables `VITE_`.

## Local y Vercel

Configura estas dos variables en `.env.local` y en **Environment Variables**
del proyecto **blacknavidad** de Vercel antes de desplegar:

```dotenv
VITE_SUPABASE_URL=https://vqdtilscrhrcqrwjlitz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

En local, ejecuta `npm ci` y `npm run dev`.

## Verificación

- Registra un pedido de prueba, guarda el progreso y márcalo como entregado.
- En una ventana sin sesión, consulta su código. Solo debe mostrar estado y progreso.
- [access.sql](supabase/tests/access.sql) valida los permisos en una base local desechable.
- Verifica el despliegue nuevo antes de eliminar el anterior en Vercel.
