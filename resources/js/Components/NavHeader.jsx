import {
    IconSearch,
    IconBell,
    IconShoppingCart,
    IconUser,
    IconLogin,
    IconUserCircle,
    IconLogout,
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
    Tooltip,
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
        setHasSeenNotifications(true);
    };

    const handleLogout = () => {
        Inertia.post("/logout", {}, { onSuccess: () => (window.location.href = "/login") });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchValue.trim();
        if (!trimmed) return;
        router.visit(`/search?q=${encodeURIComponent(trimmed)}`);
    };

    return (
        <Box bg="#FBF2E9" py="sm" style={{ borderBottom: "1px solid #e0e0e0" }}>
            <Container size="xl">
                <Flex align="center" justify="space-between" wrap="nowrap">

                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Image src={Logo} alt="HI, BABY!" h={50} fit="contain" />
                    </Link>

                    {/* Navigation Links */}
                    <Group gap={rem(30)}>
                        <CollectionDropdown />
                        <NavLink href="/aboutus">About Us</NavLink>
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
                            <ActionIcon type="submit" variant="filled" size={32} color="#BAB86C" radius="md">
                                <IconSearch size={18} />
                            </ActionIcon>
                        </Flex>

                        {/* Notification, Cart, User Menu */}
                        <Group gap={rem(15)}>
                            {isAuthenticated && (
                                <>
                                    <Tooltip label="Cart">
                                        <ActionIcon variant="light" component={Link} href="/cart" radius="xl" size="lg" color="gray">
                                            <IconShoppingCart size={22} stroke={1.5} />
                                        </ActionIcon>
                                    </Tooltip>

                                    <NotificationModal opened={modalOpen} onClose={() => setModalOpen(false)} notifications={notifications} />

                                    <Tooltip label="Notifications">
                                        <Indicator disabled={!showBadge} color="red" size={10} offset={4} position="top-end" withBorder>
                                            <ActionIcon variant="light" onClick={handleOpenNotifications} radius="xl" size="lg" color="gray">
                                                <IconBell size={22} stroke={1.5} />
                                            </ActionIcon>
                                        </Indicator>
                                    </Tooltip>
                                </>
                            )}

                            {/* User Menu */}
                            <Menu position="bottom-end" shadow="md" width={200}>
                                <Menu.Target>
                                    <ActionIcon variant="light" radius="xl" size="lg" color="gray">
                                        <IconUser size={22} stroke={1.5} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    {isAuthenticated ? (
                                        <>
                                            <Menu.Label>
                                                Signed in as{" "}
                                                <Text fw={500} size="sm" ml={4} span>
                                                    {auth.user.name || auth.user.email}
                                                </Text>
                                            </Menu.Label>

                                            <Menu.Item component={Link} href="/profile" leftSection={<IconUserCircle size={16} stroke={1.5} />}>
                                                User Settings
                                            </Menu.Item>

                                            <Menu.Item component={Link} href="/chat" leftSection={<IconMessageCircle size={16} stroke={1.5} />}>
                                                Chats
                                            </Menu.Item>

                                            <Divider my="xs" />

                                            <Menu.Item onClick={handleLogout} leftSection={<IconLogout size={16} stroke={1.5} />} color="red">
                                                Logout
                                            </Menu.Item>
                                        </>
                                    ) : (
                                        <>
                                            <Menu.Item component={Link} href="/login" leftSection={<IconLogin size={16} stroke={1.5} />}>
                                                Login
                                            </Menu.Item>
                                            <Menu.Item component={Link} href="/register" leftSection={<IconUserCircle size={16} stroke={1.5} />}>
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

const NavLink = styled(Link)`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 8px 12px;
    border-radius: 20px;

    &:hover {
        color: #fff;
        background-color: #bab86c;
    }
`;

export default NavHeader;
