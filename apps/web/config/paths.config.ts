import { z } from 'zod';

const PathsSchema = z.object({
  auth: z.object({
    signIn: z.string().min(1),
    signUp: z.string().min(1),
    verifyMfa: z.string().min(1),
    callback: z.string().min(1),
    passwordReset: z.string().min(1),
    passwordUpdate: z.string().min(1),
  }),
  app: z.object({
    home: z.string().min(1),
    profileSettings: z.string().min(1),
    batches: z.string().min(1),
    calls: z.string().min(1),
    bots: z.string().min(1),
    contacts: z.string().min(1),
    lists: z.string().min(1),
    properties: z.string().min(1),
  }),
});

const pathsConfig = PathsSchema.parse({
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    verifyMfa: '/auth/verify',
    callback: '/auth/callback',
    passwordReset: '/auth/password-reset',
    passwordUpdate: '/update-password',
  },
  app: {
    home: '/home',
    profileSettings: '/home/settings',
    batches: '/home/batches',
    calls: '/home/calls',
    bots: '/home/bots',
    contacts: '/home/contacts',
    lists: '/home/lists',
    properties: '/home/properties',
  },
} satisfies z.infer<typeof PathsSchema>);

export default pathsConfig;
