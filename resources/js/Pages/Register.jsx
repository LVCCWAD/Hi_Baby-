import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import {
    Anchor,
    Button,
    Container,
    Flex,
    Grid,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    Image,
    Box,
    Stack,
} from "@mantine/core";

import image from "../Assets/Register.png";
import Logo from "../Assets/Logo.png";
import HandleError from "../Components/HandleError.jsx";

function Register() {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordError, setPasswordError] = useState("");

    const submit = (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        setPasswordError("");
        post("/register");
    };

    return (
        <>
            <Head>
                <title>Register - Hi Baby!</title>
            </Head>

            <Box
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f9f6f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <Container size="xl" style={{ width: "100%" }}>
                    <Grid align="center" style={{ minHeight: "80vh" }}>
                        {/* Left side - Form */}
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Box style={{ maxWidth: "450px", margin: "0 auto", padding: "0 20px" }}>
                                <Flex justify="flex-start" mb={30}></Flex>

                                <Paper
                                    shadow="lg"
                                    radius={24}
                                    p={40}
                                    style={{ backgroundColor: "white", border: "1px solid #e9ecef" }}
                                >
                                    <Stack gap={20}>
                                        <Title order={2} style={{
                                            fontSize: "42px", color: "#333", textAlign: "center", marginBottom: "10px",
                                        }}>
                                            Register
                                        </Title>

                                        <form onSubmit={submit}>
                                            <Stack gap={16}>
                                                <Box>
                                                    <Text size="sm" fw={500} mb={5} style={{ color: "#333" }}>
                                                        Username
                                                    </Text>
                                                    <TextInput
                                                        placeholder="Jane_92"
                                                        name="username"
                                                        id="username"
                                                        required
                                                        value={data.username}
                                                        onChange={(e) => setData("username", e.target.value)}
                                                        size="md"
                                                        radius={8}
                                                        styles={{
                                                            input: {
                                                                border: "1px solid #ddd",
                                                                backgroundColor: "#f8f9fa",
                                                                "&:focus": { borderColor: "#abc32f" },
                                                            },
                                                        }}
                                                    />
                                                    {errors.username && <HandleError message={errors.username} />}
                                                </Box>

                                                <Grid gutter={16}>
                                                    <Grid.Col span={6}>
                                                        <Text size="sm" fw={500} mb={5} style={{ color: "#333" }}>
                                                            First Name
                                                        </Text>
                                                        <TextInput
                                                            placeholder="Jane"
                                                            name="first_name"
                                                            id="first_name"
                                                            required
                                                            value={data.first_name}
                                                            onChange={(e) => setData("first_name", e.target.value)}
                                                            size="md"
                                                            radius={8}
                                                            styles={{
                                                                input: {
                                                                    border: "1px solid #ddd",
                                                                    backgroundColor: "#f8f9fa",
                                                                    "&:focus": { borderColor: "#abc32f" },
                                                                },
                                                            }}
                                                        />
                                                        {errors.first_name && <HandleError message={errors.first_name} />}
                                                    </Grid.Col>

                                                    <Grid.Col span={6}>
                                                        <Text size="sm" fw={500} mb={5} style={{ color: "#333" }}>
                                                            Last Name
                                                        </Text>
                                                        <TextInput
                                                            placeholder="Campbell"
                                                            name="last_name"
                                                            id="last_name"
                                                            required
                                                            value={data.last_name}
                                                            onChange={(e) => setData("last_name", e.target.value)}
                                                            size="md"
                                                            radius={8}
                                                            styles={{
                                                                input: {
                                                                    border: "1px solid #ddd",
                                                                    backgroundColor: "#f8f9fa",
                                                                    "&:focus": { borderColor: "#abc32f" },
                                                                },
                                                            }}
                                                        />
                                                        {errors.last_name && <HandleError message={errors.last_name} />}
                                                    </Grid.Col>
                                                </Grid>

                                                <Box>
                                                    <Text size="sm" fw={500} mb={5} style={{ color: "#333" }}>
                                                        Email address
                                                    </Text>
                                                    <TextInput
                                                        placeholder="janecampbell@gmail.com"
                                                        name="email"
                                                        id="email"
                                                        autoComplete="email"
                                                        required
                                                        value={data.email}
                                                        onChange={(e) => setData("email", e.target.value)}
                                                        size="md"
                                                        radius={8}
                                                        styles={{
                                                            input: {
                                                                border: "1px solid #ddd",
                                                                backgroundColor: "#f8f9fa",
                                                                "&:focus": { borderColor: "#abc32f" },
                                                            },
                                                        }}
                                                    />
                                                    {errors.email && <HandleError message={errors.email} />}
                                                </Box>

                                                <Box>
                                                    <Text size="sm" fw={500} mb={5} style={{ color: "#333" }}>
                                                        Password
                                                    </Text>
                                                    <PasswordInput
                                                        placeholder="Password"
                                                        name="password"
                                                        id="password"
                                                        required
                                                        value={data.password}
                                                        onChange={(e) => setData("password", e.target.value)}
                                                        size="md"
                                                        radius={8}
                                                        styles={{
                                                            input: {
                                                                border: "1px solid #ddd",
                                                                backgroundColor: "#f8f9fa",
                                                                "&:focus": { borderColor: "#abc32f" },
                                                            },
                                                        }}
                                                    />
                                                    {errors.password && <HandleError message={errors.password} />}
                                                </Box>

                                                <Box>
                                                    <Text size="sm" fw={500} mb={5} style={{ color: "#333" }}>
                                                        Confirm Password
                                                    </Text>
                                                    <PasswordInput
                                                        placeholder="Confirm password"
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        required
                                                        value={data.confirmPassword}
                                                        onChange={(e) => setData("confirmPassword", e.target.value)}
                                                        size="md"
                                                        radius={8}
                                                        styles={{
                                                            input: {
                                                                border: "1px solid #ddd",
                                                                backgroundColor: "#f8f9fa",
                                                                "&:focus": { borderColor: "#abc32f" },
                                                            },
                                                        }}
                                                    />
                                                    {passwordError && <HandleError message={passwordError} />}
                                                </Box>

                                                {errors.default && <HandleError message={errors.default} />}

                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    size="md"
                                                    radius={10}
                                                    loading={processing}
                                                    style={{
                                                        backgroundColor: "#BAB86C",
                                                        border: "none",
                                                        marginTop: "20px",
                                                        height: "48px",
                                                        fontSize: "16px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Register
                                                </Button>

                                                <Text ta="center" mt={20} size="sm">
                                                    Already have an account?{" "}
                                                    <Anchor href="/login" fw={600} style={{ color: "#abc32f" }}>
                                                        Login
                                                    </Anchor>
                                                </Text>
                                            </Stack>
                                        </form>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Grid.Col>

                        {/* Right side - Image */}
                        <Grid.Col span={{ base: 0, md: 6 }} visibleFrom="md">
                            <Flex justify="center" align="center" h="100%">
                                <Image
                                    src={image}
                                    alt="Register illustration"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                        maxHeight: "600px",
                                    }}
                                    fit="contain"
                                />
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Register;
