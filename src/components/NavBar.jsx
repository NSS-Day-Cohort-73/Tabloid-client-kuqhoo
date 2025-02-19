import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);

  return (
    <div>
      <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
          ✍️ Tabloid
        </NavbarBrand>
        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/posts">
                    Explore
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/subscriptions">
                    My Subscriptions
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    My Posts
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={RRNavLink} to="/posts/my">
                      View My Posts
                    </DropdownItem>
                    <DropdownItem tag={RRNavLink} to="/posts/create">
                      Create Post
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                {loggedInUser.roles.includes("Admin") && (
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/userprofiles">
                      User Profiles
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories">
                    Categories
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
