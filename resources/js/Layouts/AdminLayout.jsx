import { MantineProvider, Box } from "@mantine/core";
import AdminHeader from "../Components/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <MantineProvider>
            <Box mx="xl">

                <header>
                    <AdminHeader />
                </header>
                <main>{children}</main>
            </Box>
        </MantineProvider>
    );
}
