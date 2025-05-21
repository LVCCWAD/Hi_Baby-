import { MantineProvider, Container, Title, Paper, Grid, Text, Group, Box, Tabs, Button, Table } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight, IconFileExport } from "@tabler/icons-react";
import { LineChart } from "@mantine/charts";
import { useState } from "react";

function Dashboard() {
    const [timeFilter, setTimeFilter] = useState('12 Months');

    // Sample data for the stat cards
    const statCards = [
        { title: "TODAY'S SALE", value: "₱12,426", change: 36, isPositive: true },
        { title: "TOTAL SALES", value: "₱2,383,485", change: 14, isPositive: false },
        { title: "TOTAL ORDERS", value: "84,382", change: 36, isPositive: true },
        { title: "TOTAL CUSTOMERS", value: "33,493", change: 36, isPositive: true },
    ];

    // Sample data for the line chart
    const chartData = [
        { date: "Feb", Sales: 45000, Orders: 25000 },
        { date: "Mar", Sales: 52000, Orders: 28000 },
        { date: "Apr", Sales: 48000, Orders: 26000 },
        { date: "May", Sales: 61000, Orders: 32000 },
        { date: "Jun", Sales: 65000, Orders: 35000 },
        { date: "Jul", Sales: 68000, Orders: 37000 },
        { date: "Aug", Sales: 75000, Orders: 40000 },
        { date: "Sep", Sales: 83000, Orders: 45000 },
        { date: "Oct", Sales: 87000, Orders: 48000 },
        { date: "Nov", Sales: 91000, Orders: 51000 },
        { date: "Dec", Sales: 99000, Orders: 55000 },
        { date: "Jan", Sales: 105000, Orders: 58000 },
    ];

    // Sample data for search terms table
    const searchTerms = [
        { term: "bodysuits", results: 172, uses: 569 },
        { term: "sweater", results: 151, uses: 579 },
        { term: "polo", results: 147, uses: 463 },
        { term: "sleepsuits", results: 123, uses: 247 },
        { term: "rompers", results: 94, uses: 191 },
    ];

    return (
        <MantineProvider>
            <Container size="xl" py="xl" style={{ backgroundColor: "#faf5ef", minHeight: "100vh" }}>
                <Title order={1} mb="xl" style={{ color: "#b5b063" }}>
                    <p style={{fontFamily: 'WendyOne', fontSize:'50px' }} >Analytics</p>
                </Title>

                {/* Stat Cards */}
                <Grid mb="xl">
                    {statCards.map((card, index) => (
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                            <Paper p="md" radius="md" withBorder>
                                <Text size="xs" c="dimmed" fw={500}>
                                    {card.title}
                                </Text>
                                <Group justify="space-between" align="flex-end" mt={5}>
                                    <Text fw={700} size="xl">{card.value}</Text>
                                    <Text
                                        c={card.isPositive ? "teal" : "red"}
                                        fw={700}
                                        size="sm"
                                        style={{ display: "flex", alignItems: "center" }}
                                    >
                                        {card.isPositive ? "+ " : "- "}{card.change}%
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

                {/* Sales Report and Search Terms */}
                <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper p="md" radius="md" withBorder mb="md">
                            <Group justify="space-between" mb="md">
                                <Text fw={500}>Sales Report</Text>
                                <Group>
                                    <Tabs value={timeFilter} onChange={setTimeFilter}>
                                        <Tabs.List>
                                            <Tabs.Tab value="12 Months">12 Months</Tabs.Tab>
                                            <Tabs.Tab value="6 Months">6 Months</Tabs.Tab>
                                            <Tabs.Tab value="30 Days">30 Days</Tabs.Tab>
                                            <Tabs.Tab value="7 Days">7 Days</Tabs.Tab>
                                        </Tabs.List>
                                    </Tabs>
                                    <Button
                                        variant="outline"
                                        size="xs"
                                        leftSection={<IconFileExport size={16} />}
                                    >
                                        Export PDF
                                    </Button>
                                </Group>
                            </Group>

                            <Box mt="md">
                                <Box style={{ position: 'relative' }}>
                                    <Box style={{ position: 'absolute', top: 20, left: 20 }}>
                                        <Text size="xs" c="dimmed">June 2021</Text>
                                        <Text fw={700}>₱45,991</Text>
                                    </Box>
                                </Box>
                                <LineChart
                                    h={300}
                                    data={chartData}
                                    dataKey="date"
                                    series={[
                                        { name: "Sales", color: "blue.6" },
                                        { name: "Orders", color: "blue.3" }
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
                            <Text fw={500} mb="md">Top Search Terms</Text>
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
                                            <Table.Td>{term.results}</Table.Td>
                                            <Table.Td>{term.uses}</Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>
        </MantineProvider>
    );
}
export default Dashboard;
