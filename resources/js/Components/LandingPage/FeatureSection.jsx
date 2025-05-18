import { Container, Grid, Card, Text, ThemeIcon } from "@mantine/core";
import {
    IconTruckDelivery,
    IconRotateClockwise,
    IconShield,
} from "@tabler/icons-react"; // Mantine supports Tabler icons

function FeatureSection() {
    const features = [
        {
            icon: <IconTruckDelivery size={32} />,
            title: "Free shipping",
            description: "Free shipping for ₱10,000 and up.",
        },
        {
            icon: <IconRotateClockwise size={32} />,
            title: "Refund Policy",
            description: "Refund when defective product.",
        },
        {
            icon: <IconShield size={32} />,
            title: "Safe of users",
            description: "Cotton fabric is safe for users' health.",
        },
    ];

    return (
        <Container size="lg" py={50} style={{ borderRadius: 8 }}>
            <Grid gutter="lg">
                {features.map((feature, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                        <Card
                            shadow="sm"
                            p="xl"
                            style={{
                                backgroundColor: "transparent",
                                border: "1px solid #fff",
                            }}
                        >
                            <ThemeIcon
                                size="xl"
                                variant="outline"
                                color="#BAB86C"
                                sx={{
                                    marginBottom: 16,
                                    backgroundColor: "transparent",
                                }}
                            >
                                {feature.icon}
                            </ThemeIcon>
                            <Text size="xl" weight={600} color="#BAB86C">
                                {feature.title}
                            </Text>
                            <Text size="sm" mt="xs" color="#BAB86C">
                                {feature.description}
                            </Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}

export default FeatureSection;
