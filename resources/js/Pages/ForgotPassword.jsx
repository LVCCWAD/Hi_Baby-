import React from "react";
import { useForm, Head } from "@inertiajs/react";
import {
    Anchor,
    Button,
    Container,
    Flex,
    Grid,
    Paper,
    Text,
    TextInput,
    Title,
    Image,
    Box,
    Stack,
    Alert,
} from "@mantine/core";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import image from "../Assets/Login.png";
import HandleError from "../Components/HandleError.jsx";

function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/forgot-password");
    };

    return (
        <>
            <Head>
                <title>Forgot Password - Hi Baby!</title>
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
                            <Box
                                style={{
                                    maxWidth: "450px",
                                    margin: "0 auto",
                                    padding: "0 20px",
                                }}
                            >
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
                                                fontSize: "36px",
                                                color: "#333",
                                                textAlign: "center",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            Forgot Password?
                                        </Title>

                                        <Text
                                            size="sm"
                                            style={{
                                                color: "#666",
                                                textAlign: "center",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            Enter your email address and we'll send you a link to reset your password.
                                        </Text>

                                        {status && (
                                            <Alert
                                                icon={<IconCheck size={16} />}
                                                title="Success!"
                                                color="green"
                                                style={{ marginBottom: "20px" }}
                                            >
                                                {status}
                                            </Alert>
                                        )}

                                        <form onSubmit={submit}>
                                            <Stack gap={16}>
                                                <Box>
                                                    <Text
                                                        size="sm"
                                                        fw={500}
                                                        style={{
                                                            marginBottom: "8px",
                                                            color: "#333",
                                                        }}
                                                    >
                                                        Email Address
                                                    </Text>
                                                    <TextInput
                                                        placeholder="Enter your email"
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData("email", e.target.value)
                                                        }
                                                        radius={10}
                                                        size="md"
                                                        style={{
                                                            input: {
                                                                border: "1px solid #ddd",
                                                                fontSize: "16px",
                                                                padding: "12px 16px",
                                                                height: "48px",
                                                            },
                                                        }}
                                                    />
                                                    {errors.email && (
                                                        <HandleError message={errors.email} />
                                                    )}
                                                </Box>

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
                                                    Send Reset Link
                                                </Button>

                                                <Flex justify="center" mt={20}>
                                                    <Anchor
                                                        href="/login"
                                                        size="sm"
                                                        style={{
                                                            color: "#abc32f",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                        }}
                                                    >
                                                        <IconArrowLeft size={16} />
                                                        Back to Login
                                                    </Anchor>
                                                </Flex>
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
                                    alt="Forgot Password illustration"
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

export default ForgotPassword;
