import React, { Component } from 'react';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      newProject: '',
      newProjectDescription: '', 
      newProjectHookSize: '', 
      newProjectNeedleSize: '', 
      expandedProjects: {},
      editableProjects: {},
      editedProjectText: '',
    };
  }

  addProject = () => {
    const {
      projects,
      newProject,
      newProjectDescription,
      newProjectHookSize,
      newProjectNeedleSize,
    } = this.state;

    if (newProject) {
      const newProjectItem = {
        name: newProject,
        description: newProjectDescription, 
        hookSize: newProjectHookSize, 
        needleSize: newProjectNeedleSize, 
      };

      this.setState({
        projects: [...projects, newProjectItem],
        newProject: '',
        newProjectDescription: '', 
        newProjectHookSize: '', 
        newProjectNeedleSize: '', 
      });
    }
  };

  removeProject = (project) => {
    this.setState((prevState) => {
      const newProjects = prevState.projects.filter((p) => p !== project);
      const newExpandedProjects = { ...prevState.expandedProjects };
      delete newExpandedProjects[project.name];
      const newEditableProjects = { ...prevState.editableProjects };
      delete newEditableProjects[project.name];
      return {
        projects: newProjects,
        expandedProjects: newExpandedProjects,
        editableProjects: newEditableProjects,
      };
    });
  };

  toggleProjectDetails = (project) => {
    this.setState((prevState) => ({
      expandedProjects: {
        ...prevState.expandedProjects,
        [project.name]: !prevState.expandedProjects[project.name],
      },
    }));
  };

  toggleProjectEdit = (project) => {
    this.setState((prevState) => ({
      editableProjects: {
        ...prevState.editableProjects,
        [project.name]: !prevState.editableProjects[project.name],
      },
      editedProjectText: prevState.editableProjects[project.name]
        ? prevState.editedProjectText
        : project.name,
    }));
  };

  saveEditedProject = (project) => {
    this.setState((prevState) => ({
      projects: prevState.projects.map((p) =>
        p.name === project.name
          ? { ...p, name: prevState.editedProjectText }
          : p
      ),
      editableProjects: { ...prevState.editableProjects, [project.name]: false },
    }));
  };

  cancelEdit = (project) => {
    this.setState((prevState) => ({
      editableProjects: { ...prevState.editableProjects, [project.name]: false },
      editedProjectText: project.name,
    }));
  };

  handleEditedProjectChange = (e) => {
    this.setState({ editedProjectText: e.target.value });
  };

  handleProjectDescriptionChange = (e, project) => {
    const updatedDescription = e.target.value;
    this.setState((prevState) => ({
      projects: prevState.projects.map((p) =>
        p.name === project.name
          ? { ...p, description: updatedDescription }
          : p
      ),
    }));
  };

  handleHookSizeChange = (e, project) => {
    const updatedHookSize = e.target.value;
    this.setState((prevState) => ({
      projects: prevState.projects.map((p) =>
        p.name === project.name
          ? { ...p, hookSize: updatedHookSize }
          : p
      ),
    }));
  };

  handleNeedleSizeChange = (e, project) => {
    const updatedNeedleSize = e.target.value;
    this.setState((prevState) => ({
      projects: prevState.projects.map((p) =>
        p.name === project.name
          ? { ...p, needleSize: updatedNeedleSize }
          : p
      ),
    }));
  };

  render() {
    const {
      projects,
      newProject,
      newProjectDescription,
      newProjectHookSize,
      newProjectNeedleSize,
      expandedProjects,
      editableProjects,
      editedProjectText,
    } = this.state;

    return (
      <div>
        <h2>Projects</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject}
          onChange={(e) => this.setState({ newProject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProjectDescription}
          onChange={(e) => this.setState({ newProjectDescription: e.target.value })}
        />
        <input
          type="text"
          placeholder="Hook Size"
          value={newProjectHookSize}
          onChange={(e) => this.setState({ newProjectHookSize: e.target.value })}
        />
        <input
          type="text"
          placeholder="Needle Size"
          value={newProjectNeedleSize}
          onChange={(e) => this.setState({ newProjectNeedleSize: e.target.value })}
        />
        <button onClick={this.addProject}>Add Project</button>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              {editableProjects[project.name] ? (
                <div>
                  <input
                    type="text"
                    value={editedProjectText}
                    onChange={this.handleEditedProjectChange}
                  />
                  <button onClick={() => this.saveEditedProject(project)}>Save</button>
                  <button onClick={() => this.cancelEdit(project)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>{project.name}</span>
                  <button onClick={() => this.removeProject(project)}>Remove</button>
                  <button onClick={() => this.toggleProjectEdit(project)}>
                    Edit
                  </button>
                  <button onClick={() => this.toggleProjectDetails(project)}>
                    {expandedProjects[project.name] ? 'Hide' : 'View'}
                  </button>
                </div>
              )}
              {expandedProjects[project.name] && (
                <div>
                  <div>
                    <strong>Description:</strong>
                    {editableProjects[project.name] ? (
                      <textarea
                        value={project.description}
                        onChange={(e) => this.handleProjectDescriptionChange(e, project)}
                      />
                    ) : (
                      <span>{project.description}</span>
                    )}
                  </div>
                  <div>
                    <strong>Hook Size:</strong>
                    {editableProjects[project.name] ? (
                      <input
                        type="text"
                        value={project.hookSize}
                        onChange={(e) => this.handleHookSizeChange(e, project)}
                      />
                    ) : (
                      <span>{project.hookSize}</span>
                    )}
                  </div>
                  <div>
                    <strong>Needle Size:</strong>
                    {editableProjects[project.name] ? (
                      <input
                        type="text"
                        value={project.needleSize}
                        onChange={(e) => this.handleNeedleSizeChange(e, project)}
                      />
                    ) : (
                      <span>{project.needleSize}</span>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Projects;
