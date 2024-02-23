'use client'

import {useGetCustomersQuery, useSaveCustomerMutation} from "@/lib/redux/api/customerApi";
import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Group,
    LoadingOverlay,
    Progress,
    ScrollArea,
    Table,
    Text, Title
} from "@mantine/core";
import {useState} from "react";
import {Customer} from "@/lib/redux/model";
import {faker} from '@faker-js/faker';
import cx from 'clsx';
import classes from './List.module.css';

export default function CustomerList() {
    const [scrolled, setScrolled] = useState(false);
    const {data, error = undefined, isLoading = false, refetch, isFetching = false} = useGetCustomersQuery({}, {
        pollingInterval: 0,
        refetchOnMountOrArgChange: true,
        skip: false,
    })
    const [updateCustomer] = useSaveCustomerMutation()

    const rows = data?.map(({id, first_name, last_name, email_address, phone}: Customer) => (
        <Table.Tr key={id}>
            <Table.Td>{first_name}</Table.Td>
            <Table.Td>{last_name}</Table.Td>
            <Table.Td>{email_address}</Table.Td>
            <Table.Td>{phone}</Table.Td>
        </Table.Tr>
    ));

    const saveMany = () => {
        const a = Array.from({length: 50}, (_, i) => ({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email_address: faker.internet.email(),
            phone: faker.phone.number()
        }))
        console.log(a)
        // a.forEach(item => {
        //     updateCustomer(item)
        // })
    }

    return (
        <>
            <Group justify="space-between" mb={'sm'}>
                <Title order={3}>Customers</Title>
                <Button variant={'light'} disabled={isLoading || isFetching} onClick={() => refetch()}>Refresh</Button>
            </Group>

            <Box pos="relative">
                <LoadingOverlay visible={isLoading || isFetching} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

                <Card withBorder padding="sm" radius="md">
                    <ScrollArea h={300} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                        <Table>
                            <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                                <Table.Tr>
                                    <Table.Th>First name</Table.Th>
                                    <Table.Th>Last name</Table.Th>
                                    <Table.Th>Email address</Table.Th>
                                    <Table.Th>Phone</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Card>
            </Box>
        </>
    )
}