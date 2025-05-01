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
} from "@mantine/core";
import classes from "../../css/Components/Login.module.css";
import GuestHeader from "../Components/GuestHeader";

function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        post("/login");
    };
    return (
        <MantineProvider>
            <GuestHeader />
            <div className={classes.wrapper}>
                <form onSubmit={submit}>
                    <Paper className={classes.form} radius={0} p={30}>
                        <Title
                            order={2}
                            className={classes.title}
                            ta="center"
                            mt="md"
                            mb={50}
                        >
                            Welcome back to Mantine!
                        </Title>

                        <TextInput
                            label="Email address"
                            placeholder="hello@gmail.com"
                            name="email"
                            id="email"
                            autoComplete="email"
                            required
                            onChange={(e) => setData("email", e.target.value)}
                            size="md"
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            type="password"
                            name="password"
                            id="password"
                            required
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            mt="md"
                            size="md"
                        />
                        <Checkbox label="Keep me logged in" mt="xl" size="md" />
                        {errors.email && <div>{errors.email}</div>}
                        {errors.password && <div>{errors.password}</div>}
                        <Button type="submit" fullWidth mt="xl" size="md">
                            Login
                        </Button>

                        <Text ta="center" mt="md">
                            Don&apos;t have an account?{" "}
                            <Anchor
                                href="/register"
                                fw={700}
                            >
                                Register
                            </Anchor>
                        </Text>
                    </Paper>
                </form>
            </div>
        </MantineProvider>
    );
}
export default Login;
