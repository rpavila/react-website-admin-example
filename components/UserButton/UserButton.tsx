import {UnstyledButton, Group, Avatar, Text, rem, Collapse} from '@mantine/core';
import {IconChevronRight, IconLogout, IconUser} from '@tabler/icons-react';
import classes from './UserButton.module.css';
import {useRef, useState} from "react";
import {User} from "@supabase/gotrue-js";
import Link from "next/link";

export function UserButton({ user }: { user: User }) {
    const formRef = useRef();
    const [opened, setOpened] = useState( false);

    const handleClick = (event: any) => {
        event.preventDefault()
        if(formRef.current) {
            formRef.current.submit()
        }
    }

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.user}>
                <Group>
                    <Avatar
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                        radius="xl"
                    />

                    <div style={{flex: 1}}>
                        {user.user_metadata?.display_name && <Text size="sm" fw={500}>
                            {user.user_metadata?.display_name}
                        </Text>}

                        <Text c="dimmed" size="xs">
                            {user.email}
                        </Text>
                    </div>

                    <IconChevronRight style={{width: rem(14), height: rem(14)}} stroke={1.5}/>
                </Group>
            </UnstyledButton>
            <form ref={formRef} action="/auth/signout" method="post"></form>
            <Collapse in={opened}>
                <Link href="/account" className={classes.link}>
                    <IconUser className={classes.linkIcon} stroke={1.5}/>
                    <span>Profile</span>
                </Link>
                <a href="#" className={classes.link} onClick={handleClick}>
                    <IconLogout className={classes.linkIcon} stroke={1.5}/>
                    <span>Logout</span>
                </a>
            </Collapse>
        </>
    );
}