import React, { Component } from 'react'
import client from '../feathers'

class ClassAdd extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }
  updateField(name, ev) {
    this.setState({ [name]: ev.target.value })
  }
  getThisYear() {
    const now = new Date()
    return parseInt(
      now
        .getFullYear()
        .toString()
        .slice(2),
      10
    )
  }
  getYearRange() {
    const year = this.getThisYear()
    var yearRange = []
    for (var i = year - 8; i <= year + 1; i++) {
      yearRange.push(i)
    }
    return yearRange.reverse()
  }
  handleCancel(event) {
    event.preventDefault()
    this.setState({
      open: false,
      year: null,
      major: null,
      number: null
    })
  }
  handleAdd(event) {
    event.preventDefault()
    const { year, major, number } = this.state
    client
      .service('classes')
      .create({ year, major, number })
      .then(
        this.setState({
          open: false,
          year: null,
          major: null,
          number: null
        })
      )
  }
  render() {
    if (this.state.open) {
      const yearRange = this.getYearRange()
      const numberRange = [...Array(11).keys()].slice(1)
      return (
        <form>
          <fieldset>
            <label htmlFor="yearField">Year</label>
            <select
              onChange={ev => this.updateField('year', ev)}
              id="yearField"
              defaultValue={this.getThisYear()}
            >
              {yearRange.map(year => (
                <option value={year} key={year}>
                  20{year}
                </option>
              ))}
            </select>
            <label htmlFor="majorField">Major</label>
            <input
              type="text"
              id="majorField"
              onChange={ev => this.updateField('major', ev)}
            />
            <label htmlFor="numberField">Number</label>
            <select
              onChange={ev => this.updateField('number', ev)}
              id="numberField"
            >
              {numberRange.map(number => (
                <option value={number} key={number}>
                  {number}
                </option>
              ))}
            </select>
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
    return (
      <button onClick={() => this.setState({ open: true })}>
        + Add a class
      </button>
    )
  }
}

export default ClassAdd
