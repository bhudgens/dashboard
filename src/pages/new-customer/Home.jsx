import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./home.css";

const Home = (props) => {
  let cityStateVisible = false;
  return (
    <Container>
      <h3>New Customer</h3>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFullName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Full Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email Address" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          {cityStateVisible && (
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>
          )}

          {cityStateVisible && (
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
