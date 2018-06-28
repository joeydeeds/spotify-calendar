import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../store'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      startTime: '',
      endTime: '',
      description: '',
      date: '',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { add } = this.props
    add(this.state)
  }

  componentWillMount() {
    const day = this.props.match.params.event
    if (day.length < 2) {
      this.setState({ date: `2018-06-0${day}` })
    } else {
      this.setState({ date: `2018-06-${day}` })
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
  events: state.events,
})

const mapDispatchToProps = dispatch => ({
  add(newEvent) {
    dispatch(addEvent(newEvent))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
