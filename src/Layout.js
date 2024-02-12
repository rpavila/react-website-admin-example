import { AppShell, Burger } from '@mantine/core';
import {Outlet} from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import {NavbarSimple} from "./components/navbar-simple/NavbarSimple";


export default function Layout() {
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
        </AppShell.Navbar>

        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
    </AppShell>
    );
}