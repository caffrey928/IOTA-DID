import React from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {  Link } from "react-router-dom";


export default function HomePage(){
    
    return(
        <div id="instruction">
            
            
               <Container fluid>    
                    <Row md={2} className='g-5 justify-content-md-center'>
                        <Col md={5} className="text-center text-md-right">
                            <Card className="custom-class" >
                                <Card.Body>
                                    <Card.Title>Create DID</Card.Title>
                                    <Card.Text>
                                        You can create a digital identity with verification method and get the correspond stronghold file.
                                    </Card.Text>
                                    <Link to ={'/createdid'} >
                                        <Button id='card_button'>Try It !</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="text-center text-md-right align-items-center d-flex">
                            <Card className='custom-class'>
                                <Card.Body>
                                <Card.Title> Add Verification Method </Card.Title>
                                <Card.Text>
                                    You can add customized verification method to your DID account.
                                </Card.Text>
                                <Link to ={'/addvm'} >
                                    <Button id='card_button' style={{marginTop:"24px"}}>Try It !</Button>
                                </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={5} className="text-center align-items-center">
                            <Card className='custom-class'>
                                <Card.Body>
                                <Card.Title> Get DID </Card.Title>
                                <Card.Text>
                                    You can get your DID account information, and download the stronghold file.
                                </Card.Text>
                                <Link to ={'/getdid'} >
                                    <Button id='card_button' style={{marginTop:"24px"}}>Try It !</Button>
                                </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="text-center text-md-right">     
                            <Card className='custom-class'>
                                <Card.Body>
                                <Card.Title>Get Verification Presentation </Card.Title>
                                <Card.Text>
                                     You need to upload the verification credential file and the challenge, so as to get verification presentation.
                                </Card.Text>
                                <Link to ={'/getvp'} >
                                    <Button id='card_button'>Try It !</Button>
                                </Link>
                                </Card.Body>
                             </Card>
                        </Col>
                    </Row>
                
          </Container>
        </div>)
}