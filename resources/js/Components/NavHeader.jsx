import {
    IconSearch,
    IconBell,
    IconShoppingCart,
    IconUser,
    IconLogin,
    IconUserCircle,
    IconLogout,
    IconFileText,
    IconMessageCircle,
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
} from "@mantine/core";
import { Link, usePage, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Logo from "../Assets/Logo.png";
import CollectionDropdown from "./CollectionDropdown";
import NotificationModal from "./NotificationModal";
import styled from "styled-components";
import { useState } from "react";

function NavHeader() {
    const [searchValue, setSearchValue] = useState("");
    const { auth } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);

    const isAuthenticated = auth && auth.user;

    const handleLogout = () => {
        Inertia.post(
            "/logout",
            {},
            {
                onSuccess: () => {
                    window.location.href = "/login"; // Full reload
                },
            }
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchValue.trim();
        if (!trimmed) return;
        router.visit(`/search?q=${encodeURIComponent(trimmed)}`);
    };

    return (
        <Box bg="#FBF2E9" py="md" style={{ borderBottom: "1px solid #f0f0f0" }}>
            <Container size="xl">
                <Flex align="center" justify="space-between" wrap="nowrap">
                    {/* Left: Logo */}
                    <Link href="/home" style={{ textDecoration: "none" }}>
                        <Image
                            src={Logo}
                            alt="HI, BABY!"
                            h={40}
                            fit="contain"
                        />
                    </Link>

                    {/* Center: Navigation */}
                    <Group gap={rem(40)}>
                        <CollectionDropdown />
                        <LinkStyle href="/aboutus">About Us</LinkStyle>
                    </Group>

                    {/* Right: Search & Icons */}
                    <Flex align="center" gap={rem(20)}>
                        {/* Search */}
                        <Flex
                            component="form"
                            onSubmit={handleSearchSubmit}
                            align="center"
                            style={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: rem(20),
                                padding: `0 ${rem(8)}`,
                                height: rem(40),
                                width: rem(240),
                                overflow: "hidden",
                            }}
                        >
                            <Autocomplete
                                placeholder="Search"
                                value={searchValue}
                                onChange={setSearchValue}
                                data={["Bibs", "Shoes", "Toys", "Blankets"]}
                                styles={{
                                    input: {
                                        backgroundColor: "transparent",
                                        border: "none",
                                        paddingLeft: rem(12),
                                        fontSize: rem(14),
                                        width: "100%",
                                        height: rem(40),
                                        "&:focus": {
                                            outline: "none",
                                        },
                                    },
                                    dropdown: {
                                        borderRadius: rem(8),
                                    },
                                }}
                            />
                            <ActionIcon
                                type="submit"
                                variant="transparent"
                                size={32}
                                style={{
                                    color: "#fff",
                                    backgroundColor: "#abc32f",
                                    borderRadius: rem(8),
                                    cursor: "pointer",
                                }}
                                aria-label="Search"
                            >
                                <IconSearch size={18} />
                            </ActionIcon>
                        </Flex>

                        {/* Icons */}
                        <Group gap={rem(20)}>
                            <ActionIcon
                                variant="transparent"
                                style={{ color: "#555" }}
                                onClick={() => setModalOpen(true)}
                            >
                                <IconBell size={20} stroke={1.5} />
                            </ActionIcon>

                            <NotificationModal
                                opened={modalOpen}
                                onClose={() => setModalOpen(false)}
                            />

                            <ActionIcon
                                variant="transparent"
                                component={Link}
                                href="/cart"
                                style={{ color: "#555" }}
                            >
                                <IconShoppingCart size={20} stroke={1.5} />
                            </ActionIcon>

                            {/* User Menu */}
                            <Menu
                                position="bottom-end"
                                shadow="md"
                                width={200}
                                styles={{
                                    dropdown: {
                                        borderRadius: rem(8),
                                        boxShadow:
                                            "0 2px 10px rgba(0, 0, 0, 0.1)",
                                    },
                                    item: {
                                        fontSize: rem(14),
                                        padding: `${rem(8)} ${rem(12)}`,
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                        },
                                    },
                                }}
                            >
                                <Menu.Target>
                                    <ActionIcon
                                        variant="transparent"
                                        style={{ color: "#555" }}
                                    >
                                        <IconUser size={20} stroke={1.5} />
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

                                            <Menu.Item
                                                component={Link}
                                                href="/profile"
                                                leftSection={
                                                    <IconUserCircle
                                                        size={16}
                                                        stroke={1.5}
                                                    />
                                                }
                                            >
                                                User Settings
                                            </Menu.Item>

                                            <Menu.Item
                                                component={Link}
                                                href="/chat"
                                                leftSection={
                                                    <IconMessageCircle
                                                        size={16}
                                                        stroke={1.5}
                                                    />
                                                }
                                            >
                                                Chats
                                            </Menu.Item>

                                            <Menu.Item
                                                component={Link}
                                                href="/orders"
                                                leftSection={
                                                    <IconFileText
                                                        size={16}
                                                        stroke={1.5}
                                                    />
                                                }
                                            >
                                                Orders
                                            </Menu.Item>

                                            <Divider my="xs" />

                                            <Menu.Item
                                                component="a"
                                                href="/login"
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
                        </Group>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}

const LinkStyle = styled(Link)`
    font-size: 15px;
    font-weight: 500;
    color: #333;
    text-decoration: none;
    transition: color 0.2s ease;
    padding: 10px;

    &:hover {
        color: #ede7e7;
        background-color: #9f8e8e;
        border-radius: 20px;
    }
`;

export default NavHeader;
