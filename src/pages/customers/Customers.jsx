import { useState } from 'react'
import {
    Container,
    Col,
    Form,
    ListGroup,
    InputGroup,
    Button,
} from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import './customers.css'
import { Fzf } from 'fzf'

function _getInitialsFromName(name) {
    const _firstLetter = name.slice(0, 1).toUpperCase()
    const _lastLetter = name.replace(/.*\s+/, '').slice(0, 1).toUpperCase()
    return _firstLetter + _lastLetter
}

function _friendlyFormatPhoneNumber(phoneNumber) {
    let _formattedNumber = phoneNumber
    if (phoneNumber.length === 10) {
        _formattedNumber = [
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

function _searchCustomers(customers = [], search) {
    if (!search) {
        return customers
    }
    return ['name', 'phone', 'email']
        .map((selector) => {
            const fzf = new Fzf(customers, {
                selector: (item) => item[selector],
            })
            const _entries = fzf.find(search)
            const _wordEntries = search
                .split(' ')
                .filter(Boolean)
                .map((word) => fzf.find(word))
            return [[_entries], _wordEntries]
                .reduce((ret, cur) => ret.concat(cur), [])
                .reduce((ret, cur) => ret.concat(cur), [])
                .map((entry) => entry.item)
                .filter(
                    (value, index, self) =>
                        index ===
                        self.findIndex(
                            (t) =>
                                t.name === value.name &&
                                t.phone === value.phone &&
                                t.email === value.email
                        )
                )
        })
        .reduce((ret, cur) => ret.concat(cur), [])
}

function handleSearch(event, setDisplayedCustomers) {
    console.log(event.target.value)
    const _results = _searchCustomers(_sampleCustomers, event.target.value)
    setDisplayedCustomers(_results)
}

const Customers = () => {
    const [displayedCustomers, setDisplayedCustomers] =
        useState(_sampleCustomers)

    return (
        <Container className="m-0 p-0">
            <Col className="border border-bottom-0" xs={4}>
                <Form className="mt-3">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search Email & Phone Number"
                            aria-label="Search Email & Phone Number"
                            aria-describedby="basic-addon2"
                            onChange={(e) =>
                                handleSearch(e, setDisplayedCustomers)
                            }
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            <BsSearch />
                        </Button>
                    </InputGroup>
                </Form>
                <ListGroup>
                    {displayedCustomers.map((customer) => (
                        <ListGroup.Item
                            className="border-start-0 border-end-0"
                            action
                            variant="light"
                        >
                            <Container className="d-flex">
                                <div className="block">
                                    <div className="circle">
                                        <p>
                                            {_getInitialsFromName(
                                                customer.name
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <Container className="flex-column ml-3 mt-4">
                                    <div>
                                        <span className="text-dark">
                                            {customer.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-muted">
                                            {_friendlyFormatPhoneNumber(
                                                customer.phone
                                            )}
                                        </span>
                                    </div>
                                </Container>
                            </Container>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Container>
    )
}

export default Customers

const _sampleCustomers = [
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Benjamin Hudgens',
        email: 'something@gmail.com',
        phone: '5125551212',
    },
    {
        name: 'Jane Doe',
        email: 'something@gmail.com',
        phone: '5551212',
    },
    {
        name: 'Jane Doe',
        email: 'something@gmail.com',
        phone: '5551212',
    },
    {
        name: 'Jane Doe',
        email: 'something@gmail.com',
        phone: '5551212',
    },
    {
        name: 'Jane Doe',
        email: 'something@gmail.com',
        phone: '5551212',
    },
    {
        name: 'Jane Doe',
        email: 'something@gmail.com',
        phone: '5551212',
    },
    {
        name: 'Jane Doe',
        email: 'something@gmail.com',
        phone: '5551212',
    },
]
