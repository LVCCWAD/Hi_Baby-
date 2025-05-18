import { MantineProvider } from "@mantine/core";
import NavHeader from "../Components/NavHeader";
import Footer from "../Components/Footer";


export default function UserLayout({ children }) {
    return (
        <MantineProvider>
            <header>
                <NavHeader />
            </header>

        <main>{children}</main>
<footer><Footer/></footer>
        </MantineProvider>
    );
}


