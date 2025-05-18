import { MantineProvider } from "@mantine/core";
import HeroHeader from "../Components/HeroHeader";
import Footer from "../Components/Footer";

function LandingPage() {
    return (
        <MantineProvider>
            <HeroHeader />
        </MantineProvider>
    );
}
export default LandingPage;
