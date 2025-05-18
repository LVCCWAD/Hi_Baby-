import { IconPencil, IconTrash } from "@tabler/icons-react";
import {

    Table,
    Text,
    MantineProvider, Grid, Card
} from "@mantine/core";
import { LineChart } from '@mantine/charts';


const jobColors = {
    engineer: "blue",
    manager: "cyan",
    designer: "pink",
};

const dataCharts = [
    {
        date: 'Mar 22',
        Apples: 2890,
        Oranges: 2338,
        Tomatoes: 2452,
    },
    {
        date: 'Mar 23',
        Apples: 2756,
        Oranges: 2103,
        Tomatoes: 2402,
    },
    {
        date: 'Mar 24',
        Apples: 3322,
        Oranges: 986,
        Tomatoes: 1821,
    },
    {
        date: 'Mar 25',
        Apples: 3470,
        Oranges: 2108,
        Tomatoes: 2809,
    },
    {
        date: 'Mar 26',
        Apples: 3129,
        Oranges: 1726,
        Tomatoes: 2290,
    },
];

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];


function Dashboard() {
    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));

    return (
        <MantineProvider>
            <h1>Analytics</h1>
            <Grid grow gutter="xl">
                <Grid.Col span={3}> <Card
                    shadow="sm"
                    padding="xl"
                    component="a"
                    target="_blank"
                >
                    <Card.Section>

                    </Card.Section>

                    <Text fw={500} size="lg" mt="md">
                        You&apos;ve won a million dollars in cash!
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                    </Text>
                </Card> </Grid.Col>
                <Grid.Col span={3}> <Card
                    shadow="sm"
                    padding="xl"
                    component="a"
                    target="_blank"
                >
                    <Card.Section>

                    </Card.Section>

                    <Text fw={500} size="lg" mt="md">
                        You&apos;ve won a million dollars in cash!
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                    </Text>
                </Card> </Grid.Col>
                <Grid.Col span={3}> <Card
                    shadow="sm"
                    padding="xl"
                    component="a"
                    target="_blank"
                >
                    <Card.Section>

                    </Card.Section>

                    <Text fw={500} size="lg" mt="md">
                        You&apos;ve won a million dollars in cash!
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                    </Text>
                </Card> </Grid.Col>
                <Grid.Col span={3}> <Card
                    shadow="sm"
                    padding="xl"
                    component="a"
                    target="_blank"
                >
                    <Card.Section>

                    </Card.Section>

                    <Text fw={500} size="lg" mt="md">
                        You&apos;ve won a million dollars in cash!
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                    </Text>
                </Card> </Grid.Col>
                <Grid.Col span={6}><LineChart
                    h={300}
                    data={dataCharts}
                    dataKey="date"
                    series={[
                        { name: 'Apples', color: 'indigo.6' },
                        { name: 'Oranges', color: 'blue.6' },
                        { name: 'Tomatoes', color: 'teal.6' },
                    ]}
                    curveType="bump"
                    gridAxis="y"
                /></Grid.Col>

                <Grid.Col span={2} offset={.5}><Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Element position</Table.Th>
                            <Table.Th>Element name</Table.Th>
                            <Table.Th>Symbol</Table.Th>
                            <Table.Th>Atomic mass</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table></Grid.Col>
            </Grid>


        </MantineProvider>
    );
}
export default Dashboard;
