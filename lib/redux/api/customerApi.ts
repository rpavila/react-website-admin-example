import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ReduxState} from "@/lib/redux";
import {Session} from "@supabase/gotrue-js";

export const customerApi = createApi({
    reducerPath: 'customers',
    tagTypes: ['Customer'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`,
        prepareHeaders: (headers, {getState}) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const {session}: { session: Session | null } = (getState() as ReduxState).auth
            const {token_type}: {
                access_token: string | null,
                token_type: string | null
            } = session || {access_token: null, token_type: null}
            const access_token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            if (access_token) {
                headers.set('apikey', access_token)
                headers.set('authentication', `${token_type} ${access_token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => '/customer',
            providesTags: (result, error, id) => [{ type: 'Customer', id }]
        })
    })
})

export const {useGetCustomersQuery} = customerApi