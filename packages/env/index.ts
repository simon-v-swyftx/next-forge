import { keys as ai } from '@repo/ai/keys';
import { keys as analytics } from '@repo/analytics/keys';
import { keys as auth } from '@repo/auth/keys';
import { keys as cms } from '@repo/cms/keys';
import { keys as collaboration } from '@repo/collaboration/keys';
import { keys as database } from '@repo/database/keys';
import { keys as email } from '@repo/email/keys';
import { keys as flags } from '@repo/feature-flags/keys';
import { keys as observability } from '@repo/observability/keys';
import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { core } from './core';

const server: Parameters<typeof createEnv>[0]['server'] = {
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),

  ARCJET_KEY: z.string().min(1).startsWith('ajkey_').optional(),
  ANALYZE: z.string().optional(),
  SVIX_TOKEN: z
    .union([
      z.string().min(1).startsWith('sk_'),
      z.string().min(1).startsWith('testsk_'),
    ])
    .optional(),

  // Added by Vercel
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
  BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
};

export const env = createEnv({
  extends: [
    core(),
    vercel(),
    auth(),
    ai(),
    analytics(),
    cms(),
    collaboration(),
    database(),
    email(),
    flags(),
    observability(),
  ],
  server,
  runtimeEnv: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ANALYZE: process.env.ANALYZE,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    SVIX_TOKEN: process.env.SVIX_TOKEN,
  },
});
