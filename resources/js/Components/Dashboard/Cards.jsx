import { Grid, Paper, Text, Group } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

function Cards({ statCards }) {
    return (
        <Grid mb="xl">
            {statCards.map((card, index) => (
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                    <Paper p="md" radius="md" withBorder>
                        <Text size="xs" c="dimmed" fw={500}>{card.title}</Text>
                        <Group justify="space-between" align="flex-end" mt={5}>
                            <Text fw={700} size="xl">{card.value}</Text>
                            <Text c={card.isPositive ? "teal" : "red"} fw={700} size="sm" style={{ display: "flex", alignItems: "center" }}>
                                {card.isPositive ? "+ " : "- "}
                                {card.change}%
                                {card.isPositive ? (
                                    <IconArrowUpRight size={16} style={{ marginLeft: 5 }} />
                                ) : (
                                    <IconArrowDownRight size={16} style={{ marginLeft: 5 }} />
                                )}
                            </Text>
                        </Group>
                    </Paper>
                </Grid.Col>
            ))}
        </Grid>
    );
}

export default Cards;
