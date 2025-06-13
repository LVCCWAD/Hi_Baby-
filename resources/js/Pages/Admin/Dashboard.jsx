import {
    MantineProvider,
    Container,
    Title,
    Grid,
    Paper,
    Text,
    Group,
    Box,
    Tabs,
    Table,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { LineChart } from "@mantine/charts";
import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";

function Dashboard({ analytics }) {
    const [timeFilter, setTimeFilter] = useState("12 Months");

    // Use real data from backend
    const { statCards, chartData, searchTerms } = analytics;

    console.log(searchTerms);

    return (
        <MantineProvider>
            <Container
                size="xl"
                py="xl"
                style={{ backgroundColor: "#faf5ef", minHeight: "100vh" }}
            >
                <Head>
                    <title>Admin Dashboard - Hi Baby!</title>
                </Head>
                <Title order={1} mb="xl" style={{ color: "#b5b063" }}>
                    <p style={{ fontFamily: "WendyOne", fontSize: "50px" }}>
                        Analytics
                    </p>
                </Title>

                {/* Stat Cards */}
                <Grid mb="xl">
                    {statCards.map((card, index) => (
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                            <Paper p="md" radius="md" withBorder>
                                <Text size="xs" c="dimmed" fw={500}>
                                    {card.title}
                                </Text>
                                <Group
                                    justify="space-between"
                                    align="flex-end"
                                    mt={5}
                                >
                                    <Text fw={700} size="xl">
                                        {card.value}
                                    </Text>
                                    <Text
                                        c={card.isPositive ? "teal" : "red"}
                                        fw={700}
                                        size="sm"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {card.isPositive ? "+ " : "- "}
                                        {card.change}%
                                        {card.isPositive ? (
                                            <IconArrowUpRight
                                                size={16}
                                                style={{ marginLeft: 5 }}
                                            />
                                        ) : (
                                            <IconArrowDownRight
                                                size={16}
                                                style={{ marginLeft: 5 }}
                                            />
                                        )}
                                    </Text>
                                </Group>
                            </Paper>
                        </Grid.Col>
                    ))}
                </Grid>

                {/* Sales Report and Search Terms */}
                <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper p="md" radius="md" withBorder mb="md">
                            <Group justify="space-between" mb="md">
                                <Text fw={500}>Sales Report</Text>
                                <Group>
                                    <Tabs
                                        value={timeFilter}
                                        onChange={setTimeFilter}
                                    >
                                        <Tabs.List>
                                            <Tabs.Tab value="12 Months">
                                                12 Months
                                            </Tabs.Tab>
                                            <Tabs.Tab value="6 Months">
                                                6 Months
                                            </Tabs.Tab>
                                            <Tabs.Tab value="30 Days">
                                                30 Days
                                            </Tabs.Tab>
                                            <Tabs.Tab value="7 Days">
                                                7 Days
                                            </Tabs.Tab>
                                        </Tabs.List>
                                    </Tabs>
                                </Group>
                            </Group>

                            <Box mt="md">
                                <LineChart
                                    h={300}
                                    data={chartData}
                                    dataKey="date"
                                    series={[
                                        { name: "Sales", color: "blue.6" },
                                        { name: "Orders", color: "blue.3" },
                                    ]}
                                    curveType="natural"
                                    gridAxis="y"
                                    withLegend
                                    withTooltip
                                    withDots
                                />
                            </Box>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper p="md" radius="md" withBorder>
                            <Text fw={500} mb="md">
                                Top Search Terms
                            </Text>
                            {searchTerms && searchTerms.length > 0 ? (
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Search Term</Table.Th>
                                            <Table.Th>Results</Table.Th>
                                            <Table.Th>Uses</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {searchTerms.map((term, index) => (
                                            <Table.Tr key={index}>
                                                <Table.Td>{term.term}</Table.Td>
                                                <Table.Td>
                                                    {term.results}
                                                </Table.Td>
                                                <Table.Td>{term.uses}</Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            ) : (
                                <Text c="dimmed" ta="center" py="md">
                                    No search data available yet
                                </Text>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>
        </MantineProvider>
    );
}

export default Dashboard;
