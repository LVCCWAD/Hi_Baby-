import { Paper, Group, Text, Tabs, Box } from "@mantine/core";
import { LineChart } from "@mantine/charts";

function LineGraph({ chartData, timeFilter, setTimeFilter }) {
    return (
        <Paper p="md" radius="md" withBorder mb="md">
            <Group justify="space-between" mb="md">
                <Text fw={500}>Sales Report</Text>
                <Tabs value={timeFilter} onChange={setTimeFilter}>
                    <Tabs.List>
                        <Tabs.Tab value="12 Months">12 Months</Tabs.Tab>
                        <Tabs.Tab value="6 Months">6 Months</Tabs.Tab>
                        <Tabs.Tab value="30 Days">30 Days</Tabs.Tab>
                        <Tabs.Tab value="7 Days">7 Days</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Group>

            <Box mt="md">
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
    );
}

export default LineGraph;
