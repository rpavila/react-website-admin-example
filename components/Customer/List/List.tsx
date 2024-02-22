'use client'

import {useGetCustomersQuery} from "@/lib/redux/api/customerApi";

export default function CustomerList() {
    const { data, error, isLoading } = useGetCustomersQuery()
    console.log(data)
    console.log(error)
    console.log(isLoading)

    return (
        <>
            <h2>Customers</h2>
        </>
    )
}