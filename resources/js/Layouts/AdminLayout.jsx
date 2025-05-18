import { MantineProvider } from "@mantine/core";
import AdminHeader from "../Components/AdminHeader";


export default function AdminLayout({ children }) {
    return (
        <MantineProvider>
            <header>
                <AdminHeader />
            </header>

        <main>{children}</main>
        </MantineProvider>
    );
}


