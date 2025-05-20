import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import {
    TextInput,
    Button,
    Stack,
    Container,
    Title,
    Group,
} from "@mantine/core";

function ProfileEdit() {
    const { user } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        role: user.role || "",
        address_id: user.address_id || "",
        picture: user.picture || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/profile/update");
    };

    return (
        <Container size="sm">
            <Title order={2} mb="md">Edit Profile</Title>
            <form onSubmit={handleSubmit}>
                <Stack spacing="sm">
                    <TextInput
                        label="Username"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        error={errors.username}
                        required
                    />
                    <TextInput
                        label="First Name"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        error={errors.first_name}
                        required
                    />
                    <TextInput
                        label="Last Name"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        error={errors.last_name}
                        required
                    />
                    <TextInput
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        required
                    />
                    <TextInput
                        label="Phone Number"
                        value={data.phone_number}
                        onChange={(e) => setData("phone_number", e.target.value)}
                        error={errors.phone_number}
                    />
                    <TextInput
                        label="Role"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        error={errors.role}
                        required
                    />
                    <TextInput
                        label="Address ID"
                        value={data.address_id}
                        onChange={(e) => setData("address_id", e.target.value)}
                        error={errors.address_id}
                    />
                    <TextInput
                        label="Picture URL"
                        value={data.picture}
                        onChange={(e) => setData("picture", e.target.value)}
                        error={errors.picture}
                    />
                    <TextInput
                        label="New Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                    />
                    <TextInput
                        label="Confirm Password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.password_confirmation}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit" loading={processing}>
                            Save Changes
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Container>
    );
}

export default ProfileEdit;
