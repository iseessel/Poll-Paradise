import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import onClickOutside from 'react-onclickoutside'
import { createGroup, groupQuestions } from '../../actions/group_actions.js'
// import { ensureSelected } from '../../actions/ui_actions.js'

const mapStateToProps = (state) => {
  return {
    questionIds: state.ui.userInput.groupedQuestions,
    groups: Object.values(state.entities.groups)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: (data) => dispatch(createGroup(data)),
    groupQuestions: (id, data) => dispatch(groupQuestions(id, data)),
    // ensureSelected: (id, data) =>
  }
}

class PollCreateModal extends React.Component{

  constructor(props){
    super(props)
    this.state = {groupText: null, groupId: null}
  }

  handleClickOutside(){
    this.props.closeModal()
  }

  generateDropDowns(){
    return this.props.groups.map((group, idx) => {
      return(
        <option key={idx}
          className="dropdown-menu"
          value={group.id}>
        {group.title}
        </option>
      )
    })
  }

  handleSubmit(e){
    e.preventDefault()
    let groupId = this.state.groupId
    const groupText = this.state.groupText
    let data
    if(groupId && groupText){
      this.setState({errors: "You must either create a group or select a group! Not Both!"})
    }else if(groupId){
        //need a way of reassigning questions to be ungrouped
        groupId = ( groupId === -2 ? null : groupId)
        data = { question_ids : this.props.questionIds }
      return this.props.groupQuestions(groupId, data)
        .then(() => this.props.closeModal())
    }else if(groupText){

      data = { question_ids: this.props.questionIds, group: {title: groupText }}
      return this.props.createGroup(data)
        .then(() => this.props.closeModal())
    }else{
      this.setState({errors: "You must either create a group or select a group!"})
    }
  }

  render(){
    return(
      <div className="poll-create-container">
        <form className="main-poll-create">
          <div className="group-dropdown">
            <h2 className="group-dropdown-title"> Select a Group</h2>
            <select onChange={(e) => this.setState(
                {groupId: parseInt(e.currentTarget.value)}
              )}
              className="group-dropdown-select">
              <option value={null}>Select an Optional Grouping</option>
              {this.generateDropDowns()}
              <option key={-1}
                className="dropdown-menu"
                value={-2}>
                Ungrouped
              </option>
            </select>
            <h2 className="middle-poll-create"> Or </h2>
          </div>
          <div className="poll-create-new-group">
            <h2 className="new-group-title">Create a New Group</h2>
            <input
              className="poll-create-group-text"
              onChange={(e) => this.setState({
                groupText: e.currentTarget.value}
              )}/>
          </div>
          <button
            onClick={this.handleSubmit.bind(this)}
            className="create-new-group-button">
            Assign to a Group
          </button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (onClickOutside(PollCreateModal))
