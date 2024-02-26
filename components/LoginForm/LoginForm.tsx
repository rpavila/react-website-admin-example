'use client'
import {useSearchParams} from "next/navigation";
import {useDisclosure} from "@mantine/hooks";
import {z} from "zod";
import {useForm} from "@mantine/form";
import {zodResolver} from "mantine-form-zod-resolver";
import {notifications} from "@mantine/notifications";
import {Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title} from "@mantine/core";
import classes from "@/components/LoginForm/LoginForm.module.css";
import {login} from "@/app/auth/login/actions";
import {useEffect} from "react";


export default function LoginForm() {
    const searchParams = useSearchParams()
    const [loading, {toggle}] = useDisclosure(false)
    const schema = z.object({
        email: z.string({required_error: 'This field is required'}).email({message: 'Invalid email'}),
        password: z.string({required_error: 'This field is required'}),
    });
    const form = useForm({
        initialValues: {
            email: 'user-test01@mailinator.com',
            password: 'admin123/*+',
        },
        validate: zodResolver(schema),
    });

    useEffect(() => {
        if (searchParams.size > 0) {
            const error = searchParams.get('error')
            console.log(error)
            if (error) {
                notifications.show({
                    autoClose: true,
                    style: {
                        position: 'fixed',
                        top: '1rem',
                        right: '1rem'
                    },
                    title: 'error',
                    message: error,
                    color: 'red'
                })
            }
        }
    }, [searchParams]);

    return (
        <>
            <Container size={420} my={40}>

                <Title ta="center" className={classes.title}>
                    Welcome back!
                </Title>
                {/*<Text c="dimmed" size="sm" ta="center" mt={5}>*/}
                {/*    Do not have an account yet?{' '}*/}
                {/*    <Anchor size="sm" component="button">*/}
                {/*        Create account*/}
                {/*    </Anchor>*/}
                {/*</Text>*/}

                <Paper withBorder shadow="lg" p={30} mt={30} radius="md">
                    <form>
                        <TextInput label="Email" name={'email'}
                                   placeholder="you@mantine.dev" {...form.getInputProps('email')}
                                   onChange={(e) => {
                                       form.setValues({email: e.currentTarget.value})
                                   }}/>
                        <PasswordInput label="Password" name={'password'} placeholder="Your password"
                                       mt="md" {...form.getInputProps('password')} onChange={(e) => {
                            form.setValues({password: e.currentTarget.value})
                        }}/>
                        <Group justify="space-between" mt="lg">
                            <Checkbox label="Remember me"/>
                            {/*<Anchor component="button" size="sm">*/}
                            {/*    Forgot password?*/}
                            {/*</Anchor>*/}
                        </Group>
                        <Button type={'submit'} fullWidth mt="xl" loading={loading} formAction={login}>
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}