import { Menu } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";

function CollectionDropdown() {
    const pillItemStyle = {
        borderRadius: 999,
        border: "1px solid #b4b472",
        color: "#6a6a00",
        padding: "8px 16px",
        margin: "4px 0",
        fontWeight: 500,
        backgroundColor: "white",
        textAlign: "center",
        transition: "color 0.3s, border-color 0.3s, background-color 0.3s",

        "&:hover": {
            color: "#4caf50", // lime[7] approx
            borderColor: "#4caf50",
            backgroundColor: "#f5f5f5",
        },
    };

    const dropdownStyle = {
        dropdown: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
        },
    };

    return (
        <Menu shadow="md" width={220} withArrow offset={5}>
            <Menu.Target>
                <div
                    style={{
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "black",
                    }}
                >
                    Collection
                </div>
            </Menu.Target>

            {/* First level dropdown */}
            <Menu.Dropdown styles={dropdownStyle}>
                {/* Boys Submenu */}
                <Menu trigger="hover" position="right-start" offset={5}>
                    <Menu.Target>
                        <Menu.Item
                            rightSection={<IconChevronRight size={14} />}
                            style={pillItemStyle}
                        >
                            Boys
                        </Menu.Item>
                    </Menu.Target>
                    <Menu.Dropdown styles={dropdownStyle}>
                        <Menu.Item
                            component={Link}
                            href="/collection/boys/jackets"
                            style={pillItemStyle}
                        >
                            Jackets and Sweaters
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            href="/collection/boys/pants"
                            style={pillItemStyle}
                        >
                            Pants and Jeans
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            href="/collection/boys/pajamas"
                            style={pillItemStyle}
                        >
                            Pajamas
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            href="/collection/boys/suits"
                            style={pillItemStyle}
                        >
                            Suits
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                {/* Girls Submenu */}
                <Menu trigger="hover" position="right-start" offset={5}>
                    <Menu.Target>
                        <Menu.Item
                            rightSection={<IconChevronRight size={14} />}
                            style={pillItemStyle}
                        >
                            Girls
                        </Menu.Item>
                    </Menu.Target>
                    <Menu.Dropdown styles={dropdownStyle}>
                        <Menu.Item
                            component={Link}
                            href="/collection/girls/dresses"
                            style={pillItemStyle}
                        >
                            Dresses
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            href="/collection/girls/skirts"
                            style={pillItemStyle}
                        >
                            Tops and Skirts
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            href="/collection/girls/pajamas"
                            style={pillItemStyle}
                        >
                            Pajamas
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            href="/collection/girls/gowns"
                            style={pillItemStyle}
                        >
                            Gowns
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Menu.Dropdown>
        </Menu>
    );
}

export default CollectionDropdown;
