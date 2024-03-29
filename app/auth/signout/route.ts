import {type NextRequest, NextResponse} from 'next/server'
import {createClient} from '@/lib/utils/supabase/server'

export async function POST(req: NextRequest) {
    const requestUrl: URL = new URL(req.url)
    const supabase = createClient()

    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        await supabase.auth.signOut()
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/`, {
        status: 301,
    })
}