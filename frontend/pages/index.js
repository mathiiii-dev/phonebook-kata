import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useState} from "react";
import Link from 'next/link'
import process from "../next.config";

export default function Home() {

    const [data, setData] = useState(null);

    const search = (event) => {
        event.preventDefault()
        fetch(`${process.env.api}/phonebook`)
            .then((res) => res.json())
            .then((data) => {
                data = data.filter(function (e) {
                    if(e.firstname.includes(event.target.search.value)) {
                        return e.firstname.includes(event.target.search.value)
                    }

                    if(e.lastname.includes(event.target.search.value)) {
                        return e.lastname.includes(event.target.search.value)
                    }

                    if(e.phoneNumber.includes(event.target.search.value)) {
                        return e.phoneNumber.includes(event.target.search.value)
                    }
                });
                setData(data)
            })
    }

    let rows = null;
    if(data) {
        rows = data.map((element) => (
            <tr key={element.id}>
                <td>{element.firstname}</td>
                <td>{element.lastname}</td>
                <td>{element.phoneNumber}</td>
                <td>
                    <Link href={`/edit/${element.id}`}>
                        <Button>Edit this entry</Button>
                    </Link>
                </td>
            </tr>
        ));
    }


  return (
    <Container>
        <Link href={'/new'}>
            <Button className="mt-5">Add new entry</Button>
        </Link>
        <Row className="mt-5">
            <Col>
                <Form onSubmit={search}>
                    <Form.Group className="mb-3" controlId="form.search">
                        <Form.Label>Phone number or Name</Form.Label>
                        <Form.Control type="text" placeholder="+39 02 1234567 or John Doe" name="search"/>
                    </Form.Group>
                    <Button variant="primary" type={"submit"}>Search</Button>
                </Form>
            </Col>
        </Row>
        {
            data ?
                <Row className="mt-5">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                :''

        }

    </Container>
  )
}
