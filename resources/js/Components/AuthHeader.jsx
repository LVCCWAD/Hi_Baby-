// import { Inertia } from "@inertiajs/inertia";
// import { useState, useEffect } from "react";

// import {
//   IconBook,
//   IconChartPie3,
//   IconChevronDown,
//   IconCode,
//   IconCoin,
//   IconFingerprint,
//   IconNotification,
//   IconSearch,
//   IconShoppingCart,
//   IconUser,
//   IconBell,
// } from "@tabler/icons-react";
// import {
//   Flex,
//   Box,
//   Burger,
//   Button,
//   Center,
//   Collapse,
//   Divider,
//   Drawer,
//   Group,
//   ScrollArea,
//   Text,
//   ThemeIcon,
//   UnstyledButton,
//   useMantineTheme,
//   ActionIcon,
//   Autocomplete,
// } from "@mantine/core";
// import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
// import Logo from "../Assets/Logo.png";
// import classes from "../../css/Components/GuestHeader.module.css";

// const mockdata = [
//   {
//     icon: IconCode,
//     title: "Open source",
//     description: "This Pokémon’s cry is very loud and distracting",
//   },
//   {
//     icon: IconCoin,
//     title: "Free for everyone",
//     description: "The fluid of Smeargle’s tail secretions changes",
//   },
//   {
//     icon: IconBook,
//     title: "Documentation",
//     description: "Yanma is capable of seeing 360 degrees without",
//   },
//   {
//     icon: IconFingerprint,
//     title: "Security",
//     description: "The shell’s rounded shape and the grooves on its.",
//   },
//   {
//     icon: IconChartPie3,
//     title: "Analytics",
//     description: "This Pokémon uses its flying ability to quickly chase",
//   },
//   {
//     icon: IconNotification,
//     title: "Notifications",
//     description: "Combusken battles with the intensely hot flames it spews",
//   },
// ];

// function AuthHeader() {
//   const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
//     useDisclosure(false);
//   const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
//   const theme = useMantineTheme();

//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState([]);

//   const [debouncedQuery] = useDebouncedValue(query, 300);

//   useEffect(() => {
//     if (debouncedQuery.length === 0) {
//       setProducts([]);
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           `/api/products/search?q=${encodeURIComponent(debouncedQuery)}`
//         );
//         const text = await res.text();
//         const names = text.split("\n").filter(Boolean);
//         setProducts(names.map((name, idx) => ({ id: idx, name })));
//       } catch (err) {
//         console.error("Search failed:", err);
//       }
//     };

//     fetchProducts();
//   }, [debouncedQuery]);

//   const links = mockdata.map((item) => (
//     <UnstyledButton className={classes.subLink} key={item.title}>
//       <Group wrap="nowrap" align="flex-start">
//         <ThemeIcon size={34} variant="default" radius="md">
//           <item.icon size={22} color={theme.colors.blue[6]} />
//         </ThemeIcon>
//         <div>
//           <Text size="sm" fw={500}>
//             {item.title}
//           </Text>
//           <Text size="xs" c="dimmed">
//             {item.description}
//           </Text>
//         </div>
//       </Group>
//     </UnstyledButton>
//   ));

//   const handleLogout = () => {
//     Inertia.post(
//       "/logout",
//       {},
//       {
//         onSuccess: () => {
//           window.location.href = "/login";
//         },
//       }
//     );
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (query.trim().length === 0) return;
//     // Using window.location for now; change to Inertia.visit if you want SPA navigation
//     window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
//   };

//   // We must ensure pressing Enter submits the form because Mantine Autocomplete may swallow the event
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       // Prevent Autocomplete internal default, then submit
//       event.preventDefault();
//       handleSubmit(event);
//     }
//   };

//   return (
//     <Box pb={30} bg="#FBF2E9">
//       <header className={classes.header}>
//         <Group justify="space-between" h="100%">
//           <img src={Logo} alt="Logo" className={classes.logo} />
//           <Group h="100%" gap={0} visibleFrom="sm">
//             <a href="#" className={classes.link}>
//               Collection
//             </a>
//             {/* <a href="/about-us" className={classes.link}>
//               About Us
//             </a> */}
//           </Group>

//           {/* <form
//             onSubmit={handleSubmit}
//             className={classes.search}
//             style={{ display: "flex", alignItems: "center" }}
//           >
//             <Autocomplete
//               placeholder="Search products..."
//               data={products.map((p) => p.name)}
//               value={query}
//               onChange={setQuery}
//               limit={10}
//               onKeyDown={handleKeyDown}
//               style={{ flexGrow: 1 }}
//             />
//             <ActionIcon
//               type="submit"
//               aria-label="Search"
//               size="lg"
//               variant="filled"
//               color="blue"
//               sx={{ marginLeft: 8 }}
//             >
//               <IconSearch size={20} />
//             </ActionIcon>
//           </form> */}

//           <Flex
//             visibleFrom="sm"
//             w={300}
//             justify="space-between"
//             align="center"
//           >
//             <IconBell size={16} stroke={1.5} />
//             <IconShoppingCart size={16} stroke={1.5} />
//             <IconUser size={16} stroke={1.5} />
//             <Button
//               component="a"
//               href="/login"
//               bg="#abc32f"
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </Flex>

//           <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
//         </Group>
//       </header>

//       <Drawer
//         opened={drawerOpened}
//         onClose={closeDrawer}
//         size="100%"
//         padding="md"
//         title="Navigation"
//         hiddenFrom="sm"
//         zIndex={1000000}
//       >
//         <ScrollArea h="calc(100vh - 80px" mx="-md">
//           <Divider my="sm" />
//           <UnstyledButton className={classes.link} onClick={toggleLinks}>
//             <Center inline>
//               <Box component="span" mr={5}>
//                 Collection
//               </Box>
//               <IconChevronDown size={16} color={theme.colors.blue[6]} />
//             </Center>
//           </UnstyledButton>
//           <Collapse in={linksOpened}>{links}</Collapse>
//           <a href="#" className={classes.link}>
//             About Us
//           </a>

//           <Divider my="sm" />

//           <Group justify="center" grow pb="xl" px="md">
//             <IconShoppingCart size={16} stroke={1.5} />
//             <IconUser size={16} stroke={1.5} />
//           </Group>
//         </ScrollArea>
//       </Drawer>
//     </Box>
//   );
// }

// export default AuthHeader;
