import React, { Component } from 'react'
import client from '../feathers'
import StudentAdd from './StudentAdd'

class StudentList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  loadStudents(groupId) {
    client
      .service('students')
      .find({ query: { classId: groupId } })
      .then(res => {
        this.setState({ students: res.data })
        console.log(res)
      })
  }
  componentDidMount() {
    this.loadStudents(this.props.groupId)
  }
  render() {
    const { students } = this.state
    return (
      <div>
        <StudentAdd groupId={this.props.groupId} />
        {!students ? (
          <p>Loading...</p>
        ) : students.length === 0 ? (
          <p>No students in this class yet</p>
        ) : (
          <ul className="menu-list">
            {students.map(student => (
              <li key={student.id}>
                {student.id} {student.name} ({student.pinyinName})
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default StudentList
