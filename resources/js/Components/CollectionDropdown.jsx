import { Menu, Button } from "@mantine/core";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Link, usePage } from "@inertiajs/react";
import styled from "styled-components";

const PillItemStyle = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
    color: #212529;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
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
  const { categories } = usePage().props;

  const boysCategories = categories.filter(
    (category) => category.gender && category.gender.toLowerCase() === "boy"
  );
  const girlsCategories = categories.filter(
    (category) => category.gender && category.gender.toLowerCase() === "girl"
  );

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
        <Menu trigger="hover" position="right-start" offset={5}>
          <Menu.Target>
            <Menu.Item rightSection={<IconChevronRight size={14} />} component={PillItemStyle}>
              Boys
            </Menu.Item>
          </Menu.Target>

          <Menu.Dropdown styles={dropdownStyle}>
            {boysCategories.map((category) => (
              <Menu.Item key={category.id}>
                <StyledLink href={`/collection/boys/${category.name.toLowerCase().replace(/ & /g, 'and').replace(/ /g, '-')}`}>
                  <PillItemStyle>{category.name}</PillItemStyle>
                </StyledLink>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        <Menu trigger="hover" position="right-start" offset={5}>
          <Menu.Target>
            <Menu.Item rightSection={<IconChevronRight size={14} />} component={PillItemStyle}>
              Girls
            </Menu.Item>
          </Menu.Target>

          <Menu.Dropdown styles={dropdownStyle}>
            {girlsCategories.map((category) => (
              <Menu.Item key={category.id}>
                <StyledLink href={`/collection/girls/${category.name.toLowerCase().replace(/ & /g, 'and').replace(/ /g, '-')}`}>
                  <PillItemStyle>{category.name}</PillItemStyle>
                </StyledLink>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Menu.Dropdown>
    </Menu>
  );
}

export default CollectionDropdown;
