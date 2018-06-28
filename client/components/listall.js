import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleEvent, deleteSingleEvent } from '../store'
import history from '../history'
class ListAll extends Component {
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
    return (
      <div className="container">
        {events
          .sort((a, b) => {
            return a.date > b.date
          })
          .map((item, i) => {
            return (
              <div className="events-list" key={i}>
                <h1 className="event-title">{item.title}</h1>
                <h3 className="event-item">date: {item.date}</h3>
                <h3 className="event-item">start: {item.startTime}</h3>
                <h3 className="event-item">end: {item.endTime}</h3>
                <h3 className="event-item">description: {item.description}</h3>
                <div
                  className="delete"
                  onClick={() => this.handleDelete(item.id)}>
                  Delete
                </div>
                <div
                  className="update"
                  onClick={() => this.handleUpdate(item.id)}>
                  Update
                </div>
              </div>
            )
          })}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListAll)
