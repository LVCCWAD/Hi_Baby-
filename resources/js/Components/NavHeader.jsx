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
    Indicator,
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
    const { auth, notifications = [] } = usePage().props;
    const isAuthenticated = auth && auth.user;
    const [modalOpen, setModalOpen] = useState(false);
    const [hasSeenNotifications, setHasSeenNotifications] = useState(false);

    const unreadNotifications = notifications.length > 0;
    const showBadge = unreadNotifications && !hasSeenNotifications;
    const handleOpenNotifications = () => {
        setModalOpen(true);
        setHasSeenNotifications(true); // Hide badge after opening
    };

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
                    {/* Logo */}
                    <Link href="/home" style={{ textDecoration: "none" }}>
                        <Image
                            src={Logo}
                            alt="HI, BABY!"
                            h={40}
                            fit="contain"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <Group gap={rem(40)}>
                        <CollectionDropdown />
                        <LinkStyle href="/aboutus">About Us</LinkStyle>
                    </Group>

                    {/* Right Side Icons and Search */}
                    <Flex align="center" gap={rem(20)}>
                        {/* Search Bar */}
                        <Flex
                            component="form"
                            onSubmit={handleSearchSubmit}
                            align="center"
                            gap="xs"
                            style={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: rem(20),
                                padding: `0 ${rem(12)}`,
                                height: rem(40),
                                width: rem(240),
                                overflow: "hidden",
                            }}
                        >
                            <Autocomplete
                                placeholder="Search products"
                                value={searchValue}
                                onChange={setSearchValue}
                                data={["Bibs", "Shoes", "Toys", "Blankets"]}
                                radius="xl"
                                size="sm"
                                styles={{
                                    input: {
                                        backgroundColor: "transparent",
                                        border: "none",
                                        fontSize: rem(14),
                                        paddingLeft: rem(6),
                                        width: "100%",
                                        height: rem(40),
                                    },
                                    dropdown: {
                                        borderRadius: rem(8),
                                    },
                                }}
                            />
                            <ActionIcon
                                type="submit"
                                variant="filled"
                                size={32}
                                color="lime.6"
                                radius="md"
                                aria-label="Search"
                            >
                                <IconSearch size={18} />
                            </ActionIcon>
                        </Flex>

                        {/* Notification, Cart, User Menu */}
                        <Group gap={rem(20)}>
                            <NotificationModal
                                opened={modalOpen}
                                onClose={() => setModalOpen(false)}
                                notifications={notifications}
                            />

                            <Indicator
                                disabled={!showBadge}
                                color="red"
                                size={10}
                                offset={4}
                                position="top-end"
                                withBorder
                            >
                                <ActionIcon
                                    variant="transparent"
                                    style={{ color: "#555" }}
                                    onClick={handleOpenNotifications}
                                >
                                    <IconBell size={20} stroke={1.5} />
                                </ActionIcon>
                            </Indicator>

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
