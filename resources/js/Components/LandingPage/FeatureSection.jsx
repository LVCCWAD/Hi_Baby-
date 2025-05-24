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
                    <Grid.Col key={index} span={{ base: 6, md: 4 }}>
                        <Card
                            shadow="sm"
                            p="l"
                            style={{
                                backgroundColor: "transparent",
                                border: "1px solid #fff",
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                            }}
                        >
                            <div
                             style={{
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}
                             >
                            <ThemeIcon
                                size="sm"
                                variant="outline"
                                color="#BAB86C"
                                sx={{
                                    backgroundColor: "transparent",
                                }}
                            >
                                {feature.icon}
                            </ThemeIcon>
                            </div>
                            <div>
                            <Text size="1x" weight='20' color="#BAB86C">
                                {feature.title}
                            </Text>
                            <Text size="sm" color="#BAB86C">
                                {feature.description}
                            </Text>
                            </div>
                            
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}

export default FeatureSection;
