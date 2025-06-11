import {
    MantineProvider,
    Box,
    Container,
    Stack,
    AppShell,
    useMantineTheme
} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import HeroHeader from "../Components/LandingPage/HeroHeader";
import FeatureSection from "../Components/LandingPage/FeatureSection";
import ProductCarousel from "../Components/LandingPage/ProductCarousel";

function LandingPage() {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

    return (
        <MantineProvider>
            <Box
                style={{
                    background: 'linear-gradient(135deg, #FBF2E9 0%, #F5EDD8 50%, #FBF2E9 100%)',
                    minHeight: '100vh',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative background elements */}
                <Box
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '-5%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(186, 184, 108, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '-10%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(186, 184, 108, 0.08) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />

                <AppShell
                    padding={0}
                    style={{
                        backgroundColor: 'transparent',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <Container
                        size="xl"
                        px={isMobile ? 'xs' : isTablet ? 'md' : 'xl'}
                        style={{ position: 'relative', zIndex: 2 }}
                    >
                        <Stack
                            spacing={isMobile ? 40 : isTablet ? 60 : 80}
                            py={isMobile ? 20 : 40}
                        >
                            {/* Hero Section */}
                            <Box
                                style={{
                                    paddingTop: isMobile ? '20px' : isTablet ? '40px' : '60px',
                                    paddingBottom: isMobile ? '20px' : '40px'
                                }}
                            >
                                <HeroHeader />
                            </Box>

                            {/* Features Section */}
                            <Box
                                py={isMobile ? 20 : isTablet ? 30 : 40}
                                // style={{
                                //     // backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                //     borderRadius: isMobile ? '16px' : '24px',
                                //     backdropFilter: 'blur(10px)',
                                //     border: '1px solid rgba(255, 255, 255, 0.2)',
                                //     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                                // }}
                            >
                                <FeatureSection />
                            </Box>

                            {/* Product Carousel Section */}
                            <Box
                                py={isMobile ? 20 : 40}
                                style={{
                                    marginTop: isMobile ? '20px' : '40px'
                                }}
                            >
                                <ProductCarousel />
                            </Box>
                        </Stack>
                    </Container>
                </AppShell>
            </Box>
        </MantineProvider>
    );
}
export default LandingPage;
