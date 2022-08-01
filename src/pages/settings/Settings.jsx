import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap'
import './settings.css'
import { faker } from '@faker-js/faker'
import { BsPencil, BsPlus, BsPlusCircle } from 'react-icons/bs'
import { useState } from 'react'

function _getInitialsFromName(name) {
  const _firstLetter = name.slice(0, 1).toUpperCase()
  const _lastLetter = name.replace(/.*\s+/, '').slice(0, 1).toUpperCase()
  return _firstLetter + _lastLetter
}

function _friendlyFormatPhoneNumber(phoneNumber) {
  let _formattedNumber = phoneNumber
  if (phoneNumber.length === 11 && Number(_formattedNumber.slice(0, 1)) === 1) {
    _formattedNumber = [
      `+${phoneNumber.slice(0, 1)} `,
      `(${phoneNumber.slice(1, 4)}) `,
      phoneNumber.slice(4, 7),
      `-${phoneNumber.slice(7, 11)}`,
    ].join('')
  }
  if (phoneNumber.length === 10) {
    _formattedNumber = [
      `+1 `,
      `(${phoneNumber.slice(0, 3)}) `,
      phoneNumber.slice(3, 6),
      `-${phoneNumber.slice(6, 10)}`,
    ].join('')
  }
  if (phoneNumber.length === 7) {
    _formattedNumber = [
      phoneNumber.slice(0, 3),
      `-${phoneNumber.slice(3, 7)}`,
    ].join('')
  }
  return _formattedNumber
}

function _sanitizePhoneNumber(number) {
  return number
    .replace(/\)/g, '')
    .replace(/\(/g, '')
    .replace(/\./g, '')
    .replace(/\s+x.*/, '')
    .replace(/\s+/g, '')
    .replace(/-/g, '')
}

const Settings = ({ customer }) => {
  customer = customer || _fakecustomer
  const disabled = true
  const cityStateVisible = !!customer.city && !!customer.state

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="pt-0 mt-0 p-3 m-3 w-100 overflow-auto">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="shadow mt-4 justify-content-middle align-items-middle">
        <Row className="mb-3">
          <Col xs={5}>
            <hr />
          </Col>
          <Col className="text-center" xs={2}>
            <h5>Locations</h5>
          </Col>
          <Col xs={5}>
            <hr />
          </Col>
        </Row>
        <Row className="">
          <Col xs={12}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-middle">First Spot</td>
                  <td className="align-middle">555-555-1212</td>
                  <td className="align-middle text-end">
                    <span className="text-primary btn">
                    <BsPencil />
                    </span>
                    <span className="text-primary btn">
            <BsPlusCircle onClick={handleShow}/>
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
          </Col>
          <Col className="text-end btn text-primary" xs={1}>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={5}>
            <hr />
          </Col>
          <Col className="text-center" xs={2}>
            <h5>Staff</h5>
          </Col>
          <Col xs={5}>
            <hr />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First Spot</td>
                  <td>555-555-1212</td>
                  <td className="text-end">
                    <BsPencil />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={5}>
            <hr />
          </Col>
          <Col className="text-center" xs={2}>
            <h5>Location Address</h5>
          </Col>
          <Col xs={5}>
            <hr />
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            {...{ disabled }}
            placeholder={disabled || '1234 Main St'}
            defaultValue={customer.address1}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            {...{ disabled }}
            placeholder={disabled || 'Apartment, studio, or floor'}
            defaultValue={customer.address2}
          />
        </Form.Group>

        <Row className="mb-3">
          {cityStateVisible && (
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control {...{ disabled }} defaultValue={customer.city} />
            </Form.Group>
          )}

          {cityStateVisible && (
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control {...{ disabled }} defaultValue={customer.state} />
            </Form.Group>
          )}

          <Form.Group className="mb-3" as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control {...{ disabled }} defaultValue={customer.zipcode} />
          </Form.Group>
        </Row>

        <Button
          className={(disabled && 'd-none') || 'mb-3'}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Container>
    </div>
  )
}

export default Settings

const _fakecustomer = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address1: faker.address.streetAddress(),
  address2: faker.address.secondaryAddress(),
  zipcode: faker.address.zipCode(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
}
