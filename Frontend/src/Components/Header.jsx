import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav.Link className="text-decoration-none text-light mx-2">User Registration</Nav.Link>
                    <Nav className="me-auto">
                        <Nav.Link className="text-decoration-none text-light mx-2">Home</Nav.Link>
                        <Nav.Link className="text-decoration-none text-light"></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header