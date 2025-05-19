import { MantineProvider, Box } from "@mantine/core";
import { usePage } from "@inertiajs/react";

import NavHeader from "../Components/NavHeader";
import Footer from "../Components/Footer";

export default function UserLayout({ children }) {
    const { url } = usePage();
    const hideFooter = url.startsWith("/login") || url.startsWith("/register");


    return (
        <MantineProvider>
            <Box mx="xl">
                <header>
                    <NavHeader />
                </header>

                <main>{children}</main>
                {!hideFooter && (
                    <footer>
                        <Footer />
                    </footer>
                )}
            </Box>
        </MantineProvider>
    );
}
