import { MantineProvider, Container, Title } from "@mantine/core";
import { Head } from "@inertiajs/react";

function AnalyticsTable({ children }) {
    return (
        <MantineProvider>
            <Container size="xl" py="xl" style={{ backgroundColor: "#faf5ef", minHeight: "100vh" }}>
                <Head>
                    <title>Admin Dashboard - Hi Baby!</title>
                </Head>

                <Title order={1} mb="xl" style={{ color: "#b5b063" }}>
                    <p style={{ fontFamily: "WendyOne", fontSize: "50px" }}>
                        Analytics
                    </p>
                </Title>

                {children}
            </Container>
        </MantineProvider>
    );
}

export default AnalyticsTable;
