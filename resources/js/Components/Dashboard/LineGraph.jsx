import { Grid } from "@mantine/core";
import { LineChart } from "@mantine/charts";

const jobColors = {
    engineer: "blue",
    manager: "cyan",
    designer: "pink",
};

const dataCharts = [
    {
        date: "Mar 22",
        Apples: 2890,
        Oranges: 2338,
        Tomatoes: 2452,
    },
    {
        date: "Mar 23",
        Apples: 2756,
        Oranges: 2103,
        Tomatoes: 2402,
    },
    {
        date: "Mar 24",
        Apples: 3322,
        Oranges: 986,
        Tomatoes: 1821,
    },
    {
        date: "Mar 25",
        Apples: 3470,
        Oranges: 2108,
        Tomatoes: 2809,
    },
    {
        date: "Mar 26",
        Apples: 3129,
        Oranges: 1726,
        Tomatoes: 2290,
    },
];
function LineGraph() {
    return (
        <div>
            <Grid>
                <Grid.Col span={6}>
                    <LineChart
                        h={300}
                        data={dataCharts}
                        dataKey="date"
                        series={[
                            { name: "Apples", color: "indigo.6" },
                            { name: "Oranges", color: "blue.6" },
                            { name: "Tomatoes", color: "teal.6" },
                        ]}
                        curveType="bump"
                        gridAxis="y"
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default LineGraph;
