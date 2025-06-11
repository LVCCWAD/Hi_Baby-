import {
    Container,
    Grid,
    Card,
    Text,
    ThemeIcon,
    Box,
    Stack,
    Group,
    Title,
    useMantineTheme
} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import {
    IconTruckDelivery,
    IconRotateClockwise,
    IconShield,
} from "@tabler/icons-react";

function FeatureSection() {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

    const features = [
        {
            icon: <IconTruckDelivery size={isMobile ? 24 : 32} />,
            title: "Free Shipping",
            description: "Free shipping for orders ₱10,000 and up.",
        },
        {
            icon: <IconRotateClockwise size={isMobile ? 24 : 32} />,
            title: "Refund Policy",
            description: "Easy refund for defective products.",
        },
        {
            icon: <IconShield size={isMobile ? 24 : 32} />,
            title: "Safe Materials",
            description: "100% cotton fabric safe for baby's health.",
        },
    ];

    return (
        <Container size="xl" px={0}>
            <Stack spacing={isMobile ? 'lg' : 'xl'} align="center">
                {/* Section Header */}
                <Box ta="center">
                    <Title
                        order={3}
                        size={isMobile ? 20 : 24}
                        weight={600}
                        color="#BAB86C"
                        mb="xs"
                        style={{
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Why Choose Us
                    </Title>
                    <Text
                        size={isMobile ? "sm" : "md"}
                        color="dimmed"
                        maw={400}
                        mx="auto"
                    >
                        We're committed to providing the best experience for you and your little ones
                    </Text>
                </Box>

                {/* Features Grid */}
                <Grid
                    gutter={isMobile ? 'md' : 'lg'}
                    justify="center"
                    align="stretch"
                    w="100%"
                >
                    {features.map((feature, index) => (
                        <Grid.Col
                            key={index}
                            span={{ base: 12, xs: 6, sm: 4, md: 4 }}
                        >
                            <Card
                                shadow="sm"
                                padding={isMobile ? 'md' : 'lg'}
                                radius="lg"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    border: '1px solid rgba(186, 184, 108, 0.2)',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(186, 184, 108, 0.15)';
                                    e.currentTarget.style.borderColor = '#BAB86C';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '';
                                    e.currentTarget.style.borderColor = 'rgba(186, 184, 108, 0.2)';
                                }}
                            >
                                <Stack
                                    spacing={isMobile ? 'sm' : 'md'}
                                    align={isMobile ? 'center' : 'flex-start'}
                                    style={{ height: '100%' }}
                                >
                                    <ThemeIcon
                                        size={isMobile ? 'lg' : 'xl'}
                                        radius="xl"
                                        variant="light"
                                        color="#BAB86C"
                                        style={{
                                            backgroundColor: 'rgba(186, 184, 108, 0.1)',
                                            border: '2px solid rgba(186, 184, 108, 0.2)'
                                        }}
                                    >
                                        {feature.icon}
                                    </ThemeIcon>

                                    <Box style={{ flex: 1 }}>
                                        <Text
                                            size={isMobile ? 'md' : 'lg'}
                                            weight={700}
                                            color="#2D2D2D"
                                            mb="xs"
                                            ta={isMobile ? 'center' : 'left'}
                                        >
                                            {feature.title}
                                        </Text>
                                        <Text
                                            size={isMobile ? 'sm' : 'md'}
                                            color="dimmed"
                                            style={{ lineHeight: 1.5 }}
                                            ta={isMobile ? 'center' : 'left'}
                                        >
                                            {feature.description}
                                        </Text>
                                    </Box>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
}

export default FeatureSection;
