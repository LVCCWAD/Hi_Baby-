import { Inertia } from '@inertiajs/inertia';

import {
    IconBook,
    IconChartPie3,
    IconChevronDown,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
    IconSearch,
    IconShoppingCart,
    IconUser,
} from "@tabler/icons-react";
import {
    Anchor,
    Autocomplete,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../Assets/Logo.png";
import classes from "../../css/Components/GuestHeader.module.css";

const mockdata = [
    {
        icon: IconCode,
        title: "Open source",
        description: "This Pokémon’s cry is very loud and distracting",
    },
    {
        icon: IconCoin,
        title: "Free for everyone",
        description: "The fluid of Smeargle’s tail secretions changes",
    },
    {
        icon: IconBook,
        title: "Documentation",
        description: "Yanma is capable of seeing 360 degrees without",
    },
    {
        icon: IconFingerprint,
        title: "Security",
        description: "The shell’s rounded shape and the grooves on its.",
    },
    {
        icon: IconChartPie3,
        title: "Analytics",
        description: "This Pokémon uses its flying ability to quickly chase",
    },
    {
        icon: IconNotification,
        title: "Notifications",
        description: "Combusken battles with the intensely hot flames it spews",
    },
];

function AdminHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => {
                window.location.href = '/login'; // Force a full reload
            }
        });

    };

    return (
        <Box pb={30} bg="yellow.1">
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <img src={Logo} alt="Logo" className={classes.logo} />
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="/dashboard" className={classes.link}>
                            Analytics
                        </a>

                        <a href="/show-products" className={classes.link}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Products
                                </Box>

                            </Center>
                        </a>


                        <a href="#" className={classes.link}>
                            Messages
                        </a>
                        <a href="#" className={classes.link}>
                            Orders
                        </a>
                    </Group>
                    <Autocomplete
                        className={classes.search}
                        placeholder="Search"
                        leftSection={<IconSearch size={16} stroke={1.5} />}
                        data={[
                            "React",
                            "Angular",
                            "Vue",
                            "Next.js",
                            "Riot.js",
                            "Svelte",
                            "Blitz.js",
                        ]}
                        visibleFrom="xs"
                    />

                    <Group visibleFrom="sm">
                        <IconShoppingCart size={16} stroke={1.5}/>
                        <IconUser size={16} stroke={1.5}/>
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="sm"
                    />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm" />

                   
                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinks}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Collection
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <IconShoppingCart size={16} stroke={1.5}/>
                        <IconUser size={16} stroke={1.5}/>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default AdminHeader;
