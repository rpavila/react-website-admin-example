import {BaseQueryApi, createApi} from "@reduxjs/toolkit/query/react";
import {Customer} from "@/lib/redux/model";
import {createClient} from '@/lib/utils/supabase/client';
import {QueryReturnValue} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {MaybePromise} from "@reduxjs/toolkit/dist/query/tsHelpers";


const supabase = createClient()

export const customerApi = createApi({
    reducerPath: 'customers',
    tagTypes: ['Customer'],
    // baseQuery: fetchBaseQuery({
    //     baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`,
    //     // prepareHeaders: (headers, {getState}) => {
    //     //     // By default, if we have a token in the store, let's use that for authenticated requests
    //     //     const {session}: { session: Session | null } = (getState() as ReduxState).auth
    //     //     const {token_type}: {
    //     //         access_token: string | null,
    //     //         token_type: string | null
    //     //     } = session || {access_token: null, token_type: null}
    //     //     const access_token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    //     //     if (access_token) {
    //     //         headers.set('apikey', access_token)
    //     //         headers.set('authentication', `${token_type} ${access_token}`)
    //     //     }
    //     //     return headers
    //     // },
    // }),
    endpoints: (builder) => ({
        getCustomers: builder.query({
            providesTags: (result, error, id) => [{type: 'Customer', id}],
            queryFn: async () => {
                // Supabase conveniently already has `data` and `error` fields
                const {data, error} = await supabase.from('customer').select();
                if (error) {
                    return {error};
                }
                return {data};
            }
        }),
        saveCustomer: builder.mutation<Customer, Partial<Customer> & Pick<Customer, 'id'>>({
            query: ({...params}) => ({
                url: '/customer',
                method: 'POST',
                body: params
            })
        })
    }),
    baseQuery: function (args: any, api: BaseQueryApi, extraOptions: {}): MaybePromise<QueryReturnValue<unknown, unknown, {}>> {
        throw new Error("Function not implemented.");
    }
})

export const {useGetCustomersQuery, useSaveCustomerMutation} = customerApi