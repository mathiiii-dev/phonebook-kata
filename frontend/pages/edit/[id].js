import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Edit({phone}) {
    console.log(phone)
    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="form.firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="John" name="firstname" required value={phone.firstname}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Doe" name="lastname" required value={phone.lastname}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.phonenumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="+39 02 1234567" name="phonenumber" required value={phone.phoneNumber}/>
                        </Form.Group>
                        <Button variant="primary" type={"submit"}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8010/proxy/phonebook');
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
    const phone = await fetch(`http://localhost:8010/proxy/phonebook/${params.id}`).then(r => r.json())
    return {
        props: {
            phone
        }
    }
}
