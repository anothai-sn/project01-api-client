import React, { Component } from 'react';
import axios from 'axios';

class ProjectCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_name: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const projectData = {
            project_name: this.state.project_name
        };

        axios.post(`http://127.0.0.1:5000/projects/create-project`, projectData)
            .then((res) => {
                this.setState({
                    data: res.data,
                });
                res.data != 0 ? console.log('Project data responsed') : alert('Employee data missed something : ' + res.message);
            })
            .catch(err => {
                alert('Data not found!');
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h2>Create Project</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Project Name:</label>
                                <input
                                    type="text"
                                    name="project_name"
                                    className="form-control"
                                    value={this.state.project_name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Create Project</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectCreateComponent;
