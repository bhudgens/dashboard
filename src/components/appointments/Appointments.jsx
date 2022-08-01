import { useCallback, useMemo, useState } from 'react'
import './appointments.css'
import { faker } from '@faker-js/faker'
import { Calendar, momentLocalizer, Views, DateLocalizer } from 'react-big-calendar'
import PropTypes from 'prop-types'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: "hi",
  },
  {
    id: 1,
    title: 'MS training',
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: "yo",
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: "hi", resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: "yo", resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

const Appointments = () => {
    const [myEvents, setEvents] = useState(events)
    const handleSelectSlot = useCallback(
    (all) => {
      console.log(all)
    },
    [setEvents]
  )
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2018, 0, 29),
      views: ['day', 'work_week', 'agenda'],
    }),
    []
  )
  return (
    <>
      <div className="calendar">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          onSelectSlot={handleSelectSlot}
          selectable
          dayLayoutAlgorithm={'no-overlap'}
          popup
          timeslots={8}
          step={15}
          views={views}
        />
      </div>
    </>
  )
}

export default Appointments

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

Appointments.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
