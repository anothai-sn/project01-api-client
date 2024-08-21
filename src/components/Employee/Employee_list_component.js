import React, { Component } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

export default class EmployeeListComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      editMode: false,
      currentEmployee: null,
      companies: [],
      projects: [],
    };
  }

  componentDidMount() {
    document.title = 'Employees';
    this.fetchEmployee();
    this.fetchCompanies();
    this.fetchProjects();
  }

  fetchEmployee = () => {
    axios.get('http://127.0.0.1:5000/employees')
      .then(res => {
        this.setState({
          data: res.data,
        });
      })
      .catch(err => {
        alert('Data not found!');
      });
  }

  fetchCompanies = () => {
    axios.get('http://127.0.0.1:5000/companies')
      .then(res => {
        this.setState({
          companies: res.data,
        });
      })
      .catch(err => {
        alert('Error fetching companies!');
      });
  }

  fetchProjects = () => {
    axios.get('http://127.0.0.1:5000/projects')
      .then(res => {
        this.setState({
          projects: res.data,
        });
      })
      .catch(err => {
        alert('Error fetching projects!');
      });
  }

  handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/employees/delete-employee/${id}`)
      .then(() => {
        this.setState(prevState => ({
          data: prevState.data.filter(employee => employee.id !== id)
        }));
        alert('Employee deleted successfully!');
      })
      .catch(err => {
        alert('Error deleting employee!');
      });
  }

  handleEditClick = (employee) => {
    this.setState({
      editMode: true,
      currentEmployee: employee,
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        [name]: value,
      },
    }));
  }

  handleCompanyChange = (e) => {
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        companyId: e.target.value,
      },
    }));
  }

  handleProjectChange = (e) => {
    const selectedProjects = Array.from(e.target.selectedOptions, option => option.value);
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        projectIds: selectedProjects,
      },
    }));
  }

  handleSave = () => {
    const { currentEmployee } = this.state;
    axios.put(`http://127.0.0.1:5000/employees/update-employee/${currentEmployee.id}`, currentEmployee)
      .then(() => {
        this.fetchEmployee();
        this.setState({
          editMode: false,
          currentEmployee: null,
        });
        alert('Employee updated successfully!');
      })
      .catch(err => {
        alert('Error updating employee!');
      });
  }

  render() {
    const { data, editMode, currentEmployee, companies, projects } = this.state;

    return (
      <div>
        <h2>Employee List</h2>
        {editMode ? (
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentEmployee.name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={currentEmployee.position}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                as="select"
                name="company"
                value={currentEmployee.companyId}
                onChange={this.handleCompanyChange}
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.company_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project</Form.Label>
              <Form.Control
                as="select"
                name="project"
                value={currentEmployee.projectId}
                onChange={this.handleProjectChange}
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.project_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br></br>
            <Button variant="primary" onClick={this.handleSave}>Save</Button>
            <Button variant="secondary" onClick={() => this.setState({ editMode: false, currentEmployee: null })}>Cancel</Button>
          </Form>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Company</th>
                <th>Projects</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.company.company_name}</td>
                  <td>
                    {employee.projects.map(project => (
                      <div key={project.id}>{project.project_name}</div>
                    ))}
                  </td>
                  <td>
                    <Button variant="outline-primary" onClick={() => this.handleEditClick(employee)}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => this.handleDelete(employee.id)}>Delete</Button>
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
