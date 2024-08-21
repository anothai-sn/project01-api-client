import React, { Component } from 'react';
import axios from 'axios';

class Company_create_component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: ''
        };
    }

    handleChange = (e) => {
        this.setState({ companyName: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const companyData = {
            company_name: this.state.companyName
        };

        axios.post('http://127.0.0.1:5000/companies/create-company', companyData)
            .then(res => {
                alert('Company created successfully!');
                this.setState({ companyName: '' });
            })
            .catch(err => {
                alert('Error creating company!');
                console.error('Error:', err);
            });
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h2>Create Company</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Company Name:</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    className="form-control"
                                    value={this.state.companyName}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Create Company</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Company_create_component;
