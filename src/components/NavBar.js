import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'
import ShowModal from './ShowModal';
import Logo from "./Logo"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavBar = ({ loginUser, signUpUser, currentUser, logoutUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <>
      {show ? <ShowModal show={show} toggleShow={toggleShow} loginUser={loginUser} signUpUser={signUpUser} /> : null}
      <Navbar sticky="top" style={{backgroundColor:"rgb(255, 255, 255)",borderBottom:"1px solid lightgrey"}} light expand="sm">
        <NavbarBrand tag={Link} to="/" style={{marginLeft:"45px",cursor:"pointer"}}>
          <Logo />
          <span style={{borderLeft:"1px solid black",margin:"0 20px"}}></span>
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" width="100" alt="instagram" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" onClick={toggle} navbar>
            {
              currentUser ?
                <>
                  <NavItem className="mr-2">
                    <NavLink tag={Link} to="/upload"><svg aria-label="Find People" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M24 .5C37 .5 47.5 11 47.5 24S37 47.5 24 47.5.5 37 .5 24 11 .5 24 .5zm0 44c11.3 0 20.5-9.2 20.5-20.5S35.3 3.5 24 3.5 3.5 12.7 3.5 24 12.7 44.5 24 44.5zm-4.4-23.7c.3-.5.7-.9 1.2-1.2l14.8-8.1c.3-.1.6-.1.8.1.2.2.3.5.1.8l-8.1 14.8c-.3.5-.7.9-1.2 1.2l-14.8 8.1c-.3.1-.6.1-.8-.1-.2-.2-.3-.5-.1-.8l8.1-14.8zm6.2 5l4.3-7.8-7.8 4.3 3.5 3.5z" fillRule="evenodd"></path></svg></NavLink>
                  </NavItem>
                  <NavItem className="mr-2">
                    <NavLink href="#"><svg aria-label="Activity Feed" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z" fillRule="evenodd"></path></svg></NavLink>
                  </NavItem>
                  <NavItem className="mr-2">
                    <NavLink tag={Link} to="/profile"><svg aria-label="Profile" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M24 27c-7.1 0-12.9-5.8-12.9-12.9s5.8-13 12.9-13c7.1 0 12.9 5.8 12.9 12.9S31.1 27 24 27zm0-22.9c-5.5 0-9.9 4.5-9.9 9.9s4.4 10 9.9 10 9.9-4.5 9.9-9.9-4.4-10-9.9-10zm20 42.8c-.8 0-1.5-.7-1.5-1.5V42c0-5-4-9-9-9h-19c-5 0-9 4-9 9v3.4c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V42c0-6.6 5.4-12 12-12h19c6.6 0 12 5.4 12 12v3.4c0 .8-.7 1.5-1.5 1.5z"></path></svg></NavLink>
                  </NavItem>
                  <NavItem className="mr-5">
                    <NavLink href="#" onClick={logoutUser} ><ExitToAppIcon style={{color:"black"}}/></NavLink>
                  </NavItem>
                </>
                :
                <NavItem>
                  <NavLink href="#" onClick={toggleShow} >Login/Sign up</NavLink>
                </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;