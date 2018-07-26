import React, { Component } from 'react'
import client from '../feathers'
import { withRouter } from 'react-router-dom'

const styles = {
  backgroundColor: '#ffaaaa',
  padding: '1rem'
}
class ClassDelete extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.askConfirm = this.askConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  askConfirm() {
    this.setState({ open: true })
  }
  handleCancel() {
    this.setState({ open: false })
  }
  handleDelete() {
    client
      .service('classes')
      .remove(this.props.groupId)
      .then(res => {
        console.log(res)
        this.setState({ open: false })
        this.props.history.push('/classes')
      })
  }
  render() {
    if (!this.state.open) {
      return <button onClick={this.askConfirm}>&times; Delete class</button>
    }
    console.log(this.props.groupId)
    return (
      <div style={styles}>
        <p>Are you sure you wish to delete this class?</p>
        <button onClick={this.handleDelete} className="button-clear">
          I'm sure. Delete it.
        </button>&nbsp;<button onClick={this.handleCancel}>Cancel</button>
      </div>
    )
  }
}

export default withRouter(ClassDelete)
