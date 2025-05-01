import { MantineProvider } from "@mantine/core";
import HeroHeader from "../Components/HeroHeader";
import GuestHeader from "../Components/GuestHeader";
import Footer from "../Components/Footer";

function LandingPage() {
    return (
        <MantineProvider>
            <GuestHeader />
            <HeroHeader />
            <Footer/>
        </MantineProvider>
    );
}
export default LandingPage;
