import { useState } from 'react'
import {
  Container,
  Col,
  Form,
  ListGroup,
  InputGroup,
  Button,
  Row,
} from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import './customers.css'
import { AsyncFzf } from 'fzf'
import { faker } from '@faker-js/faker'
import CustomerView from '../customer-view/CustomerView'

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

function _sanitizeSearch(search) {
  return search
    .replace(/\s+x.*/, '')
    .replace(/\s+/g, '')
    .replace(/-/g, '')
}

async function _searchCustomers(customers = [], search) {
  if (!search) {
    return customers
  }

  customers.forEach(
    (customer) =>
      (customer.searchString =
        customer.searchString ||
        [
          customer.name,
          _sanitizePhoneNumber(customer.phone),
          customer.email,
        ].join(' '))
  )
  const fzf = new AsyncFzf(customers, {
    selector: (item) => item.searchString,
  })
  const _entries = await fzf.find(_sanitizeSearch(search))
  return _entries.map((entry) => entry.item)
}

async function handleSearch(event, setDisplayedCustomers) {
  console.log(event.target.value)
  const _results = await _searchCustomers(_sampleCustomers, event.target.value)
  setDisplayedCustomers(_results)
}

const Customers = () => {
  const [displayedCustomers, setDisplayedCustomers] = useState(_sampleCustomers)

  const [displayCustomer, setDisplayedCustomer] = useState()

  function handleCustomerSelection(customer) {
    setDisplayedCustomer(customer)
  }

  return (
    <div className="m-0 p-0">
      <div className="d-flex">
        <Col className="customer-search border" xs={12} md={6} lg={6} xl={4}>
          <div className="search-form">
            <Form className="">
              <InputGroup className="p-3">
                <Form.Control
                  placeholder="Search Email & Phone Number"
                  aria-label="Search Email & Phone Number"
                  aria-describedby="basic-addon2"
                  onChange={(e) => handleSearch(e, setDisplayedCustomers)}
                />
                <Button variant="outline-secondary" id="button-addon2">
                  <BsSearch />
                </Button>
              </InputGroup>
            </Form>
          </div>
          <ListGroup>
            {displayedCustomers.map((customer) => (
              <ListGroup.Item
                className="border-start-0 border-end-0"
                action
                onClick={(e) => handleCustomerSelection(customer)}
                variant="light"
              >
                <Container className="d-flex">
                  <div className="block">
                    <div className="circle">
                      <p>{_getInitialsFromName(customer.name)}</p>
                    </div>
                  </div>
                  <Container className="flex-column ml-3 mt-4">
                    <div>
                      <span className="text-dark">{customer.name}</span>
                    </div>
                    <div>
                      <span className="text-muted">
                        {_friendlyFormatPhoneNumber(customer.phone)}
                      </span>
                    </div>
                  </Container>
                </Container>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
            {(displayCustomer && <CustomerView className="d-flex" customer={displayCustomer} />) ||
              'None Selected'}
      </div>
    </div>
  )
}

export default Customers

let _fakeCustomerCount = 100
const _sampleCustomers = []
while (_fakeCustomerCount--) {
  _sampleCustomers.push({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phone: _sanitizePhoneNumber(faker.phone.number()),
  })
}
// const _sampleCustomers = [
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Benjamin Hudgens',
// email: 'something@gmail.com',
// phone: '5125551212',
// },
// {
// name: 'Jane Doe',
// email: 'something@gmail.com',
// phone: '5551212',
// },
// {
// name: 'Jane Doe',
// email: 'something@gmail.com',
// phone: '5551212',
// },
// {
// name: 'Jane Doe',
// email: 'something@gmail.com',
// phone: '5551212',
// },
// {
// name: 'Jane Doe',
// email: 'something@gmail.com',
// phone: '5551212',
// },
// {
// name: 'Jane Doe',
// email: 'something@gmail.com',
// phone: '5551212',
// },
// {
// name: 'Jane Doe',
// email: 'something@gmail.com',
// phone: '5551212',
// },
// ]
