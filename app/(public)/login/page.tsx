'use client'
import {Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title} from '@mantine/core';
import classes from './Login.module.css';
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useState} from "react";
import {Database} from "../../database.types";
import type {SignInWithPasswordCredentials} from "@supabase/gotrue-js/src/lib/types";
import {useDisclosure} from "@mantine/hooks";
import {cleanNotifications, notifications} from '@mantine/notifications';
import {NotificationData} from "@mantine/notifications/lib/notifications.store";

export default function Login() {
    const supabase = createClientComponentClient<Database>()
    const [loading, {toggle, close}] = useDisclosure()
    const [credentials, setCredentials] = useState<SignInWithPasswordCredentials>({})

    const onLogin = () => {
        cleanNotifications()
        toggle()
        supabase.auth.signInWithPassword(credentials).then((r) => {
            close()
            let messageData: NotificationData = {
                autoClose: false,
                message: '',
                color: 'green',
                style: {
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem'
                }
            }
            const {data, error} = r
            if (error) {
                const {name: title, message} = error
                messageData = {
                    ...messageData,
                    title, message, color: 'red'
                }
            } else {
                messageData = {
                    ...messageData,
                    title: 'Login successfully', message: 'User logged'
                }
            }
            notifications.show(messageData)
        })
    }

    return (
        <>
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    Welcome back!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor size="sm" component="button">
                        Create account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Email" placeholder="you@mantine.dev" required onChange={(e) => {
                        setCredentials({...credentials, email: e.currentTarget.value})
                    }}/>
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e) => {
                        setCredentials({...credentials, password: e.currentTarget.value})
                    }}/>
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me"/>
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" loading={loading} onClick={() => {
                        onLogin()
                    }}>
                        Sign in
                    </Button>
                </Paper>
            </Container>
        </>
    );
}