import React from "react";
import { useForm } from "@inertiajs/react";
import {
    Anchor,
    Button,
    Checkbox,
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
import image from "../Assets/Login.png";
import Logo from "../Assets/Logo.png";
import HandleError from "../Components/HandleError.jsx";

function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
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
                        <Box
                            style={{
                                maxWidth: "450px",
                                margin: "0 auto",
                                padding: "0 20px",
                            }}
                        >
                            {/* Logo */}
                            <Flex justify="flex-start" mb={30}>
                                {/* <Image
                                    src={Logo}
                                    alt="Hi, Baby!"
                                    h={50}
                                    fit="contain"
                                /> */}
                            </Flex>

                            <Paper
                                shadow="lg"
                                radius={24}
                                p={40}
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid #e9ecef",
                                }}
                            >
                                <Stack gap={20}>
                                    <Title
                                        order={2}
                                        style={{
                                            fontSize: "42px",
                                            // fontFamily: "WendyOne",
                                            color: "#333",
                                            textAlign: "center",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Login
                                    </Title>

                                    <form onSubmit={submit}>
                                        <Stack gap={16}>
                                            <Box>
                                                <Text
                                                    size="sm"
                                                    fw={500}
                                                    mb={5}
                                                    style={{ color: "#333" }}
                                                >
                                                    Email address
                                                </Text>
                                                <TextInput
                                                    placeholder="Your email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="email"
                                                    required
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData("email", e.target.value)
                                                    }
                                                    size="md"
                                                    radius={8}
                                                    styles={{
                                                        input: {
                                                            border: "1px solid #ddd",
                                                            backgroundColor: "#f8f9fa",
                                                            "&:focus": {
                                                                borderColor: "#abc32f",
                                                            },
                                                        },
                                                    }}
                                                />
                                                {errors.email && (
                                                    <HandleError message={errors.email} />
                                                )}
                                            </Box>

                                            <Box>
                                                <Text
                                                    size="sm"
                                                    fw={500}
                                                    mb={5}
                                                    style={{ color: "#333" }}
                                                >
                                                    Password
                                                </Text>
                                                <PasswordInput
                                                    placeholder="Password"
                                                    name="password"
                                                    id="password"
                                                    required
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData("password", e.target.value)
                                                    }
                                                    size="md"
                                                    radius={8}
                                                    styles={{
                                                        input: {
                                                            border: "1px solid #ddd",
                                                            backgroundColor: "#f8f9fa",
                                                            "&:focus": {
                                                                borderColor: "#abc32f",
                                                            },
                                                        },
                                                    }}
                                                />
                                                {errors.password && (
                                                    <HandleError message={errors.password} />
                                                )}
                                            </Box>

                                            <Flex justify="space-between" align="center" mt={10}>
                                                <Checkbox
                                                    label="Remember me"
                                                    size="sm"
                                                    checked={data.remember}
                                                    onChange={(event) =>
                                                        setData("remember", event.currentTarget.checked)
                                                    }
                                                    styles={{
                                                        input: {
                                                            "&:checked": {
                                                                backgroundColor: "#abc32f",
                                                                borderColor: "#abc32f",
                                                            },
                                                        },
                                                    }}
                                                />
                                                <Anchor
                                                    href="/forgot-password"
                                                    size="sm"
                                                    style={{ color: "#abc32f" }}
                                                >
                                                    Forgot Password?
                                                </Anchor>
                                            </Flex>

                                            {errors.default && (
                                                <HandleError message={errors.default} />
                                            )}

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
                                                Login
                                            </Button>

                                            <Text ta="center" mt={20} size="sm">
                                                Don&apos;t have an account?{" "}
                                                <Anchor
                                                    href="/register"
                                                    fw={600}
                                                    style={{ color: "#abc32f" }}
                                                >
                                                    Register
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
                                alt="Login illustration"
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
    );
}

export default Login;
