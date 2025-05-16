import { useEffect } from "react";
import { Modal, TextInput, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

function AddressModal({ opened, onClose, onSubmit, initialValues = null }) {
    const form = useForm({
        initialValues: initialValues || {
            street: "",
            barangay: "",
            city: "",
            province: "",
            country: "",
            zip_code: "",
        },
        validate: {
            street: (value) =>
                value.length < 3 ? "Street must be at least 3 characters" : null,
            barangay: (value) =>
                value.length < 2 ? "Barangay must be at least 2 characters" : null,
            city: (value) => (value.length < 2 ? "City is required" : null),
            province: (value) => (value.length < 2 ? "Province is required" : null),
            country: (value) => (value.length < 2 ? "Country is required" : null),
            zip_code: (value) =>
                value.length < 4 ? "Valid ZIP code is required" : null,
        },
    });

    useEffect(() => {
        if (initialValues) {
            form.setValues(initialValues);
        } else {
            form.reset();
        }
    }, [initialValues]);

    const handleSubmit = async (values) => {
    try {
        const success = await onSubmit(values); // assumes onSubmit returns true/false
        if (success) {
            form.reset();
            onClose();
        } else {
            // Optionally handle failure without notification
            console.warn("Address submission failed.");
        }
    } catch (error) {
        console.error("Address submit error:", error);
    }
};


    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={initialValues ? "Edit Address" : "Add New Address"}
            size="md"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack spacing="md">
                    <TextInput
                        required
                        label="Street"
                        placeholder="Enter street address"
                        {...form.getInputProps("street")}
                    />
                    <TextInput
                        required
                        label="Barangay"
                        placeholder="Enter barangay"
                        {...form.getInputProps("barangay")}
                    />
                    <TextInput
                        required
                        label="City"
                        placeholder="Enter city"
                        {...form.getInputProps("city")}
                    />
                    <TextInput
                        required
                        label="Province"
                        placeholder="Enter province"
                        {...form.getInputProps("province")}
                    />
                    <TextInput
                        required
                        label="Country"
                        placeholder="Enter country"
                        {...form.getInputProps("country")}
                    />
                    <TextInput
                        required
                        label="ZIP Code"
                        placeholder="Enter ZIP code"
                        {...form.getInputProps("zip_code")}
                    />
                    <Button type="submit" fullWidth>
                        {initialValues ? "Update Address" : "Add Address"}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}

export default AddressModal;
