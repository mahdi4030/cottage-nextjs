import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/db'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // const supabase = createMiddlewareClient<Database>({ req, res })
  // console.log("asdf", await supabase.auth.getSession());
  return res
}