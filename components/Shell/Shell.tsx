'use client'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavbarSimple from "../NavbarSimple/NavbarSimple";
import {User} from "@supabase/gotrue-js";


export function Shell({ user, children }: { user: User, children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false)

    return (<AppShell
        header={{height: 60}}
        navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: {mobile: !opened},
        }}
        padding="lg"
    >
        <AppShell.Header>
            <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
            />
            <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="xs">
            <NavbarSimple user={user}/>
        </AppShell.Navbar>

        <AppShell.Main>
            {children}
        </AppShell.Main>
    </AppShell>)
}