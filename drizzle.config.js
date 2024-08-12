import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/scheme/scheme.js',
  out: './src/supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_POSTGRESQL_URL,
  },
});