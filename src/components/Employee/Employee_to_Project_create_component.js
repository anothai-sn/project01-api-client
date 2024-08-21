import React, { Component } from 'react';
import axios from 'axios';

class EmployeeToProjectCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: '',
            projectId: '',
            employees: [],
            projects: []
        };
    }

    componentDidMount() {
        // Fetch employees
        axios.get('http://127.0.0.1:5000/employees')
            .then(res => {
                this.setState({ employees: res.data });
            })
            .catch(err => {
                console.error('Error fetching employees:', err);
            });

        // Fetch projects
        axios.get('http://127.0.0.1:5000/projects')
            .then(res => {
                this.setState({ projects: res.data });
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { employeeId, projectId } = this.state;

        axios.post('http://127.0.0.1:5000/employees/create-employee-project', {
            employeeId,
            projectId
        })
        .then((res) => {
            if (res.data) {
                console.log('Employee-Project association created:', res.data);
                alert('Employee assigned to project successfully!');
                // Optionally redirect to another page or reset the form
            } else {
                alert('Failed to create association');
            }
        })
        .catch(err => {
            console.error('Error creating association:', err);
            alert('Error creating employee-project association');
        });
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h2>Assign Employee to Project</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Employee ID:</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    className="form-control"
                                    value={this.state.employeeId}
                                    onChange={this.handleChange}
                                    placeholder="Enter employee ID"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Project:</label>
                                <select
                                    name="projectId"
                                    className="form-control"
                                    value={this.state.projectId}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="">Select a project</option>
                                    {this.state.projects.map(project => (
                                        <option key={project.id} value={project.id}>
                                            {project.project_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Assign</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeToProjectCreateComponent;
