import {type NextRequest, NextResponse} from 'next/server'
import {createClient} from '@/lib/utils/supabase/server'
import {redirect} from "next/navigation";

export async function POST(req: NextRequest) {
    const requestUrl = new URL(req.url)
    const supabase = createClient()

    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        await supabase.auth.signOut()
    }

    return redirect(`/auth/login`)
}