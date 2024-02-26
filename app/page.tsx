import HomePage from "@/components/HomePage/HomePage";
import {createClient} from "@/lib/utils/supabase/server";
import {redirect} from "next/navigation";


export default async function Page(){

    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return (<HomePage />)
}
