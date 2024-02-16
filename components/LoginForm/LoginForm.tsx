'use client'
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useDisclosure} from "@mantine/hooks";
import {z} from "zod";
import {useForm} from "@mantine/form";
import {zodResolver} from "mantine-form-zod-resolver";
import {cleanNotifications, notifications} from "@mantine/notifications";
import {NotificationData} from "@mantine/notifications/lib/notifications.store";
import {Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title} from "@mantine/core";
import classes from "@/components/LoginForm/LoginForm.module.css";


export default function LoginForm() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, {toggle, close}] = useDisclosure(false)
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

    const onSubmit = (values: any) => {
        cleanNotifications()
        toggle()
        supabase.auth.signInWithPassword(values).then((r) => {
            let messageData: NotificationData = {
                autoClose: true,
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
                    title: 'LoginForm successfully', message: 'User logged'
                }
            }
            notifications.show(messageData)
            if(!error){
                cleanNotifications()
                router.push('/dashboard')
            }
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

                <Paper withBorder shadow="lg" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <TextInput label="Email" placeholder="you@mantine.dev" {...form.getInputProps('email')}
                                   onChange={(e) => {
                                       form.setValues({email: e.currentTarget.value})
                                   }}/>
                        <PasswordInput label="Password" placeholder="Your password"
                                       mt="md" {...form.getInputProps('password')} onChange={(e) => {
                            form.setValues({password: e.currentTarget.value})
                        }}/>
                        <Group justify="space-between" mt="lg">
                            <Checkbox label="Remember me"/>
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button type={'submit'} fullWidth mt="xl" loading={loading}>
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}