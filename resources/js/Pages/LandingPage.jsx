import { MantineProvider } from "@mantine/core";
import HeroHeader from "../Components/LandingPage/HeroHeader";
import FeatureSection from "../Components/LandingPage/FeatureSection";
import ProductCarousel from "../Components/LandingPage/ProductCarousel";

function LandingPage() {
    return (
        <MantineProvider bg="#FBF2E9">
            <HeroHeader />
            <FeatureSection />
            <ProductCarousel />
        </MantineProvider>
    );
}
export default LandingPage;
