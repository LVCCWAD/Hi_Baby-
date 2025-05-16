import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider, Box } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
        <MantineProvider>
        <Notifications />
        <Box bg="#FBF2E9">
        <App {...props}/>
        </Box>

      </MantineProvider>

    )
  },
});
