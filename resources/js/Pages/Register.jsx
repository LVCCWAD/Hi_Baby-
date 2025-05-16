import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Anchor,
    Button,
    Checkbox,
    MantineProvider,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    Image,
    Grid,
} from "@mantine/core";

import image from "../Assets/Register.png";
import classes from "../../css/Components/Login.module.css";
import GuestHeader from "../Components/GuestHeader";

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
            setPassworddError("Passwords do not match");
            return;
        }

        setPasswordError("");
        post("/register");
    };

    return (
        <MantineProvider>
            <GuestHeader />
            <div className={classes.container}>
            <div className={classes.wrapper}>
                <form onSubmit={submit}>
                    <Paper className={classes.form} radius={24} p={30} bg="yellow.1" w="455" h="740">

                        <Title
                            order={2}
                            className={classes.title}
                            ta="center"
                            mt="md"
                            mb={50}
                        >
                            Hi Baby!
                        </Title>

                            <TextInput
                                label="Username"
                                placeholder="Jane_92"
                                name="username"
                                id="username"
                                required
                                fullWidth
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                value={data.name}
                                size="md"
                            />

                            <Grid gutter="md" mt="md">
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="First Name"
                                        placeholder="Jane"
                                        name="first_name"
                                        id="first_name"
                                        required
                                        fullWidth
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        value={data.first_name}
                                        size="md"
                                    />
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Last Name"
                                        placeholder="Campbell"
                                        name="last_name"
                                        id="last_name"
                                        required
                                        fullWidth
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        value={data.last_name}
                                        size="md"
                                    />
                                </Grid.Col>
                            </Grid>

                            <TextInput
                                label="Email address"
                                placeholder="janecampbell@gmail.com"
                                name="email"
                                id="email"
                                fullWidth
                                autoComplete="email"
                                required
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                value={data.email}
                                mt="md"
                                size="md"
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="password"
                                id="password"
                                required
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                value={data.password}
                                mt="md"
                                size="md"
                            />
                            <PasswordInput
                                label="Confirm Password"
                                placeholder="confirm password"
                                name="confirmPassword"
                                id="confirmPassword"
                                fullWidth
                                required
                                onChange={(e) =>
                                    setData("confirmPassword", e.target.value)
                                }
                                value={data.confirmPassword}
                                error={passwordError}
                                mt="md"
                                size="md"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                mt="xl"
                                size="md"
                                className={classes.button}
                            >
                                Register
                            </Button>

                            <Text ta="center" mt="md">
                                Already have an account?{" "}
                                <Anchor href="/login" fw={500}>
                                    Login
                                </Anchor>
                            </Text>
                        </Paper>
                    </form>
                </div>

                <Image src={image} className={classes.image} />
            </div>
        </MantineProvider>
    );
}
export default Register;
