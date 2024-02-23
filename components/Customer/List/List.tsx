'use client'

import {useGetCustomersQuery, useSaveCustomerMutation} from "@/lib/redux/api/customerApi";
import {Box, Button, Card, Group, LoadingOverlay, ScrollArea, Table, Title} from "@mantine/core";
import {useState} from "react";
import {Customer} from "@/lib/redux/model";
import cx from 'clsx';
import classes from './List.module.css';
import {IconPlus, IconRefresh} from "@tabler/icons-react";
import {modals, ModalsProvider} from "@mantine/modals";
import {CustomerModal} from "@/components/Customer/Modal/Modal";


export default function CustomerList() {
    const [scrolled, setScrolled] = useState(false);
    const {data, error = undefined, isLoading = false, refetch, isFetching = false} = useGetCustomersQuery({}, {
        pollingInterval: 0,
        refetchOnMountOrArgChange: true,
        skip: false,
    })

    const rows = data?.map(({id, first_name, last_name, email_address, phone}: Customer) => (
        <Table.Tr key={id}>
            <Table.Td>{first_name}</Table.Td>
            <Table.Td>{last_name}</Table.Td>
            <Table.Td>{email_address}</Table.Td>
            <Table.Td>{phone}</Table.Td>
        </Table.Tr>
    ));

    const openModal = () => {
        modals.openContextModal({
            modal: 'customerModal',
            title: 'Edit a customer',
            innerProps: {},
        })
    }

    return (
        <>
            <Group justify="space-between" mb={'sm'}>
                <Title order={3}>Customers</Title>
                <Group justify={'flex-end'} gap={'xs'}>
                    <Button variant={'light'} leftSection={<IconPlus size={14}/>}
                            disabled={isLoading || isFetching} onClick={() => openModal()}>Add</Button>
                    <Button variant={'outline'} leftSection={<IconRefresh size={14}/>}
                            disabled={isLoading || isFetching} onClick={() => refetch()}>Refresh</Button>
                </Group>
            </Group>

            <Box pos="relative">
                <LoadingOverlay visible={isLoading || isFetching} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

                <Card withBorder padding="sm" radius="md">
                    <ScrollArea h={300} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                        <Table>
                            <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
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

            <ModalsProvider modals={{customerModal: CustomerModal /* ...other modals */}}>
                <></>
            </ModalsProvider>
        </>
    )
}