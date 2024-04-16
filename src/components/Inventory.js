import React, { Component } from 'react';

import API from './Api';

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
      const response = await API.getInventory();

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
  

  addItem = (type) => {
    const { newItem, newDescription } = this.state;
  
    if (newItem) {
      let createMethod;
      if (type === 'yarn') {
        createMethod = API.createYarn;
      } else if (type === 'project') {
        createMethod = API.createProject;
      }
  
      if (createMethod) {
        createMethod({ name: newItem, description: newDescription })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }
            return response.data;
          })
          .then((data) => {
            this.setState((prevState) => ({
              items: [...prevState.items, data],
              newItem: '',
              newDescription: '',
              error: null,
            }));
          })
          .catch((error) => console.error('Error adding item:', error));
      } else {
        console.error('Invalid type provided');
      }
    } else {
      console.error('New item is empty');
    }
  };
  
  

  removeItem = (item) => {
    this.setState((prevState) => {
      const newItems = prevState.items.filter((i) => i !== item);
      const newExpandedItems = { ...prevState.expandedItems };
      delete newExpandedItems[item.name];
      const newEditableItems = { ...prevState.editableItems };
      delete newEditableItems[item.name];
      return {
        items: newItems,
        expandedItems: newExpandedItems,
        editableItems: newEditableItems,
      };
    });
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
      editedItemText: prevState.editableItems[item.name]
        ? prevState.editedItemText
        : item.name,
    }));
  };

  saveEditedItem = (item) => {
    this.setState((prevState) => ({
      items: prevState.items.map((i) =>
        i.name === item.name ? { ...i, name: prevState.editedItemText } : i
      ),
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
              {/* Placeholder for rendering item details */}
              <div>
                <strong>Name:</strong> {item.name}
                <br />
                <strong>Description:</strong> {item.description}
              </div>
              {/* Placeholder for your buttons */}
              <button onClick={() => this.removeItem(item)}>Remove</button>
              <button onClick={() => this.toggleItemEdit(item)}>
                {editableItems[item.name] ? 'Cancel' : 'Edit'}
              </button>
              <button onClick={() => this.toggleItemDetails(item)}>
                {expandedItems[item.name] ? 'Hide' : 'View'}
              </button>
              {expandedItems[item.name] && (
                <div>
                  {item.type === 'yarn'
                    ? `Yarn Inventory: ${item.name} Details...`
                    : `Completed Project: ${item.name} Details...`}
                </div>
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
