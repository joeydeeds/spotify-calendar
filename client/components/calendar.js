import React, { Component } from 'react'
import history from '../history'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from './list'

const now = new Date()
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const curMonth = monthNames[now.getMonth()]

const juneDates = [
  ['', '', '', '', '', 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
]

class Calendar extends Component {
  handleClick = (day, e) => {
    e.stopPropagation()
    history.push(`/create/${day}`)
  }
  handleClick2 = (id, e) => {
    e.stopPropagation()
    history.push(`/events/${id}`)
  }

  render() {
    const { events } = this.props
    return (
      <div className="container">
        <div className="top">
          <h3>{curMonth}</h3>
          <Link className="top-link" to="/events">
            Events
          </Link>
        </div>

        <div className="box">
          <table>
            <thead>
              <tr>
                <td>Sun</td>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
              </tr>
            </thead>
            <tbody>
              {juneDates.map((week, i) => {
                return (
                  <tr key={i}>
                    {week.map((day, i) => {
                      return (
                        <td
                          key={i}
                          day={day}
                          onClick={e => this.handleClick(day, e)}>
                          {day}
                          {events
                            .sort((a, b) => {
                              return a.startTime > b.startTime
                            })
                            .map((item, i) => {
                              if (day === +item.date.slice(8)) {
                                return (
                                  <div key={i} className="events">
                                    <span
                                      className="event"
                                      onClick={e =>
                                        this.handleClick2(item.id, e)
                                      }
                                      day={item}>
                                      &bull;{item.title} @ {item.startTime}
                                    </span>
                                  </div>
                                )
                              }
                            })}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.event,
})

export default connect(
  mapStateToProps,
  null
)(Calendar)
