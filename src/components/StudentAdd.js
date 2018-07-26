import React, { Component } from 'react'
import client from '../feathers'

class StudentAdd extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleClick = this.handleClick.bind(this)
    this.updateField = this.updateField.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  updateField(name, ev) {
    this.setState({ [name]: ev.target.value })
  }
  handleClick(e) {
    e.preventDefault()
    this.setState({ open: true })
  }
  handleAdd(e) {
    e.preventDefault()
    const { id, name, pinyinName, englishName } = this.state
    client
      .service('students')
      .create({
        id,
        name,
        pinyinName,
        englishName,
        classId: this.props.groupId
      })
      .then(res => {
        console.log(res)
        this.setState({ open: false })
      })
  }
  handleCancel(e) {
    e.preventDefault()
    this.setState({
      open: false,
      id: null,
      name: null,
      pinyinName: null,
      englishName: null
    })
  }

  render() {
    if (!this.state.open) {
      return <button onClick={this.handleClick}>+ Add a student</button>
    }
    return (
      <form>
        <fieldset>
          <label htmlFor="nameField">Name</label>
          <input
            type="text"
            onChange={ev => this.updateField('name', ev)}
            id="nameField"
          />
          <label htmlFor="pinyinField">Pinyin Name</label>
          <input
            type="text"
            id="pinyinField"
            onChange={ev => this.updateField('pinyinName', ev)}
          />
          <label htmlFor="englishField">English Name</label>
          <input
            type="text"
            id="englishField"
            onChange={ev => this.updateField('englishName', ev)}
          />
          <label htmlFor="idField">Student ID</label>
          <input
            type="text"
            id="idField"
            onChange={ev => this.updateField('id', ev)}
          />
          <button onClick={this.handleAdd} className="button">
            Add
          </button>
          &nbsp;
          <button onClick={this.handleCancel} className="button-clear">
            Cancel
          </button>
        </fieldset>
      </form>
    )
  }
}

export default StudentAdd
