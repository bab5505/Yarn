import React, { Component } from 'react';
import API from './Api'; 

class ProgressTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackers: [],
      newItem: '',
      selectedTracker: null,
    };
  }

  componentDidMount() {
    this.fetchTrackerData();
  }

  fetchTrackerData = async () => {
    try {
      const response = await API.getTrackers();
      if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      this.setState({ trackers: data });
    } catch (error) {
      console.error('Error fetching trackers:', error);
    }
  };
  

  addTracker = () => {
    const { trackers, newItem } = this.state;
  
    if (newItem) {
      API.createTracker({
        name: newItem,
        size: '',
        lot: '',
        color: '',
        eyeSize: '',
        notes: '',
        time: 0,
        editMode: false,
        timerIsRunning: false,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server returned ${response.status} ${response.statusText}`);
          }
          return response.data;
        })
        .then((data) => {
          this.setState({
            trackers: [...trackers, data],
            newItem: '',
          });
        })
        .catch((error) => console.error('Error adding tracker:', error));
    }
  };
  

  removeTracker = (trackerName) => {
    this.setState((prevState) => ({
      trackers: prevState.trackers.filter((tracker) => tracker.name !== trackerName),
      selectedTracker: null, // Clear selected tracker when removed
    }));
  };

  toggleEditMode = (trackerName) => {
    this.setState((prevState) => ({
      trackers: prevState.trackers.map((tracker) => {
        if (tracker.name === trackerName) {
          return { ...tracker, editMode: !tracker.editMode };
        }
        return tracker;
      }),
    }));
  };

  updateTracker = (trackerName, updatedData) => {
    API.updateTracker(trackerName, updatedData)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        return response.data;
      })
      .then((updatedTracker) => {
        this.setState((prevState) => ({
          trackers: prevState.trackers.map((tracker) => {
            if (tracker.name === trackerName) {
              return { ...tracker, ...updatedTracker, editMode: false };
            }
            return tracker;
          }),
        }));
      })
      .catch((error) => console.error('Error updating tracker:', error));
  };

  startTimer = (trackerName) => {
    this.interval = setInterval(() => {
      this.updateTrackerTime(trackerName);
    }, 1000);
    this.setState((prevState) => ({
      trackers: prevState.trackers.map((tracker) => {
        if (tracker.name === trackerName) {
          return { ...tracker, timerIsRunning: true };
        }
        return tracker;
      }),
    }));
  };

  stopTimer = (trackerName) => {
    clearInterval(this.interval);
    this.setState((prevState) => ({
      trackers: prevState.trackers.map((tracker) => {
        if (tracker.name === trackerName) {
          return { ...tracker, timerIsRunning: false };
        }
        return tracker;
      }),
    }));
  };

  resetTimer = (trackerName) => {
    this.stopTimer(trackerName);
    this.setState((prevState) => ({
      trackers: prevState.trackers.map((tracker) => {
        if (tracker.name === trackerName) {
          return { ...tracker, time: 0 };
        }
        return tracker;
      }),
    }));
  };

  updateTrackerTime = (trackerName) => {
    this.setState((prevState) => ({
      trackers: prevState.trackers.map((tracker) => {
        if (tracker.name === trackerName && tracker.timerIsRunning) {
          return { ...tracker, time: tracker.time + 1 };
        }
        return tracker;
      }),
    }));
  };

  viewTracker = (selectedTracker) => {
    this.setState({ selectedTracker });
  };

  render() {
    const { trackers, newItem, selectedTracker } = this.state;

    return (
      <div>
        <h2>Progress Tracker</h2>
        <input
          type="text"
          placeholder="Tracker Name"
          value={newItem}
          onChange={(e) => this.setState({ newItem: e.target.value })}
        />
        <button onClick={this.addTracker}>Add Tracker</button>
        <ul>
          {trackers.map((tracker) => (
            <TrackerItem
              key={tracker.name}
              tracker={tracker}
              removeTracker={this.removeTracker}
              toggleEditMode={this.toggleEditMode}
              updateTracker={this.updateTracker}
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
              resetTimer={this.resetTimer}
              updateTrackerTime={this.updateTrackerTime}
              viewTracker={this.viewTracker}
            />
          ))}
        </ul>
        {selectedTracker && (
          <div>
            <h3>Tracker Details</h3>
            <p>
              <strong>Name:</strong> {selectedTracker.name}
            </p>
            <p>
              <strong>Size:</strong> {selectedTracker.size}
            </p>
            <p>
              <strong>Lot:</strong> {selectedTracker.lot}
            </p>
            <p>
              <strong>Color:</strong> {selectedTracker.color}
            </p>
            <p>
              <strong>Eye Size:</strong> {selectedTracker.eyeSize}
            </p>
            <p>
              <strong>Notes:</strong> {selectedTracker.notes}
            </p>
            <p>
              <strong>Elapsed Time:</strong> {selectedTracker.time} seconds
            </p>
          </div>
        )}
      </div>
    );
  }
}

class TrackerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedSize: props.tracker.size,
      editedLot: props.tracker.lot,
      editedColor: props.tracker.color,
      editedEyeSize: props.tracker.eyeSize,
      editedNotes: props.tracker.notes,
    };
  }

  handleView = () => {
    this.props.viewTracker(this.props.tracker);
  };

  handleEdit = () => {
    this.props.toggleEditMode(this.props.tracker.name);
  };

  handleUpdate = () => {
    const {
      editedSize,
      editedLot,
      editedColor,
      editedEyeSize,
      editedNotes,
    } = this.state;

    const updatedData = {
      size: editedSize,
      lot: editedLot,
      color: editedColor,
      eyeSize: editedEyeSize,
      notes: editedNotes,
    };

    this.props.updateTracker(this.props.tracker.name, updatedData);
    this.props.stopTimer(this.props.tracker.name);
  };

  handleStartTimer = () => {
    this.props.startTimer(this.props.tracker.name);
  };

  handleStopTimer = () => {
    this.props.stopTimer(this.props.tracker.name);
  };

  handleResetTimer = () => {
    this.props.resetTimer(this.props.tracker.name);
  };

  handleSizeChange = (e) => {
    this.setState({ editedSize: e.target.value });
  };

  handleLotChange = (e) => {
    this.setState({ editedLot: e.target.value });
  };

  handleColorChange = (e) => {
    this.setState({ editedColor: e.target.value });
  };

  handleEyeSizeChange = (e) => {
    this.setState({ editedEyeSize: e.target.value });
  };

  handleNotesChange = (e) => {
    this.setState({ editedNotes: e.target.value });
  };

  render() {
    const { tracker, removeTracker } = this.props;
    const { name, time, timerIsRunning } = tracker;

    return (
      <li>
        <div>
          <span>Tracker Name: {name}</span>
          {timerIsRunning ? (
            <button onClick={this.handleStopTimer}>Stop Timer</button>
          ) : (
            <button onClick={this.handleStartTimer}>Start Timer</button>
          )}
          <button onClick={this.handleResetTimer}>Reset Timer</button>
          <button onClick={this.handleEdit}>Customize</button>
          <button onClick={this.handleView}>View</button>
          <button onClick={() => removeTracker(tracker.name)}>Remove</button>
        </div>
        {tracker.editMode && (
          <div>
            <label>Size:</label>
            <input type="text" value={this.state.editedSize} onChange={this.handleSizeChange} />
            <label>Lot:</label>
            <input type="text" value={this.state.editedLot} onChange={this.handleLotChange} />
            <label>Color:</label>
            <input type="text" value={this.state.editedColor} onChange={this.handleColorChange} />
            <label>Eye Size:</label>
            <input type="text" value={this.state.editedEyeSize} onChange={this.handleEyeSizeChange} />
            <label>Notes:</label>
            <textarea value={this.state.editedNotes} onChange={this.handleNotesChange} />
            <button onClick={this.handleUpdate}>Update</button>
          </div>
        )}
        <div>
          <span>Elapsed Time: {time} seconds</span>
        </div>
      </li>
    );
  }
}

export default ProgressTracker;
