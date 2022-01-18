import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container >
                <Navbar.Brand href="#home" style={{fontFamily:'Times New Roman', fontSize:'30px'}}>EZBill</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="navv" href="/home" style={{fontFamily:'Times New Roman'}}>Home</Nav.Link>
                        <Nav.Link href="/dashboard" style={{fontFamily:'Times New Roman'}}>Analysis</Nav.Link>
                        <Nav.Link href="/wallet" style={{fontFamily:'Times New Roman'}}>Wallet</Nav.Link>
                        <Nav.Link href="/recommendations" style={{fontFamily:'Times New Roman'}}>Recommendations</Nav.Link>
                        <Nav.Link href="/reminders" style={{fontFamily:'Times New Roman'}}>Reminders</Nav.Link>
                        <Nav.Link href="/ico" style={{fontFamily:'Times New Roman'}}>ICO</Nav.Link>
                        {/* <Nav.Link href="/recommendations">Recommendations</Nav.Link>
                        <NavDropdown title="Reminders" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/reminders">-Add Reminder</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar