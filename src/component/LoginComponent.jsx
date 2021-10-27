import React, { useContext, useState } from 'react'
import { Button, Form, Row, Col, FormGroup, Label, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import axios from 'axios'
import { AuthContext } from '../App'
import { CardImg } from 'react-bootstrap';

const api = 'http://localhost:3001'


function LoginComponent(props) {

    const { dispatch } = useContext(AuthContext)

    const initialState = {
        username: '',
        password: '',
        isSubmit: false,
        errorMsg: null
    }

    const [data, setData] = useState(initialState)

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        setData({
            ...data,
            isSubmit: true,
            errorMsg: null
        })

        const requestBody = {
            username: data.username,
            password: data.password,
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        axios.post(api + '/auth/api/v1/login', requestBody, config)
            .then(res => {
                if (res.data.success === true) {
                    dispatch({
                        type: "LOGIN",
                        payload: res.data
                    })

                    props.history.push("/dashboard")

                } else {
                    setData({
                        ...data,
                        isSubmit: false,
                        errorMsg: res.data.Message
                    })
                }

                throw res
            })
    }

    return (
        <Container>
            <Row className="justify-content-center" style={{marginTop:'100px'}}>
                <Col className="align-me" xs="5" sm="4" md="3" lg="3" xl="3">

                    <CardImg width="100%" src="https://pbs.twimg.com/profile_images/1182025846803951617/g5KcnuNw.jpg" />
                </Col>
                <Col className="align-me" xs="5" sm="4" md="3" lg="3" xl="3">
                <h4>Login</h4>
                <hr />
                    <Form onSubmit={handleFormSubmit} style={{marginTop:'20px'}}>
                        <FormGroup>
                            <Label for="exampleEmail">Username</Label>
                            <Input type="email" value={data.username} required onChange={handleInputChange} name="username" id="exampleEmail" placeholder="example@domain.com" />
                        </FormGroup>
                        <FormGroup style={{marginTop:'20px'}}>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password"  value={data.password} required onChange={handleInputChange} name="password" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>

                        {data.errorMsg && (
                            <div className="alert alert-danger" role="alert" style={{marginTop:'25px'}}>
                                {data.errorMsg}
                            </div>
                        )}

                        <Button disabled={data.isSubmit} style={{marginTop:'20px', width:'100%'}}>
                            {data.isSubmit ? ("Proses Login...") : ("Login")}
                        </Button>
                        <p style={{marginTop:'10px', textAlign:'center'}}>Belum punya akun? <Link to="/register">Register</Link></p>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <p className="text-center" style={{marginTop:'100px',color:'gray', fontSize:'13px'}}>&copy; Copyright 2021 By Muhammad Khoirul Bakhtiar | Thanks <a href="https://sparveon.com" target="_blank">Sparveon.com</a>  for Intership Recruitment Test</p>
            </Row>
        </Container>
    )
}

export default LoginComponent
