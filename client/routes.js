import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Calendar, Form, List, ListAll, UpdateForm } from './components'
import { getEvents } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    return (
      <Switch>
        <Route path="/create/:event" component={Form} />
        <Route path="/events/:event" component={List} />
        <Route path="/events/" component={ListAll} />
        <Route path="/update/:event" component={UpdateForm} />
        <Route component={Calendar} />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getEvents() {
    dispatch(getEvents())
  },
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Routes)
)
