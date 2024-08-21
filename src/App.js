import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar_components'

import Employee_list_component from './components/Employee/Employee_list_component';
import Employee_create_component from './components/Employee/Employee_create_component';
import Employee_to_Project_createComponent from './components/Employee/Employee_to_Project_create_component';

import Project_list_component from './components/Project/Project_list_component';
import Project_create_Component from './components/Project/Project_create_component';

import Company_list_component from './components/Company/Company_list_component';
import Company_create_component from './components/Company/Company_create_component';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='container mt-3'>
            <Routes>
              <Route path='/employees' element={<Employee_list_component />} />
              <Route path='/add-employee' element={<Employee_create_component />} />
              <Route path='/add-employee-to-project' element={<Employee_to_Project_createComponent />} />

              <Route path='/companies' element={<Company_list_component />} />
              <Route path='/add-company' element={<Company_create_component />} />

              <Route path='/projects' element={<Project_list_component />} />
              <Route path='/add-project' element={<Project_create_Component />} />
            </Routes>
        </div>
      </div>
    );
  };
};
