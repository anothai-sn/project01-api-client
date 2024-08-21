import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default class Company_list_companent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      editMode: false,
      currentCompany: null
    };
  }

  componentDidMount() {
    document.title = 'Companies';
    this.fetchCompanies();
  }

  fetchCompanies = () => {
    axios.get('http://127.0.0.1:5000/companies')
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        alert('Error fetching companies!');
      });
  }

  handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/companies/delete-company/${id}`)
      .then(() => {
        this.setState(prevState => ({
          data: prevState.data.filter(company => company.id !== id)
        }));
        alert('Company deleted successfully!');
      })
      .catch(err => {
        alert('Error deleting company!');
      });
  }

  handleEditClick = (company) => {
    this.setState({
      editMode: true,
      currentCompany: company,
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      currentCompany: {
        ...prevState.currentCompany,
        [name]: value,
      },
    }));
  }

  handleSave = () => {
    const { currentCompany } = this.state;
    axios.put(`http://127.0.0.1:5000/companies/update-company/${currentCompany.id}`, currentCompany)
      .then(() => {
        this.fetchCompanies();
        this.setState({
          editMode: false,
          currentCompany: null,
        });
        alert('Company updated successfully!');
      })
      .catch(err => {
        alert('Error updating company!');
      });
  }

  render() {
    const { data, editMode, currentCompany } = this.state;

    return (
      <div>
        <h2>Company List</h2>
        {editMode ? (
          <Form>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={currentCompany.company_name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={this.handleSave}>Save</Button>
            <Button variant="secondary" onClick={() => this.setState({ editMode: false, currentCompany: null })}>Cancel</Button>
          </Form>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(company => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.company_name}</td>
                  <td>
                    <Button variant="outline-primary" onClick={() => this.handleEditClick(company)}>Edit</Button>{' '}
                    <Button variant="outline-danger" onClick={() => this.handleDelete(company.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}
