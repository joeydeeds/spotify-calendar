import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'
import { getSingleEvent, deleteSingleEvent, updateSingleEvent } from '../store'
class List extends Component {
  constructor() {
    super()
  }

  handleDelete = id => {
    const { remove } = this.props
    remove(id)
  }

  handleUpdate = id => {
    history.push(`/update/${id}`)
  }

  render() {
    const { events } = this.props
    const id = this.props.match.params.event
    const ourEvent = events.find(item => item.id === +id)
    return (
      <div className="container ">
        {ourEvent ? (
          <div className="events-list">
            <h1 className="event-title">{ourEvent.title}</h1>
            <h3 className="event-item">date: {ourEvent.date}</h3>
            <h3 className="event-item">start: {ourEvent.startTime}</h3>
            <h3 className="event-item">end: {ourEvent.endTime}</h3>
            <h3 className="event-item">description: {ourEvent.description}</h3>
            <div
              className="delete"
              onClick={() => this.handleDelete(ourEvent.id)}>
              Delete
            </div>
            <div
              className="update"
              onClick={() => this.handleUpdate(ourEvent.id)}>
              Update
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.event,
})

const mapDispatchToProps = dispatch => ({
  get(event) {
    dispatch(getSingleEvent(event))
  },
  remove(event) {
    dispatch(deleteSingleEvent(event))
  },
  update(event) {
    dispatch(updateSingleEvent(event))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
