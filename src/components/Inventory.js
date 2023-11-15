import React, { Component } from 'react';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: '',
      newDescription: '', // New field for item description
      expandedItems: {},
      editableItems: {},
      editedItemText: '',
    };
  }

  addItem = (type) => {
    const { items, newItem, newDescription } = this.state;
    if (newItem) {
      this.setState({
        items: [
          ...items,
          {
            type, // 'yarn' or 'project'
            name: newItem,
            description: newDescription, // Include description
            completed: type === 'project' ? false : undefined, // Set 'completed' for projects
          },
        ],
        newItem: '',
        newDescription: '', // Clear the description field
      });
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
    const { items, newItem, newDescription, expandedItems, editableItems, editedItemText } = this.state;

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
          placeholder="Description" // Input for the description
          value={newDescription}
          onChange={(e) => this.setState({ newDescription: e.target.value })}
        />
        <button onClick={() => this.addItem('yarn')}>Add Yarn</button>
        <button onClick={() => this.addItem('project')}>Add Project</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {editableItems[item.name] ? (
                <input
                  type="text"
                  value={editedItemText}
                  onChange={this.handleEditedItemChange}
                />
              ) : (
                <div>
                  <strong>Name:</strong> {item.name}
                  <br />
                  <strong>Description:</strong> {item.description}
                </div>
              )}
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
