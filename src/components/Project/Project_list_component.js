import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default class Project_list_component extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      editMode: false,
      currentProject: null
    };
  }

  componentDidMount() {
    document.title = 'Projects';
    this.fetchProjects();
  }

  fetchProjects = () => {
    axios.get('http://127.0.0.1:5000/projects')
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        alert('Error fetching projects!');
      });
  }

  handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/projects/delete-project/${id}`)
      .then(() => {
        this.setState(prevState => ({
          data: prevState.data.filter(project => project.id !== id)
        }));
        alert('Project deleted successfully!');
      })
      .catch(err => {
        alert('Error deleting project!');
      });
  }

  handleEditClick = (project) => {
    this.setState({
      editMode: true,
      currentProject: project,
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      currentProject: {
        ...prevState.currentProject,
        [name]: value,
      },
    }));
  }

  handleSave = () => {
    const { currentProject } = this.state;
    axios.put(`http://127.0.0.1:5000/projects/update-project/${currentProject.id}`, currentProject)
      .then(() => {
        this.fetchProjects();
        this.setState({
          editMode: false,
          currentProject: null,
        });
        alert('Project updated successfully!');
      })
      .catch(err => {
        alert('Error updating project!');
      });
  }

  render() {
    const { data, editMode, currentProject } = this.state;

    return (
      <div>
        <h2>Projects List</h2>
        {editMode ? (
          <Form>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="project_name"
                value={currentProject.project_name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={this.handleSave}>Save</Button>
            <Button variant="secondary" onClick={() => this.setState({ editMode: false, currentProject: null })}>Cancel</Button>
          </Form>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(project => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.project_name}</td>
                  <td>
                    <Button variant="outline-primary" onClick={() => this.handleEditClick(project)}>Edit</Button>{' '}
                    <Button variant="outline-danger" onClick={() => this.handleDelete(project.id)}>Delete</Button>
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
