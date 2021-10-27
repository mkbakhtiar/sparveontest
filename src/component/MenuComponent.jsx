import React, { useState, useContext  } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Button,
    NavbarText
} from 'reactstrap';

import { AuthContext } from '../App';

function MenuComponent() {
    const {dispatch} = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md" style={{paddingLeft:'25px',paddingRight:'25px'}}>
                <NavbarBrand href="/">Sparveon Test Application</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        {!localStorage.getItem('isAuth') ?
                        <NavbarText>V. 1.0.0</NavbarText>
                        :
                        <NavbarText>
                            <Button color="success"
                                onClick={() =>
                                    dispatch({
                                        type: "LOGOUT"
                                    })}>

                                LOGOUT

                            </Button>
                        </NavbarText>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MenuComponent
