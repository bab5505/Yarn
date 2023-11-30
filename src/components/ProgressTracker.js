import React, { Component } from 'react';

class ProgressTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackers: [],
      newItem: '',
    };
  }

  addTracker = () => {
    const { trackers, newItem } = this.state;

    if (newItem) {
      this.setState({
        trackers: [
          ...trackers,
          {
            name: newItem,
            time: 0, // Initialize timer to 0
            editMode: false,
            timerIsRunning: false, // Indicates if the timer is running
          },
        ],
        newItem: '',
      });
    }
  };

  removeTracker = (trackerName) => {
    this.setState((prevState) => ({
      trackers: prevState.trackers.filter((tracker) => tracker.name !== trackerName),
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
    this.setState((prevState) => ({
      trackers: prevState.trackers.map((tracker) => {
        if (tracker.name === trackerName) {
          return { ...tracker, ...updatedData, editMode: false };
        }
        return tracker;
      }),
    }));
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

  render() {
    const { trackers, newItem } = this.state;

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
            />
          ))}
        </ul>
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

