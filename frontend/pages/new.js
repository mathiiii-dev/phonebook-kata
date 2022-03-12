import {Button, Col, Container, Form, Row, Alert} from "react-bootstrap";
import {useState} from "react";

export default function New() {

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const register = async event => {
        event.preventDefault()

        const res = await fetch(
            ' http://localhost:8010/proxy/phonebook/register',
            {
                body: JSON.stringify({
                    firstname: event.target.firstname.value,
                    lastname: event.target.lastname.value,
                    phonenumber: event.target.phonenumber.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json()

        if(result.status === 400) {
            setShow(true)
            setErrorMessage(result.error_description)
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    {
                        show ?
                            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>
                                    {errorMessage}
                                </p>
                            </Alert>
                            : ''
                    }
                    <Form onSubmit={register}>
                        <Form.Group className="mb-3" controlId="form.firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="John" name="firstname" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Doe" name="lastname" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.phonenumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="+39 02 1234567" name="phonenumber" required/>
                        </Form.Group>
                        <Button variant="primary" type={"submit"}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
