/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user: import('better-auth').User | null;
    session: import('better-auth').Session | null;
    staffAccess: import('./lib/staff-access/types.ts').StaffAccessRecord | null;
  }
}

interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  CUSTOMER_RATE_LIMITER?: RateLimit;
}

declare module 'cloudflare:workers' {
  export const env: Env;
}
