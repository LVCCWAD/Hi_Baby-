import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTwitter,
    IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import Logo from "../Assets/Logo.png";
import classes from "../../css/Components/Footer.module.css";

const data = [
    {
        title: "Boys",
        links: [
            { label: "Jackets & Sweaters", link: "#" },
            { label: "Shirts", link: "#" },
            { label: "Pants & Jeans", link: "#" },
            { label: "Suit", link: "#" },
            { label: "Pajamas", link: "#" },
        ],
    },
    {
        title: "Girls",
        links: [
            { label: "Jackets & Sweaters", link: "#" },
            { label: "Shirts", link: "#" },
            { label: "Pants & Jeans", link: "#" },
            { label: "Dresses", link: "#" },
            { label: "Skirts", link: "#" },
            { label: "Pajamas", link: "#" },
        ],
    },
    {
        title: "About",
        links: [
            { label: "About Us", link: "#" },
            { label: "Team", link: "#" },
            { label: "Contact Us", link: "#" },
        ],
    },
];

function Footer() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <img src={Logo} alt="Logo" className={classes.logo} />
                    <Text size="xs" c="dimmed" className={classes.description}>
                        Build fully functional accessible web applications
                        faster than ever
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    @2025PoweredByHiBaby!
                </Text>

                <Group
                    gap={0}
                    className={classes.social}
                    justify="flex-end"
                    wrap="nowrap"
                >
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandFacebook size={18} stroke={1.5} />
                    </ActionIcon>

                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
export default Footer;
