import React, { Component } from 'react';
import API from './Api'; // Import the API instance

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yarnType: '',
      completedProjects: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { yarnType, completedProjects } = this.state;

    try {
      const response = await API.createYarn({ yarnType, completedProjects });
      console.log('Item added successfully:', response.data);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  render() {
    const { yarnType, completedProjects } = this.state;

    return (
      <div>
        <h2>Add New Item</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Yarn Info:
            <input
              type="text"
              name="yarnType"
              value={yarnType}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Inventory of Completed Projects:
            <input
              type="text"
              name="completedProjects"
              value={completedProjects}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default Inventory;
