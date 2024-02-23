import {TextInput} from "@mantine/core";
import {IconAt} from '@tabler/icons-react';

export default function CustomerForm() {
    const icon = <IconAt size={16}/>;
    return (
        <>
            <TextInput
                leftSectionPointerEvents="none"
                leftSection={icon}
                label="Your email"
                placeholder="Your email"
            />
            <TextInput
                mt="md"
                rightSectionPointerEvents="none"
                rightSection={icon}
                label="Your email"
                placeholder="Your email"
            />
        </>
    )
}