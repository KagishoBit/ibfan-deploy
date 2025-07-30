import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { supabase } from '@/app/lib/supabase'; // Using the public client for login check

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) return null;
          if (data.user) return data.user;
        }
        
        return null;
      },
    }),
  ],
});