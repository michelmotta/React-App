import React, { Component } from 'react';
import {Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import axios from 'axios';
import Header from './Header';

class Teacher extends Component {
  state = {
    schools: [],
    teachers: [],
    teacherInfo: {
      id: null,
      name: '',
      email: '',
      phone: '',
      subject: '',
      schoolId: null
    },
    teacherModal: false,
    editing: false
  }
  componentWillMount(){
    this._refreshTeachers();
    this._generateSchools();
  }
  _generateSchools() {
    axios
    .get('http://localhost:3000/api/v1/schools')
    .then((response) => {
      this.setState({
        schools: response.data.data
      })
    });
  }
  toggleTeacherModal() {
    this.setState({
      editing: false,
      teacherModal: !this.state.teacherModal,
      teacherInfo: {
        id: null,
        name: '',
        email: '',
        phone: '',
        subject: '',
        schoolId: null
      }
    });
  }
  addTeacher() {
    axios
    .post('http://localhost:3000/api/v1/teachers', this.state.teacherInfo)
    .then((response) => {
      let {teachers} = this.state;
      teachers.unshift(response.data.data);
      this.setState({
        teachers, 
        teacherModal: false, 
        teacherInfo: {
            id: null,
            name: '',
            email: '',
            phone: '',
            subject: '',
            schoolId: null
          }
      });
    });
  }
  editTeacher(id, name, email, phone, subject, schoolId) {
    this.setState({
      editing: true,
      teacherInfo: {id, name, email, phone, subject, schoolId}, 
      teacherModal: !this.state.teacherModal
    });
  }
  updateTeacher() {
    let {name, email, phone} = this.state.shoolData;
    axios.put('http://localhost:3000/api/v1/teachers/' + this.state.teacherInfo.id, {name, email, phone})
    .then((response) => {
      this._refreshTeachers();
      this.setState({
        editing: false,
        teacherModal: false,
        teacherInfo: {
            id: null,
            name: '',
            email: '',
            phone: '',
            subject: '',
            schoolInfo: {
              id: null,
              name: '',
              email: '',
              phone: ''
            }
          }
      });
    });
  }
  deleteTeacher(id) {
    axios
    .delete('http://localhost:3000/api/v1/teachers/' + id)
    .then((response) => {
      this._refreshTeachers();
    });
  }
  _refreshTeachers() {
    axios
    .get('http://localhost:3000/api/v1/teachers')
    .then((response) => {
      this.setState({
        teachers: response.data.data
      })
    });
  }
  render() {
    let teachers = this.state.teachers.map((teacher) => {
      return(
        <tr key={teacher.id}>
          <td>{teacher.id}</td>
          <td>{teacher.name}</td>
          <td>{teacher.email}</td>
          <td>{teacher.phone}</td>
          <td>{teacher.subject}</td>
          <td>{teacher.school.name}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editTeacher.bind(this, teacher.id, teacher.name, teacher.email, teacher.phone, teacher.subject, teacher.school.id)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteTeacher.bind(this, teacher.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    let schools = this.state.schools.map((school) => {
        return(
            <option value={school.id}>{school.name}</option>
        )
    });
    return (
      <div className="container">
        <Header></Header>
        <h1 className="text-center mt-5">Management of Teachers</h1>
        <Button className="my-3" color="primary" onClick={this.toggleTeacherModal.bind(this)}>Add Teacher</Button>
        <Modal isOpen={this.state.teacherModal} toggle={this.toggleTeacherModal.bind(this)}>
          <ModalHeader toggle={this.toggleTeacherModal.bind(this)}>{this.state.editing ? 'Edit Teacher' : 'Add new Teacher'}</ModalHeader>
          <ModalBody>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" id="name" value={this.state.teacherInfo.name} onChange={(e) => {
                let { teacherInfo } = this.state;

                teacherInfo.name = e.target.value;

                this.setState({teacherInfo})
                }}/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" id="email" value={this.state.teacherInfo.email} onChange={(e) => {
                let { teacherInfo } = this.state;

                teacherInfo.email = e.target.value;

                this.setState({teacherInfo})
                }}/>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type="text" id="phone" value={this.state.teacherInfo.phone} onChange={(e) => {
                let { teacherInfo } = this.state;

                teacherInfo.phone = e.target.value;

                this.setState({teacherInfo})
                }}/>
            </FormGroup>
            <FormGroup>
                <Label for="Subject">Subject</Label>
                <Input type="text" id="subject" value={this.state.teacherInfo.subject} onChange={(e) => {
                let { teacherInfo } = this.state;

                teacherInfo.subject = e.target.value;

                this.setState({teacherInfo})
                }}/>
            </FormGroup>
            <FormGroup>
            <Label for="select-school">Select School</Label>
                <Input type="select" name="select" id="select-school">
                    {schools}
                </Input>
            </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.addTeacher.bind(this)}>{this.state.editing ? 'Update Teacher' : 'Add Teacher'}</Button>
                <Button color="secondary" onClick={this.toggleTeacherModal.bind(this)}>Cancel</Button>
            </ModalFooter>
        </Modal>

        <Table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>School</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {teachers}
            </tbody>
        </Table>
      </div>
    );
  }
}

export default Teacher;
