import React from "react";
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
} from "@mantine/core";
import image from "../Assets/Login.png";
import classes from "../../css/Components/Login.module.css";
import HandleError from "../Components/HandleError.jsx";

function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
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
            <div className={classes.container}>
                
                    <form onSubmit={submit}>
                        <Paper className={classes.form} radius={24} p={30} bg="#FBF2E9" w="455">
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
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                size="md"
                            />
                            
                            {errors.email && <HandleError message={errors.email} />}
                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                name="password"
                                id="password"
                                required
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                mt="md"
                                size="md"
                            />
                        

                            {/* <Checkbox
                                label="Keep me logged in"
                                mt="xl"
                                size="md"
                            /> */}

                            {/* Error Display */}
                            
                            {errors.password && <HandleError message={errors.password} />}
                            
                            {errors.default && <HandleError message={errors.default} />}

                            <Button
                                type="submit"
                                fullWidth
                                mt="xl"
                                size="md"
                                className={classes.button}
                                loading={processing}
                            >
                                Login
                            </Button>

                            <Text ta="center" mt="md">
                                Don&apos;t have an account?{" "}
                                <Anchor href="/register" fw={500}>
                                    Register
                                </Anchor>
                            </Text>
                        </Paper>
                    </form>
                
                <Image src={image} className={classes.image} />
            </div>
        </MantineProvider>
    );
}

export default Login;
