import { useState } from "react";
import AnalyticsLayout from "../../Components/Dashboard/AnalyticsTable";
import StatCards from "../../Components/Dashboard/Cards";
import SalesChart from "../../Components/Dashboard/LineGraph";
import TopSearchTerms from "../../Components/Dashboard/TopSearchTerms";
import { Grid } from "@mantine/core";

function Dashboard({ analytics }) {
    const [timeFilter, setTimeFilter] = useState("12 Months");
    const { statCards, chartData, searchTerms } = analytics;

    return (
        <AnalyticsLayout>
            <StatCards statCards={statCards} />

            <Grid>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <SalesChart chartData={chartData} timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <TopSearchTerms searchTerms={searchTerms} />
                </Grid.Col>
            </Grid>
        </AnalyticsLayout>
    );
}

export default Dashboard;
