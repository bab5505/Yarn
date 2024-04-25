import axios from 'axios';
import React, { Component } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: '',
      newDescription: '',
      expandedItems: {},
      editableItems: {},
    };
  }

  componentDidMount() {
    this.fetchInventoryData();
  }

  fetchInventoryData = async () => {
    try {
      const response = await api.get('/inventory');

      console.log('API response:', response);

      if (response.status === 200) {
        const responseData = response.data || [];
        this.setState({ items: responseData });
      } else {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  addItem = async (type) => {
    const { newItem, newDescription } = this.state;

    if (newItem) {
      try {
        const response = await api.post(`/${type}s`, { name: newItem, description: newDescription });
        if (response.status === 200) {
          const newItemData = response.data;
          this.setState((prevState) => ({
            items: [...prevState.items, newItemData],
            newItem: '',
            newDescription: '',
          }));
        } else {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error adding item:', error);
      }
    } else {
      console.error('New item is empty');
    }
  };

  removeItem = (item) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((i) => i !== item),
    }));
  };

  toggleItemDetails = (item) => {
    this.setState((prevState) => ({
      expandedItems: {
        ...prevState.expandedItems,
        [item.name]: !prevState.expandedItems[item.name],
      },
    }));
  };

  toggleItemEdit = (item) => {
    this.setState((prevState) => ({
      editableItems: {
        ...prevState.editableItems,
        [item.name]: !prevState.editableItems[item.name],
      },
      editedItemText: prevState.editableItems[item.name] ? prevState.editedItemText : item.name,
    }));
  };

  saveEditedItem = (item) => {
    this.setState((prevState) => ({
      items: prevState.items.map((i) => (i.name === item.name ? { ...i, name: prevState.editedItemText } : i)),
      editableItems: { ...prevState.editableItems, [item.name]: false },
    }));
  };

  handleEditedItemChange = (e) => {
    this.setState({ editedItemText: e.target.value });
  };

  render() {
    const {
      items,
      newItem,
      newDescription,
      expandedItems,
      editableItems,
    } = this.state;

    return (
      <div>
        <h2>Inventory</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem}
          onChange={(e) => this.setState({ newItem: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => this.setState({ newDescription: e.target.value })}
        />
        <button onClick={() => this.addItem('yarn')}>Add Yarn</button>
        <button onClick={() => this.addItem('project')}>Add Project</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <div>
                <strong>Name:</strong> {item.name}
                <br />
                <strong>Description:</strong> {item.description}
              </div>
              <button onClick={() => this.removeItem(item)}>Remove</button>
              <button onClick={() => this.toggleItemEdit(item)}>
                {editableItems[item.name] ? 'Cancel' : 'Edit'}
              </button>
              <button onClick={() => this.toggleItemDetails(item)}>
                {expandedItems[item.name] ? 'Hide' : 'View'}
              </button>
              {expandedItems[item.name] && (
                <div>{item.type === 'yarn' ? `Yarn Inventory: ${item.name} Details...` : `Project: ${item.name} Details...`}</div>
              )}
              {editableItems[item.name] && (
                <button onClick={() => this.saveEditedItem(item)}>Save</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Inventory;
