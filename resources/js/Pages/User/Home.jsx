import { Container, Grid, Skeleton, MantineProvider } from "@mantine/core";
import AuthHeader from "../../Components/AuthHeader";

const child = <Skeleton height={140} radius="md" animate={false} />;

function Home() {
    return (
        <MantineProvider>
<AuthHeader />
            <Container my="md">
                <Grid>
                    <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
                </Grid>
            </Container>
        </MantineProvider>
    );
}

export default Home;
