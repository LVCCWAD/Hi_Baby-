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

function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
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
                            Hi Baby!
                        </Title>

                        <TextInput
                            label="Username"
                            placeholder="username"
                            name="name"
                            id="name"
                            required
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            size="md"
                        />

                        <TextInput
                            label="Email address"
                            placeholder="hello@gmail.com"
                            name="email"
                            id="email"
                            autoComplete="email"
                            required
                            onChange={(e) => setData("email", e.target.value)}
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
                            required
                            onChange={(e) =>
                                setData("confirmPassword", e.target.value)
                            }
                            value={data.confirmPassword}
                            error={passwordError}
                            mt="md"
                            size="md"
                        />
                        <Checkbox label="Keep me logged in" mt="xl" size="md" />
                        <Button type="submit" fullWidth mt="xl" size="md">
                            Register
                        </Button>

                        <Text ta="center" mt="md">
                            Already have an account?{" "}
                            <Anchor href="/login" fw={700}>
                                Login
                            </Anchor>
                        </Text>
                    </Paper>
                </form>
            </div>
        </MantineProvider>
    );
}
export default Register;
