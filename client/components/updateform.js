import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSingleEvent } from '../store'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      title: '',
      startTime: '',
      endTime: '',
      description: '',
      date: '',
      loaded: false,
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { update } = this.props
    update(this.state, this.props.match.params.event)
  }

  componentDidMount() {
    const { events } = this.props
    const id = this.props.match.params.event
    const ourEvent = events.find(item => item.id === +id)
    if (ourEvent && this.state.loaded === false) {
      this.setState({
        id: id,
        title: ourEvent.title,
        startTime: ourEvent.startTime,
        endTime: ourEvent.endTime,
        description: ourEvent.description,
        date: ourEvent.date,
        loaded: true,
      })
    }
  }

  render() {
    return (
      <div className="container form">
        <h1>June</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={this.state.startTime}
            onChange={this.handleChange}
          />
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={this.state.endTime}
            onChange={this.handleChange}
          />
          <label>Descrip</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.event,
})

const mapDispatchToProps = dispatch => ({
  update(newEvent, id) {
    dispatch(updateSingleEvent(newEvent, id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
