import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import process from "../../next.config";
import {useState} from "react";
import Link from 'next/link'

export default function Edit({phone}) {

    const [firstname, setFirstname] = useState(phone.firstname);
    const [lastname, setLastname] = useState(phone.lastname);
    const [phoneNumber, setPhoneNumber] = useState(phone.phoneNumber);
    const [show, setShow] = useState(false);
    const [showValid, setShowValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const edit = async event => {
        event.preventDefault()
        const res = await fetch(
            `${process.env.api}/phonebook/${phone.id}/edit`,
            {
                body: JSON.stringify({
                    firstname,
                    lastname,
                    phoneNumber,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH'
            }
        )

        if(res.status === 204) {
            setShowValid(true)
        } else {
            const result = await res.json();
            if(result.status === 400) {
                setShow(true)
                setErrorMessage(result.error_description)
            }
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <Link href="/">
                        <Button className="mb-3">Return home</Button>
                    </Link>
                    {
                        show ?
                            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>Error</Alert.Heading>
                                <p>
                                    {errorMessage}
                                </p>
                            </Alert>
                            : ''
                    }
                    {
                        showValid ?
                            <Alert variant="success" onClose={() => setShowValid(false)} dismissible>
                                <Alert.Heading>Success</Alert.Heading>
                                <p>
                                   Your entry has been edited
                                </p>
                            </Alert>
                            : ''
                    }
                    <Form onSubmit={edit}>
                        <Form.Group className="mb-3" controlId="form.firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="John" name="firstname" required value={firstname}
                                          onChange={(e) => setFirstname(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Doe" name="lastname" required value={lastname}
                                          onChange={(e) => setLastname(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.phonenumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="+39 02 1234567" name="phonenumber" required
                                          value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type={"submit"}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.api}/phonebook`);
    const data = await res.json();
    const paths = data.map(
        phone => {
            return {
                params: {
                    id: phone.id.toString()
                }
            }
        }
    )
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({params}) {
    const phone = await fetch(`${process.env.api}/phonebook/${params.id}`).then(r => r.json())
    return {
        props: {
            phone
        }
    }
}
