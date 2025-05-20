import { IconCheck } from '@tabler/icons-react';
import { Button, Container, Group, Image, List, Text, ThemeIcon, Title } from '@mantine/core';
import image from '../../Assets/HeroHeader.png';
import classes from '../../../css/Components/HeroHeader.module.css';

function HeroHeader() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <p style={{fontFamily: 'FredokaOne'}}>
            Little Trendsetters Where Classic meets Cute
            </p>
           
          </Title>

          <Text>
            Explore our new and popular baby clothes designed for perfect style and comfort.
          </Text>
          <Group mt={30}>
            <Button radius="xl" size="md" bg="#abc32f" className={classes.control} component="a" href="/login">
              Shop Now
            </Button>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
}
export default HeroHeader;
