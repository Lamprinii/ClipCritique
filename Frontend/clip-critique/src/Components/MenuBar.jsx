import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from'react-bootstrap/Offcanvas';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from './Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from'@fortawesome/free-regular-svg-icons'
import {faFilm} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { UserContext } from '../App';
import unknownUserIcon from "./Images/unknownuser.png";
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Popup from 'reactjs-popup';

function MenuBar(){
  const {isAdmin,setIsAdmin} = useContext(UserContext);
  const {user, setUser} = useContext(UserContext);
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();

  const isUserAdmin = (user) => {
    const role = user.role;
    if(role === "ADMIN" ){
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (isLoggedIn) {
      setIsAdmin(isUserAdmin(user));
    }
  }, [user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  }

    return (


    <Navbar expand="lg" fixed="top" variant="light" className="rounded-pill m-1 p-0 navbar" >
          <Container fluid>
            <Navbar.Brand className='me-auto' as={Link} to="/"><img width="150"  className="Navbarlogo" src={logo}></img></Navbar.Brand>
            <Navbar.Toggle  data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><FontAwesomeIcon className="burger" icon={faFilm}/></Navbar.Toggle>
            <Navbar.Offcanvas id="offcanvasNavbar" 
              placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title className='ctitle'>
                  ClipCritique
                </Offcanvas.Title>
              </Offcanvas.Header>
                <Offcanvas.Body className='m-3'>
                    <Nav className="ms-auto gap-4 offcanvas-body " id='offcanvasNavbar'>
                      <Nav.Link as={Link} to="/">For You</Nav.Link>
                      <Nav.Link as={Link} to="/videolist" >All Videos</Nav.Link>
                      <Nav.Link as={Link} to="/" >Contact Us</Nav.Link>

                      {isLoggedIn && isAdmin && (
                        <>             
                          <NavDropdown title="Admin Panel" className='admin-panel-nav'>
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/users">Edit Users</Nav.Link>
                            </NavDropdown.Item>
                          </NavDropdown>              
                        </>
                      )}

                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            {isLoggedIn ? (
              <Popup trigger={<Nav.Link className='exlink rounded-pill'><a className='extext'>Profile</a><img className="fic pull-right navbar-text rounded-pill" src={unknownUserIcon}/></Nav.Link>}position='bottom center'>
              <div className="popupcontainer">
              

                <ul className='userlist'>         
                              <li 
                                className='useritem logout'
                                onClick = {handleLogout}
                              >
                                Log Out
                              </li>
                </ul>
              
              </div>
            </Popup>      


          ) : (
                <Nav.Link className='exlink rounded-pill' as={Link} to="/login">
                  <i className='extext'>Login</i>
                  <img className="fic pull-right navbar-text rounded-pill" src={unknownUserIcon}/></Nav.Link>              
          )}

        </Container>
    </Navbar>
    )
}

export default MenuBar;




