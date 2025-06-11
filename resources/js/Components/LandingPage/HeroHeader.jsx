import { IconCheck } from '@tabler/icons-react';
import {
  Button,
  Container,
  Group,
  Image,
  Text,
  Title,
  Box,
  Stack,
  Flex,
  useMantineTheme
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import image from '../../Assets/HeroHeader.png';
import classes from '../../../css/Components/HeroHeader.module.css';

function HeroHeader() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Container size="xl" px={0}>
      <Flex
        direction={isMobile ? 'column' : 'row'}
        align={isMobile ? 'center' : 'center'}
        justify="space-between"
        gap={isMobile ? 'xl' : 'lg'}
        py={isMobile ? 'md' : 'xl'}
      >
        {/* Content Section */}
        <Box
          style={{
            flex: isMobile ? 'none' : '1',
            maxWidth: isMobile ? '100%' : '50%',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          <Stack spacing={isMobile ? 'md' : 'lg'}>
            <Title
              order={1}
              size={isMobile ? 32 : isTablet ? 42 : 52}
              weight={700}
            //   color="#BAB86C"
              style={{
                fontFamily: 'FredokaOne, cursive',
                lineHeight: 1.2,
                textShadow: '2px 2px 4px rgba(186, 184, 108, 0.1)',
                color: '#939157',

              }}
            >
              Little Trendsetters Where Classic meets Cute
            </Title>

            <Text
              size={isMobile ? 'md' : 'lg'}
              color="dimmed"
              style={{
                lineHeight: 1.6,
                maxWidth: isMobile ? '100%' : '480px'
              }}
            >
              Explore our new and popular baby clothes designed for perfect style and everyday comfort.
            </Text>

            <Group
              position={isMobile ? 'center' : 'left'}
              mt={isMobile ? 'md' : 'xl'}
              spacing="md"
            >
              <Button
                size={isMobile ? 'md' : 'lg'}
                radius="xl"
                style={{
                  backgroundColor: '#BAB86C',
                  border: 'none',
                  padding: isMobile ? '10px 24px' : '12px 32px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  minWidth: isMobile ? '140px' : '160px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#A5A35F';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#BAB86C';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                component="a"
                href="/login"
              >
                Shop Now
              </Button>


            </Group>
          </Stack>
        </Box>

        {/* Image Section */}
        {!isMobile && (
          <Box
            style={{
              flex: '1',
              maxWidth: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              src={image}
              alt="Baby in cute outfit"
              style={{
                width: '100%',
                maxWidth: isTablet ? '300px' : '400px',
                height: 'auto',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(186, 184, 108, 0.2)'
              }}
            />
          </Box>
        )}
      </Flex>
    </Container>
  );
}
export default HeroHeader;
