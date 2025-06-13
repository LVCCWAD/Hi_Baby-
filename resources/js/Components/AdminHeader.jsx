import {
    IconSearch,
    IconBell,
    IconShoppingCart,
    IconUser,
    IconLogin,
    IconUserCircle,
    IconLogout,
    IconSettings,
} from "@tabler/icons-react";
import {
    Autocomplete,
    Box,
    Group,
    Flex,
    Image,
    ActionIcon,
    rem,
    Container,
    Text,
    Menu,
    Divider,
    Tooltip,
} from "@mantine/core";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Logo from "../Assets/Logo.png";
import { useState } from "react";

function AdminHeader() {
    const [searchValue, setSearchValue] = useState("");
    const { auth } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);

    const isAuthenticated = auth && auth.user;

    const handleLogout = () => {
        Inertia.post(
            "/logout",
            {},
            { onSuccess: () => (window.location.href = "/login") }
        );
    };

    return (
        <Box bg="#FBF2E9" py="sm" style={{ borderBottom: "1px solid #e0e0e0" }}>
            <Container size="xl">
                <Flex align="center" justify="space-between" wrap="nowrap">
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Image
                            src={Logo}
                            alt="HI, BABY!"
                            h={50}
                            fit="contain"
                        />
                    </Link>

                    <Group gap={rem(30)}>
                        <NavLink href="/dashboard" label="Analytics" />
                        <NavLink href="/show-products" label="Products" />
                        <NavLink href="/chat" label="Messages" />
                        <NavLink href="/order/list" label="Orders" />
                    </Group>

                    <Flex align="center" gap={rem(20)}>
                        <Menu position="bottom-end" shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon
                                    variant="light"
                                    radius="xl"
                                    size="lg"
                                    color="gray"
                                >
                                    <IconUser size={22} stroke={1.5} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                {isAuthenticated ? (
                                    <>
                                        <Menu.Label>
                                            Signed in as{" "}
                                            <Text
                                                fw={500}
                                                size="sm"
                                                ml={4}
                                                span
                                            >
                                                {auth.user.name ||
                                                    auth.user.email}
                                            </Text>
                                        </Menu.Label>
                                        <Divider my="xs" />
                                        <Menu.Item
                                            onClick={handleLogout}
                                            leftSection={
                                                <IconLogout
                                                    size={16}
                                                    stroke={1.5}
                                                />
                                            }
                                            color="red"
                                        >
                                            Logout
                                        </Menu.Item>
                                    </>
                                ) : (
                                    <>
                                        <Menu.Item
                                            component={Link}
                                            href="/login"
                                            leftSection={
                                                <IconLogin
                                                    size={16}
                                                    stroke={1.5}
                                                />
                                            }
                                        >
                                            Login
                                        </Menu.Item>
                                        <Menu.Item
                                            component={Link}
                                            href="/register"
                                            leftSection={
                                                <IconUserCircle
                                                    size={16}
                                                    stroke={1.5}
                                                />
                                            }
                                        >
                                            Register
                                        </Menu.Item>
                                    </>
                                )}
                            </Menu.Dropdown>
                        </Menu>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}

const NavLink = ({ href, label }) => (
    <Link
        href={href}
        style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#333",
            textDecoration: "none",
            transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#BAB86C")}
        onMouseLeave={(e) => (e.target.style.color = "#333")}
    >
        {label}
    </Link>
);

export default AdminHeader;
