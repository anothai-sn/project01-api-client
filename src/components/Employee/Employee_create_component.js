import React, { Component } from 'react';
import axios from 'axios';

class EmployeeCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            position: '',
            companyId: '',
            companies: []
        };
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/companies`)
            .then(res => {
                this.setState({ companies: res.data });
            })
            .catch(err => {
                console.error('Error fetching companies:', err);
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const employeeData = {
            name: this.state.name,
            position: this.state.position,
            companyId: this.state.companyId
        };

        axios.post(`http://127.0.0.1:5000/employees/create-employee`, employeeData)
            .then((res) => {
                this.setState({
                    data: res.data,
                });
                res.data != 0 ? console.log('Employee data responsed') : alert('Employee data missed something : ' + res.message);
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
                        <h2>Create Employee</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Position:</label>
                                <input
                                    type="text"
                                    name="position"
                                    className="form-control"
                                    value={this.state.position}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Company:</label>
                                <select
                                    name="companyId"
                                    className="form-control"
                                    value={this.state.companyId}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="">Select a company</option>
                                    {this.state.companies.map(company => (
                                        <option key={company.id} value={company.id}>
                                            {company.company_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Create Employee</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeCreateComponent;
