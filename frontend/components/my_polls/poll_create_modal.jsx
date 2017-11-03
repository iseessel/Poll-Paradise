import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import onClickOutside from 'react-onclickoutside'
import { createGroup, groupQuestions } from '../../actions/group_actions.js'
import { clearCheckBoxes } from '../../actions/ui_actions.js'
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
    // clearCheckBoxes: () => dispatch(clearCheckBoxes())
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
      this.setState({error: "You must create or select a group. Not Both."})
    }else if(groupId){
        //need a way of reassigning questions to be ungrouped
        groupId = ( groupId === -2 ? null : groupId)
        data = { question_ids : this.props.questionIds }
      return this.props.groupQuestions(groupId, data)
        .then($('input:checkbox').removeAttr('checked'))
        .then(() => this.props.closeModal())
    }else if(groupText){

      data = { question_ids: this.props.questionIds, group: {title: groupText }}
      return this.props.createGroup(data)
        .then(() => this.props.closeModal())
    }else{
      this.setState({error: "You must create or select a group."})
    }
  }

  generateErrors(){
    if(this.state.error){
      return  (
        <ul className="poll-create-modal-errors">
          <li className="poll-create-modal-error">
            {this.state.error}
          </li>
        </ul>
      )
    }else {
      return (
        <div className="hidden">
        </div>
      )
    }
  }

  render(){
    return(
      <div className="poll-create-container">
        <form className="main-poll-create">
          <div className="main-poll-create-header">
              <h3>
                Assign Questions to a Group
              </h3>
            <div onClick={this.handleClickOutside.bind(this)} className="close-modal">
              <FontAwesome className="window-close" name="window-close" size="2x"/>
            </div>
          </div>
          <div className="group-dropdown-main">
            <h3 className="group-dropdown-title"> Select a Group</h3>
            <div className="poll-create-dropdown-menu">
              <select onChange={(e) => this.setState({groupId: parseInt(e.currentTarget.value)})}
                className="poll-create-dropdown">
                <option value={null}>Select an optional grouping</option>
                {this.generateDropDowns()}
                <option value={-2}>
                  Ungrouped
                </option>
              </select>
              <div className="poll-create-overlay">
                <FontAwesome className="poll-create-carrot"
                  name="caret-down" size="2x"/>
              </div>
            </div>
          </div>
          <div className="middle-poll-create">
            <p>
              Or
            </p>
          </div>
          <div className="poll-create-new-group">
            <div className="new-group-title-banner">
              <h3 className="new-group-title">
                Create a New Group
              </h3>
              {this.generateErrors()}
            </div>

            <input
              className={this.state.error ?
                "poll-create-group-text group-error" :
                "poll-create-group-text"}
              onChange={(e) => this.setState({
                groupText: e.currentTarget.value}
              )}/>
          </div>
          <div className="poll-create-bottom-button">
            <button
              onClick={this.handleSubmit.bind(this)}
              className="create-new-group-button">
              Group
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (onClickOutside(PollCreateModal))
