import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider, Box } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout";
import '../css/app.css'
import '../css/fonts.css'

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        page.default.layout =
            page.default.layout ||
            ((pageContent) => {
                if (name.startsWith("Admin/")) {
                    return <AdminLayout >{pageContent}</AdminLayout>;
                } else {
                    return <UserLayout>{pageContent}</UserLayout>;
                }
            });

        return page;
    },
    
    setup({ el, App, props }) {
        createRoot(el).render(
           
            <MantineProvider>
                <Box bg="#FBF2E9">
                <App {...props} />
                </Box>
            </MantineProvider>
            
            
        );
    },
});
