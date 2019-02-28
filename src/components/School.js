import React, { Component } from 'react';
import {Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import axios from 'axios';
import Header from './Header';

class School extends Component {
  state = {
    schools: [],
    schoolData: {
      id: null,
      name: '',
      email: '',
      phone: ''
    },
    schoolModal: false,
    editing: false
  }
  componentWillMount(){
    this._refreshSchools();
  }
  toggleSchoolModal() {
    this.setState({
      editing: false,
      schoolModal: !this.state.schoolModal,
      schoolData: { 
        id: null,
        name: '', 
        email: '', 
        phone: ''
      }
    });
  }
  addSchool() {
    axios
    .post('http://localhost:3000/api/v1/schools', this.state.schoolData)
    .then((response) => {
      let {schools} = this.state;
      schools.unshift(response.data.data);
      this.setState({
        schools, 
        schoolModal: false, 
        schoolData: { 
          id: null,
          name: '', 
          email: '', 
          phone: ''
        }
      });
    });
  }
  editSchool(id, name, email, phone) {
    this.setState({
      editing: true,
      schoolData: {id, name, email, phone}, 
      schoolModal: !this.state.schoolModal
    });
  }
  updateSchool() {
    let {name, email, phone} = this.state.shoolData;
    axios.put('http://localhost:3000/api/v1/schools/' + this.state.schoolData.id, {name, email, phone})
    .then((response) => {
      this._refreshSchools();
      this.setState({
        editing: false,
        schoolModal: false,
        schoolData: {
          id: '',
          name: '',
          email: '',
          phone: ''
        }
      });
    });
  }
  deleteSchool(id) {
    axios
    .delete('http://localhost:3000/api/v1/schools/' + id)
    .then((response) => {
      this._refreshSchools();
    });
  }
  _refreshSchools() {
    axios
    .get('http://localhost:3000/api/v1/schools')
    .then((response) => {
      this.setState({
        schools: response.data.data
      })
    });
  }
  render() {
    let schools = this.state.schools.map((school) => {
      return(
        <tr key={school.id}>
          <td>{school.id}</td>
          <td>{school.name}</td>
          <td>{school.email}</td>
          <td>{school.phone}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editSchool.bind(this, school.id, school.name, school.email, school.phone)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteSchool.bind(this, school.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="container">
        <Header></Header>
        <h1>Schools App</h1>
        <Button className="my-3" color="primary" onClick={this.toggleSchoolModal.bind(this)}>Add School</Button>
        <Modal isOpen={this.state.schoolModal} toggle={this.toggleSchoolModal.bind(this)}>
          <ModalHeader toggle={this.toggleSchoolModal.bind(this)}>{this.state.editing ? 'Edit School' : 'Add new School'}</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" id="name" value={this.state.schoolData.name} onChange={(e) => {
              let { schoolData } = this.state;

              schoolData.name = e.target.value;

              this.setState({schoolData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" id="email" value={this.state.schoolData.email} onChange={(e) => {
              let { schoolData } = this.state;

              schoolData.email = e.target.value;

              this.setState({schoolData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="text" id="phone" value={this.state.schoolData.phone} onChange={(e) => {
              let { schoolData } = this.state;

              schoolData.phone = e.target.value;

              this.setState({schoolData})
            }}/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addSchool.bind(this)}>{this.state.editing ? 'Update School' : 'Add School'}</Button>
            <Button color="secondary" onClick={this.toggleSchoolModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default School;
