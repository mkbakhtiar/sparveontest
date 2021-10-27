import React, { Fragment, useState, useEffect } from 'react'
import {
    Button, Jumbotron, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
} from 'reactstrap';



import axios from 'axios'
// import { AuthContext } from '../App'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom';
const api = 'http://localhost:3001'

function DashboardComponent() {
    const initialState = {
        username: '',
    }

    const [data, setData] = useState(initialState)

    useEffect(() => {
        axios.get(api + '/show/' + localStorage.getItem('user'))
            .then(res => {
                setData({
                    ...data,
                    username: res.data.values[0].username
                })
            })
    }, []);

    return (
        <Container>
            <Row className="justify-content-center" style={{ marginTop: '50px' }}>
                <Col xs="5" sm="4" md="9" lg="9" xl="9">
                    <Jumbotron>
                        <h1 className="display-3">Dear {data.username},</h1>
                        <p className="lead">Thank you for your interest in joining the Sparveon Front End Developer Internship Program.</p>
                        <hr className="my-2" />
                        <p>If you have any questions about the test, please do not hesitate to reach us via email..</p>
                        <p className="lead">
                            <a href="mailto:careers@sparveon.com" target="_blank" className="btn btn-primary">Send Email</a>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row className="justify-content-center" style={{ marginTop: '50px' }}>
                <Col xs="5" sm="4" md="9" lg="9" xl="9">
                    <Row>
                        <Col>
                            <Card>
                                <CardImg top width="100%" src="https://sparveon.com/wp-content/uploads/2020/12/Sparveon_FORCE2020.png" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">SPARVEON WINS THE FORCE 2020</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">FAULT MAPPING ON SEISMIC COMPETITION</CardSubtitle>
                                    <CardText>Sparveon was crowned as the champion of the FORCE 2020: Fault Mapping on Seismic Competition...</CardText>
                                    <a href="https://www.npd.no/en/force/Previous-events/results-of-the-force-2020-fault-mapping-on-seismic-competition/" className="btn btn-dark" target="_blank">Read More</a>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardImg top width="100%" src="https://sparveon.com/wp-content/uploads/2020/12/Sparveon_ExploreSA2020.png" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">SPARVEON RECEIVED STUDENT PRIZE AWARD</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">IN THE EXPLORESA: THE GAWLER CHALLENGE 2020</CardSubtitle>
                                    <CardText>Sparveon took out the Student Prize Award and received AU$20,000 in the ExploreSA: The Gawler Challenge 2020...</CardText>
                                    <a href="https://unearthed.solutions/news/exploresa-gawler-challenge-winners-announced" className="btn btn-dark" target="_blank">Read More</a>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardImg top width="100%" src="https://sparveon.com/wp-content/uploads/2020/12/copernicus-1568x709.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">SPARVEON NAMED AS THE FINALIST</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">OF THE COPERNICUS MASTER 2019: AIRBUS – SOBLOO MULTI-DATA CHALLENGE</CardSubtitle>
                                    <CardText>Airbus and Sobloo were looking for solutions that provide insight and have impact on areas like...</CardText>
                                    <a href="https://www.airbus.com/newsroom/press-releases/en/2019/10/airbus-and-sobloo-announce-finalists-of-multidata-challenge-within-copernicus-masters-2019.html" className="btn btn-dark" target="_blank">Read More</a>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>


            </Row>

        </Container>
    )
}

export default DashboardComponent
