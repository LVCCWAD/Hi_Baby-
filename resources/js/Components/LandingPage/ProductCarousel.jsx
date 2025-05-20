import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import img1 from '../../Assets/1stImg.png';
import img2 from '../../Assets/2ndImg.png';
import img3 from '../../Assets/3rdImg.png';
import img4 from '../../Assets/4thImg.png';
import img5 from '../../Assets/5thImg.png';
import { Button, Paper, Title, useMantineTheme, Text } from '@mantine/core';
import classes from '../../../css/Components/ProductCarousel.module.css';

const data = [
  {
    image:
    img1,
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    image:
    img2,
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
  {
    image:
    img3,
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature',
  },
  {
    image:
    img4,
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    image:
    img5,
    title: 'Best places to visit this winter',
    category: 'tourism',
  }
];


function Card({ image, title, category }) {
  return (
    <Paper
      shadow="md"
      p="x1"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
    </Paper>
  );
}

function ProductCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
 <div>
    <Text align="center" style={{ fontSize: "128px" , fontStyle: "Afacad", fontWeight: "bold"}}  color="#BAB86C" mb="150px" mt="200px">
      New Arrivals
    </Text>

    <Carousel
      slideSize={{ base: '100%', sm: '40%' }}
      slideGap={{ base: 'xl', sm: 1 }}
      emblaOptions={{ align: 'start', slidesToScroll: mobile ? 1 : 2 }}
    >
      {slides}
    </Carousel>
  </div>
  );
}

export default ProductCarousel;
