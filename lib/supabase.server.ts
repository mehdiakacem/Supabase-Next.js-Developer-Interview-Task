import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from "./env.server";



export function createSupabaseForServerComponent() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    }
  );

  return supabase;
}



export function createSupabaseForRouteHandler() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    }
  );

  return supabase;
}



export function createSupabaseForServerAction() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    }
  );

  return supabase;
}

export function createClient() {
	const cookieStore = cookies()
  
	return createServerClient(
	  process.env.NEXT_PUBLIC_SUPABASE_URL!,
	  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	  {
		cookies: {
		  get(name: string) {
			return cookieStore.get(name)?.value
		  },
		  set(name: string, value: string, options: CookieOptions) {
			try {
			  cookieStore.set({ name, value, ...options })
			} catch (error) {
			  // The `set` method was called from a Server Component.
			  // This can be ignored if you have middleware refreshing
			  // user sessions.
			}
		  },
		  remove(name: string, options: CookieOptions) {
			try {
			  cookieStore.set({ name, value: '', ...options })
			} catch (error) {
			  // The `delete` method was called from a Server Component.
			  // This can be ignored if you have middleware refreshing
			  // user sessions.
			}
		  },
		},
	  }
	)
  }
