import {type NextRequest} from 'next/server'
import {createClient} from '@/lib/utils/supabase/server'
import {redirect} from "next/navigation";

export async function POST(req: NextRequest) {
    const supabase = createClient()

    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        await supabase.auth.signOut()
    }

    return redirect(`/`)
}