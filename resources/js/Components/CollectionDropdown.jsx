import { Menu } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import styled from "styled-components";

// ✅ Styled-components defined outside the component
const PillItemStyle = styled(Link)`
    border-radius: 999px;
    border: 1px solid #b4b472;
    color: #6a6a00;
    padding: 8px 16px;
    margin: 4px 0;
    font-weight: 500;
    background-color: white;
    text-align: center;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s;

    &:hover {
        color: #fbf2e9;
        border-color: #bab86c;
        background-color: #bab86c;
    }
`;

const DivStyle = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #333;
    text-decoration: none;
    transition: color 0.2s ease;
    padding: 10px;

    &:hover {
        color: #fbf2e9;
        background-color: #bab86c;
        border-radius: 20px;
    }
`;

function CollectionDropdown() {
    const dropdownStyle = {
        dropdown: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
        },
    };

    return (
        <Menu shadow="md" width={220} withArrow offset={5} trigger="hover">
            <Menu.Target>
                <DivStyle>Collection</DivStyle>
            </Menu.Target>

            <Menu.Dropdown styles={dropdownStyle}>
                {/* Boys Submenu */}
                <Menu trigger="hover" position="right-start" offset={5}>
                    <Menu.Target>
                        <Menu.Item
                            rightSection={<IconChevronRight size={14} />}
                            component={PillItemStyle}
                        >
                            Boys
                        </Menu.Item>
                    </Menu.Target>
                    <Menu.Dropdown styles={dropdownStyle}>
                        <Menu.Item
                            href="/collection/boys/jackets-and-sweaters"
                            component={PillItemStyle}
                        >
                            Jackets and Sweaters
                        </Menu.Item>
                        <Menu.Item
                            href="/collection/boys/pants"
                            component={PillItemStyle}
                        >
                            Pants and Jeans
                        </Menu.Item>
                        <Menu.Item
                            href="/collection/boys/pajamas"
                            component={PillItemStyle}
                        >
                            Pajamas
                        </Menu.Item>
                        <Menu.Item
                            href="/collection/boys/suits"
                            component={PillItemStyle}
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
                            component={PillItemStyle}
                        >
                            Girls
                        </Menu.Item>
                    </Menu.Target>
                    <Menu.Dropdown styles={dropdownStyle}>
                        <Menu.Item
                            href="/collection/girls/dresses"
                            component={PillItemStyle}
                        >
                            Dresses
                        </Menu.Item>
                        <Menu.Item
                            href="/collection/girls/skirts"
                            component={PillItemStyle}
                        >
                            Tops and Skirts
                        </Menu.Item>
                        <Menu.Item
                            href="/collection/girls/pajamas"
                            component={PillItemStyle}
                        >
                            Pajamas
                        </Menu.Item>
                        <Menu.Item
                            href="/collection/girls/gowns"
                            component={PillItemStyle}
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
