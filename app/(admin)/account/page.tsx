import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {Database} from '@/lib/database.types'
import AccountForm from '@/components/AccountForm/AccountForm'

export default async function Account() {
    const supabase = createServerComponentClient<Database>({cookies})

    const {
        data: {user},
    } = await supabase.auth.getUser()

    return <AccountForm user={user}/>
}