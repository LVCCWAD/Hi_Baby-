import { useEffect } from "react";
import { Modal, TextInput, Button, Stack, Title, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";

function AddressModal({ opened, onClose, onSubmit, initialValues = null }) {
    const primaryColor = "#BAB86C";

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
            street: (value) => value.length < 3 ? "Street must be at least 3 characters" : null,
            barangay: (value) => value.length < 2 ? "Barangay must be at least 2 characters" : null,
            city: (value) => value.length < 2 ? "City is required" : null,
            province: (value) => value.length < 2 ? "Province is required" : null,
            country: (value) => value.length < 2 ? "Country is required" : null,
            zip_code: (value) => value.length < 4 ? "Valid ZIP code is required" : null,
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
            const success = await onSubmit(values);
            if (success) {
                form.reset();
                onClose();
            }
        } catch (error) {
            console.error("Address submit error:", error);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="md"
            centered
            radius="lg"
            overlayProps={{
                blur: 3,
                opacity: 0.3,
            }}
            withCloseButton={false}
        >
            <Title order={3} align="center" mb="sm" style={{ color: primaryColor }}>
                {initialValues ? "Edit Address" : "Add New Address"}
            </Title>

            <Divider my="sm" />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack spacing="md">
                    <TextInput
                        required
                        label="Street"
                        placeholder="Enter street address"
                        radius="lg"
                        {...form.getInputProps("street")}
                    />
                    <TextInput
                        required
                        label="Barangay"
                        placeholder="Enter barangay"
                        radius="lg"
                        {...form.getInputProps("barangay")}
                    />
                    <TextInput
                        required
                        label="City"
                        placeholder="Enter city"
                        radius="lg"
                        {...form.getInputProps("city")}
                    />
                    <TextInput
                        required
                        label="Province"
                        placeholder="Enter province"
                        radius="lg"
                        {...form.getInputProps("province")}
                    />
                    <TextInput
                        required
                        label="Country"
                        placeholder="Enter country"
                        radius="lg"
                        {...form.getInputProps("country")}
                    />
                    <TextInput
                        required
                        label="ZIP Code"
                        placeholder="Enter ZIP code"
                        radius="lg"
                        {...form.getInputProps("zip_code")}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        size="md"
                        radius="lg"
                        style={{
                            backgroundColor: primaryColor,
                            color: "black",
                        }}
                    >
                        {initialValues ? "Update Address" : "Add Address"}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}

export default AddressModal;
