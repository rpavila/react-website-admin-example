'use client'
import {useCallback, useEffect, useState} from 'react'
import {Database} from '@/lib/database.types'
import {User, createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {UserMetadata} from "@supabase/gotrue-js/src/lib/types";
import {Button, Grid, TextInput, Title} from "@mantine/core";

export default function AccountForm({user}: { user: User | null }) {
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const {user_metadata}: { user_metadata: UserMetadata|null } = user || { user_metadata: null }
            if (user_metadata) {
                setFullname(user_metadata.full_name)
                setUsername(user_metadata.username)
                setWebsite(user_metadata.website)
                setAvatarUrl(user_metadata.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
                                     username,
                                     website,
                                     avatar_url,
                                 }: {
        username: string | null
        fullname: string | null
        website: string | null
        avatar_url: string | null
    }) {
        try {
            setLoading(true)

            const {error} = await supabase.auth.updateUser({
                user_metadata: {
                    full_name: fullname,
                    username,
                    website,
                    avatar_url,
                    updated_at: new Date().toISOString(),
                }
            } as any)
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Title order={2}>Profile</Title>
            <Grid>
                <Grid.Col span={4}>
                    <div className="form-widget">
                        <TextInput mt="sm"
                                   label="Email" value={user?.email} disabled/>
                        <TextInput mt="sm"
                                   label="Full Name" value={fullname || ''}
                                   onChange={(e) => setFullname(e.target.value)}/>
                        <TextInput mt="sm"
                                   label="Username" value={username || ''}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        <TextInput mt="sm" type={'url'}
                                   label="Website" value={website || ''}
                                   onChange={(e) => setWebsite(e.target.value)}/>

                        <Button variant="filled"
                                onClick={() => updateProfile({fullname, username, website, avatar_url})}
                                disabled={loading} mt="sm">
                            {loading ? 'Loading ...' : 'Update'}
                        </Button>
                    </div>
                </Grid.Col>
            </Grid>
        </>
    )
}