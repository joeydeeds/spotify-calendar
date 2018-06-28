import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
// const ADD_EVENT = 'ADD_EVENT'
const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'

/**
 * INITIAL STATE
 */
const events = []

/**
 * ACTION CREATORS
 */
const getAllEvents = allEvents => ({ type: GET_ALL_EVENTS, allEvents })
const getEvent = eventId => ({ type: GET_SINGLE_EVENT, eventId })
const updateEvent = updatedEvent => ({ type: UPDATE_EVENT, updatedEvent })
const deleteEvent = deletedEvent => ({ type: DELETE_EVENT, deletedEvent })

/**
 * THUNK CREATORS
 */
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events')
    dispatch(getAllEvents(res.data || events))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`)
    dispatch(getEvent(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addEvent = newEvent => async dispatch => {
  try {
    const res = await axios.post('/api/events', newEvent)
    dispatch(getEvents(res.data))
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const updateSingleEvent = (updatedEvent, id) => async dispatch => {
  try {
    const res = await axios.put(`/api/events/${id}`, updatedEvent)
    dispatch(updateEvent(updatedEvent))
    await dispatch(getEvents())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}
export const deleteSingleEvent = id => async dispatch => {
  try {
    await axios.delete(`/api/events/${id}`)
    // dispatch(deleteEvent(deletedEvent))
    await dispatch(getEvents())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = events, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.allEvents
    case GET_SINGLE_EVENT:
      return [...state, action.newEvent]
    case DELETE_EVENT:
      return action.deletedEvent
    case UPDATE_EVENT:
      return action.updatedEvent
    default:
      return state
  }
}
