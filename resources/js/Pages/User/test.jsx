import {
    Button,
    Grid,
    Skeleton,
    MantineProvider,
    Group,
    Image,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import AuthHeader from "../../Components/AuthHeader";
import ProductCard from "../../Components/ProductCard.jsx";

const child = <Skeleton height={140} radius="md" animate={false} />;
const images = [
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
];
function Home({ products = [] }) {
    const girlsProducts = products.filter(product => product.gender?.name === 'Girls');
    const boysProducts = products.filter(product => product.gender?.name === 'Boys');

    const girlsSlides = girlsProducts.map((product) => (
        <Carousel.Slide key={product.id}>
            <ProductCard product={product} />
        </Carousel.Slide>
    ));

    const boysSlides = boysProducts.map((product) => (
        <Carousel.Slide key={product.id}>
            <ProductCard product={product} />
        </Carousel.Slide>
    ));
    return (
        <MantineProvider>
            <AuthHeader />
            <Grid
                justify="space-around"
                align="flex-start"
                m={30}
                gutter={{ base: 5, xs: "md", md: "xl", xl: 30 }}
            >
                <Grid.Col span={2} h={200} offset={1}>
                    <h1>Categories</h1>
                    <Group>
                        {" "}
                        <Button variant="outline">Small</Button>{" "}
                        <Button variant="outline">Medium</Button>
                        {/* <Button variant="outline">Medium</Button> */}
                        <Button variant="outline">Large</Button>
                        <Button variant="outline">X-Large</Button>
                        <Button variant="outline">XX-Large</Button>
                    </Group>
                </Grid.Col>

                {/* {"carousel girls"} */}
                <Grid.Col span={9} h={320}>
                    <h1>Girls Clothing</h1>
                    <Carousel
                        withIndicators
                        height={300}
                        slideSize="33.333333%"
                        slideGap="x"
                        loop
                        align="start"
                        slidesToScroll={1}
                    >
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>


                    </Carousel>{" "}
                </Grid.Col>
                <Grid.Col span={2} h={300} offset={1}>
                    <h1>Sizes</h1>
                    <Group>
                        {" "}
                        <Button variant="outline">Small</Button>{" "}
                        <Button variant="outline">Medium</Button>
                        {/* <Button variant="outline">Medium</Button> */}
                        <Button variant="outline">Large</Button>
                        <Button variant="outline">X-Large</Button>
                        <Button variant="outline">XX-Large</Button>
                    </Group>
                </Grid.Col>
                {/* {"carousel girls"} */}
                <Grid.Col span={9} h={320} pt={50}>
                    <h1>Boys Clothing</h1>

                    <Carousel
                        withIndicators
                        height={300}
                        slideSize="33.333333%"
                        slideGap="md"
                        loop
                        align="start"
                        slidesToScroll={1}
                    >
                        {boysSlides}
                    </Carousel>{" "}
                </Grid.Col>
            </Grid>
        </MantineProvider>
    );
}

export default Home;
