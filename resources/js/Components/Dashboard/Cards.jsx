import { Text, Grid, Card, Group } from "@mantine/core";

function Cards() {
    return (
        <div>
                <Grid grow gutter="xl">
                    <Grid.Col span={3}>
                        {" "}
                        <Card
                            shadow="sm"
                            padding="lg"
                            style={{ maxWidth: 300 }}
                        >
                            <Text
                                weight={500}
                                size="lg"
                                style={{ marginBottom: 10 }}
                            >
                                TODAY'S SALE
                            </Text>
                            <Group position="apart" style={{ marginBottom: 5 }}>
                                <Text size="xl" weight={700} style={{}}>
                                    ₱12,426
                                </Text>
                                <Text size="xl" weight={700} color="green">
                                    + 36%
                                </Text>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        {" "}
                        <Card
                            shadow="sm"
                            padding="lg"
                            style={{ maxWidth: 300 }}
                        >
                            <Text
                                weight={500}
                                size="lg"
                                style={{ marginBottom: 10 }}
                            >
                                TODAY'S SALE
                            </Text>
                            <Group position="apart" style={{ marginBottom: 5 }}>
                                <Text size="xl" weight={700} style={{}}>
                                    ₱12,426
                                </Text>
                                <Text size="xl" weight={700} color="green">
                                    + 36%
                                </Text>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        {" "}
                        <Card
                            shadow="sm"
                            padding="lg"
                            style={{ maxWidth: 300 }}
                        >
                            <Text
                                weight={500}
                                size="lg"
                                style={{ marginBottom: 10 }}
                            >
                                TODAY'S SALE
                            </Text>
                            <Group position="apart" style={{ marginBottom: 5 }}>
                                <Text size="xl" weight={700} style={{}}>
                                    ₱12,426
                                </Text>
                                <Text size="xl" weight={700} color="green">
                                    + 36%
                                </Text>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        {" "}
                        <Card
                            shadow="sm"
                            padding="lg"
                            style={{ maxWidth: 300 }}
                        >
                            <Text
                                weight={500}
                                size="lg"
                                style={{ marginBottom: 10 }}
                            >
                                TODAY'S SALE
                            </Text>
                            <Group position="apart" style={{ marginBottom: 5 }}>
                                <Text size="xl" weight={700} style={{}}>
                                    ₱12,426
                                </Text>
                                <Text size="xl" weight={700} color="green">
                                    + 36%
                                </Text>
                            </Group>
                        </Card>
                    </Grid.Col>
                </Grid>
        </div>
    );
}

export default Cards;
