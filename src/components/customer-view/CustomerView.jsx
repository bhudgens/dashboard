import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './customer-view.css'
import { faker } from '@faker-js/faker'

function _getInitialsFromName(name) {
  const _firstLetter = name.slice(0, 1).toUpperCase()
  const _lastLetter = name.replace(/.*\s+/, '').slice(0, 1).toUpperCase()
  return _firstLetter + _lastLetter
}
let cityStateVisible = false

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

const CustomerView = ({ customer }) => {
  customer = customer || _fakecustomer
  const disabled = true
  const cityStateVisible = !!customer.city && !!customer.state
  return (
    <div className="pt-0 mt-0 p-3 m-3 w-100 overflow-auto">    
      <Container className="shadow mt-4 justify-content-middle align-items-middle">
      <Row className="d-flex">
        <Col xs={12}>
          <div className="d-flex position-relative justify-content-start align-items-center">
            <div className="block">
              <div className="circle">
                <p>{_getInitialsFromName(customer.name)}</p>
              </div>
            </div>
            <div className="m-3">
              <div>{customer.name}</div>
              <div>
                {_friendlyFormatPhoneNumber(
                  _sanitizePhoneNumber(customer.phone)
                )}
              </div>
              <div>{customer.email}</div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={5}>
          <hr />
        </Col>
        <Col className="text-center" xs={2}>
          <h5>Info</h5>
        </Col>
        <Col xs={5}>
          <hr />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFullName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...{ disabled }}
            type="text"
            placeholder="Full Name"
            defaultValue={customer.name}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            {...{ disabled }}
            type="phone"
            placeholder="Phone Number"
            defaultValue={customer.phone}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...{ disabled }}
            placeholder={disabled || '1234 Main St'}
            defaultValue={customer.email}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col xs={5}>
          <hr />
        </Col>
        <Col className="text-center" xs={2}>
          <h5>Notes</h5>
        </Col>
        <Col xs={5}>
          <hr />
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formGridNotes">
        <Form.Control
          {...{ disabled }}
          as="textarea"
          rows={7}
          placeholder={disabled || 'Notes about Customer'}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col xs={5}>
          <hr />
        </Col>
        <Col className="text-center" xs={2}>
          <h5>Address</h5>
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

export default CustomerView

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
