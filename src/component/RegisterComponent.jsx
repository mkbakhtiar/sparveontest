import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, CardImg } from 'reactstrap';



import axios from 'axios'
// import { AuthContext } from '../App'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom';
const api = 'http://localhost:3001'

function RegisterComponent(props) {
    const initialState = {
        isSubmitting: false,
        errorMessage: null,
    }

    const stateForm = {
        username: "",
        password: ""
    }


    const [data, setData] = useState(initialState)
    const [dataform, setDataForm] = useState(stateForm)

    const handleInputChange = event => {
        setDataForm({
            ...dataform,
            [event.target.name]: event.target.value,
        })

    }

    const handleFormSubmit = event => {
        event.preventDefault()

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        const requestBody = {
            username: dataform.username,
            email: dataform.email,
            password: dataform.password
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post(api + '/auth/api/v1/register', requestBody, config)
            .then(res => {
                if (res.data.success === true && res.data.isRegistered === false) {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: "Daftar Berhasil, Silahkan Ke Menu Login!"
                    })

                    setDataForm({
                        ...dataform,
                        username: "",
                        email: "",
                        password: ""
                    })

                }
                else if (res.data.success === false && res.data.isRegistered === true) {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: "Email anda Telah terdaftar!"
                    })
                }
                else {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: res.data.Message
                    })
                }

                throw res
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <Container>
            <Row className="justify-content-center" style={{ marginTop: '100px' }}>
                <Col className="align-me" xs="5" sm="4" md="3" lg="3" xl="3">

                    <CardImg width="100%" src="https://cdn-icons-png.flaticon.com/512/3456/3456388.png" />
                </Col>
                <Col className="align-me" xs="5" sm="4" md="3" lg="3" xl="3">
                    <h4>Registrasi</h4>

                    <hr />

                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">Username</Label>
                            <Input
                                type="email"
                                onChange={handleInputChange}
                                name="username"
                                id="exampleEmail"
                                placeholder="example@domain.com"
                                value={dataform.username}
                                required
                            />
                        </FormGroup>
                        <FormGroup style={{ marginTop: '20px' }}>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                onChange={handleInputChange}
                                name="password"
                                id="examplePassword"
                                placeholder="Password anda"
                                value={dataform.password}
                                required
                            />
                        </FormGroup>

                        <FormGroup style={{ marginTop: '20px' }}>
                            {data.errorMessage && (
                                <div className="alert alert-success" role="alert">
                                    {data.errorMessage}
                                </div>
                            )}
                        </FormGroup>

                        <FormGroup style={{ marginTop: '20px' }}>
                            <Button className="btn btn-dark" disabled={data.isSubmitting} style={{ width: '100%' }}>
                                {data.isSubmitting ? (
                                    "Proses Register..."
                                ) :
                                    (
                                        "Register"
                                    )
                                }
                            </Button>
                        </FormGroup>
                    </Form>
                    <p style={{ marginTop: '10px', textAlign: 'center' }}>Sudah punya akun? <Link to="/">Login</Link></p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <p className="text-center" style={{ marginTop: '100px', color: 'gray', fontSize: '13px' }}>&copy; Copyright 2021 By Muhammad Khoirul Bakhtiar | Thanks <a href="https://sparveon.com" target="_blank">Sparveon.com</a>  for Intership Recruitment Test</p>
            </Row>
        </Container>
    )
}

export default RegisterComponent
