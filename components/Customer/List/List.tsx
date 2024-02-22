'use client'

import {useGetCustomersQuery} from "@/lib/redux/api/customerApi";
import {Box, Button, LoadingOverlay, Table} from "@mantine/core";

export default function CustomerList() {
    const { data, error, isLoading, refetch, isFetching } = useGetCustomersQuery({}, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
        selectFromResult: ({ data }) => ({
            posts: data ?? [],
        }),
    })
    console.log(data)
    console.log(error)
    console.log(isLoading)

    // const elements = [
    //     { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    //     { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    //     { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    //     { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    //     { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    // ];

    const rows = data.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <h2>Customers</h2>

            <Box pos="relative">
                <LoadingOverlay visible={isLoading || isFetching} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

                <Button onClick={() => refetch()}>Refresh</Button>

                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Element position</Table.Th>
                            <Table.Th>Element name</Table.Th>
                            <Table.Th>Symbol</Table.Th>
                            <Table.Th>Atomic mass</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Box>
        </>
    )
}