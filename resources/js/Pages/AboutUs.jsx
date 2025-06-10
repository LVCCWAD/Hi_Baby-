import {
    Container,
    Text,
    Title,
    Box,
    Group,
    Stack,
    Paper,
    Grid,
    ThemeIcon,
    List,
} from "@mantine/core";
import { IconHeart, IconShirt, IconTruck } from "@tabler/icons-react";

function AboutUs() {
    return (
        <Container
            size="xl"
            style={{
                backgroundColor: "#f9f6f1",
                minHeight: "100vh",
                padding: "40px 20px",
            }}
        >
            {/* Hero Section */}
            <Box mb={60} style={{ textAlign: "center" }}>
                <Title
                    order={1}
                    style={{
                        fontSize: "48px",
                        fontFamily: "WendyOne",
                        color: "#BAB86C",
                        marginBottom: "20px",
                        lineHeight: "1.2",
                    }}
                >
                    Welcome to Hi, Baby!
                </Title>
                <Text
                    size="lg"
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        color: "#666",
                        lineHeight: "1.6",
                    }}
                >
                    At Hi, Baby, we believe every little giggle, snuggle, and
                    step deserves to be wrapped in comfort and style. That's why
                    we've created a cozy corner of the internet where parents
                    and gift-givers can find adorable, high-quality clothing for
                    babies and toddlers.
                </Text>
            </Box>

            {/* Mission Section */}
            <Paper
                shadow="sm"
                p={40}
                mb={40}
                style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                }}
            >
                <Title
                    order={2}
                    mb={20}
                    style={{
                        fontFamily: "WendyOne",
                        fontSize: "32px",
                        color: "#BAB86C",
                        textAlign: "center",
                    }}
                >
                    Our Journey
                </Title>
                <Text
                    size="md"
                    style={{
                        textAlign: "center",
                        maxWidth: "700px",
                        margin: "0 auto",
                        color: "#666",
                        lineHeight: "1.6",
                    }}
                >
                    Our journey began with a simple goal: to make dressing
                    little ones both delightful and stress-free. From the
                    softest onesies to playful everyday outfits, every piece in
                    our collection is thoughtfully chosen for comfort, safety,
                    and charm.
                </Text>
            </Paper>

            {/* Values Section */}
            <Box mb={60}>
                <Title
                    order={2}
                    mb={40}
                    style={{
                        fontFamily: "WendyOne",
                        fontSize: "32px",
                        color: "#BAB86C",
                        textAlign: "center",
                    }}
                >
                    We're passionate about:
                </Title>

                <Grid>
                    <Grid.Col span={4}>
                        <Paper
                            shadow="sm"
                            p={30}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "12px",
                                height: "100%",
                                textAlign: "center",
                            }}
                        >
                            <ThemeIcon
                                size={60}
                                radius="xl"
                                style={{
                                    backgroundColor: "#abc32f",
                                    margin: "0 auto 20px",
                                }}
                            >
                                <IconHeart size={30} />
                            </ThemeIcon>
                            <Title
                                order={3}
                                mb={15}
                                style={{
                                    fontFamily: "WendyOne",
                                    fontSize: "20px",
                                    color: "#BAB86C",
                                }}
                            >
                                Comfort-First Design
                            </Title>
                            <Text
                                size="sm"
                                color="#666"
                                style={{ lineHeight: "1.5" }}
                            >
                                Gentle on delicate skin and made for all-day
                                play.
                            </Text>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Paper
                            shadow="sm"
                            p={30}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "12px",
                                height: "100%",
                                textAlign: "center",
                            }}
                        >
                            <ThemeIcon
                                size={60}
                                radius="xl"
                                style={{
                                    backgroundColor: "#abc32f",
                                    margin: "0 auto 20px",
                                }}
                            >
                                <IconShirt size={30} />
                            </ThemeIcon>
                            <Title
                                order={3}
                                mb={15}
                                style={{
                                    fontFamily: "WendyOne",
                                    fontSize: "20px",
                                    color: "#BAB86C",
                                }}
                            >
                                Trendy + Timeless Styles
                            </Title>
                            <Text
                                size="sm"
                                color="#666"
                                style={{ lineHeight: "1.5" }}
                            >
                                Outfits that are as cute as your baby's smile.
                            </Text>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Paper
                            shadow="sm"
                            p={30}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "12px",
                                height: "100%",
                                textAlign: "center",
                            }}
                        >
                            <ThemeIcon
                                size={60}
                                radius="xl"
                                style={{
                                    backgroundColor: "#abc32f",
                                    margin: "0 auto 20px",
                                }}
                            >
                                <IconTruck size={30} />
                            </ThemeIcon>
                            <Title
                                order={3}
                                mb={15}
                                style={{
                                    fontFamily: "WendyOne",
                                    fontSize: "20px",
                                    color: "#BAB86C",
                                }}
                            >
                                Parent-Friendly Shopping
                            </Title>
                            <Text
                                size="sm"
                                color="#666"
                                style={{ lineHeight: "1.5" }}
                            >
                                Easy navigation, fast shipping, and sizes that
                                actually make sense.
                            </Text>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Box>

            {/* Closing Message */}
            <Paper
                shadow="sm"
                p={40}
                mb={40}
                style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                }}
            >
                <Text
                    size="lg"
                    style={{
                        textAlign: "center",
                        maxWidth: "700px",
                        margin: "0 auto 20px",
                        color: "#666",
                        lineHeight: "1.6",
                    }}
                >
                    Whether you're welcoming a new arrival, chasing a curious
                    toddler, or picking the perfect baby shower gift, Hi, Baby
                    is here to help you dress those special moments.
                </Text>
                <Text
                    size="lg"
                    weight={600}
                    style={{
                        textAlign: "center",
                        color: "#BAB86C",
                        fontFamily: "WendyOne",
                        fontSize: "20px",
                    }}
                >
                    Thanks for stopping by. We're so happy you're here!
                </Text>
            </Paper>

            {/* Contact Section */}
            <Box style={{ textAlign: "center" }}>
                <Title
                    order={3}
                    mb={15}
                    style={{
                        fontFamily: "WendyOne",
                        fontSize: "24px",
                        color: "#BAB86C",
                    }}
                >
                    Get in Touch
                </Title>
                <Text size="md" color="#666">
                    For more information, contact us at{" "}
                    <Text
                        component="a"
                        href="mailto:info@hibaby.co"
                        style={{
                            color: "#abc32f",
                            textDecoration: "none",
                            fontWeight: 600,
                        }}
                    >
                        info@hibaby.co
                    </Text>
                </Text>
            </Box>
        </Container>
    );
}

export default AboutUs;
