import { AppShell, Burger } from '@mantine/core';
import {Outlet} from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import {NavbarSimple} from "../navbar-simple/NavbarSimple";

export function DashboardLayout() {
    const [opened, { toggle }] = useDisclosure();

    return (
    <AppShell
        header={{ height: 60 }}
        navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
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

        <AppShell.Navbar p="lg">
            <NavbarSimple />
        </AppShell.Navbar>k

        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
    </AppShell>
    );
}

export function DashboardIndex() {
    return (
        <div>
            <h2>Dashboard Index</h2>
        </div>
    );
}