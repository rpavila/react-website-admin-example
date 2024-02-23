import {ContextModalProps} from "@mantine/modals";
import {Button} from "@mantine/core";
import CustomerForm from "@/components/Customer/Form/Form";
import {useSaveCustomerMutation} from "@/lib/redux/api/customerApi";


export const CustomerModal = ({
                                  context,
                                  id,
                              }: ContextModalProps<{ children: React.ReactNode }>) => {

    const [updateCustomer] = useSaveCustomerMutation()

    return (
        <>
            <CustomerForm />
            <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
                Close modal
            </Button>
        </>
    )
};