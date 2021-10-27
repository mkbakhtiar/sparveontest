import React, { Fragment } from 'react'
import { Button, Form, Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';

import axios from 'axios'
import { CardImg } from 'react-bootstrap';
const qs = require('querystring')
const api = 'http://localhost:3001'

function LoginComponent() {

    const dispatch = useContext(AuthContext)

    const initialState = {
        username: '',
        password: '',
        isSubmit: false,
        errorMsg: null
    }

    const [data, setData] = useState(initialState)

    const handleInputChange = event => {
        setData({
            ...state,
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
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(api = '/auth/api/v1/login', qs.stringify(requestBody, config))
            .then(res => {
                if (res.data.success === true) {
                    dispatch({
                        type: "LOGIN",
                        payload: res.data
                    })
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
        <Fragment>
            <Container>
                <br />
                <Row>
                    <Col>
                        <CardImg width="100%" src="https://sparveon.com/wp-content/themes/sparveon/images/sparveon_logo.png" />
                    </Col>
                    <Col>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input type="email" value={data.username} onChange={handleInputChange} name="username" id="exampleEmail" placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password"  value={data.password} onChange={handleInputChange} name="password" id="examplePassword" placeholder="password placeholder" />
                            </FormGroup>

                            {data.errorMsg && (
                                <div className="alert alert-danger" role="alert">    
                                    {data.errorMsg}
                                </div>
                            )}

                            <Button disabled={data.isSubmit}>
                                {data.isSubmit ? ("Proses Login...") : ("Login")}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default LoginComponent
