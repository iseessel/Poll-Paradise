import React from 'react';
import FontAwesome from 'react-fontawesome';
import QuestionItemContainer from './question_item_container.jsx';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/group_actions.js'
import { toggleSelected } from '../../actions/ui_actions.js';

const mapStateToProps = (state, ownProps) => {

  const groupsSelected = state.ui.groupsSelected
  const groupId = ownProps.poll.id
  const activeQuestions = ownProps.poll.questions.some(
    (question) => question.active
  )
  const alreadySelected = (groupsSelected.hasOwnProperty(groupId)
    && groupsSelected[groupId])
  return {
    selected: (alreadySelected || activeQuestions)
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSelected: (groupId) => dispatch(toggleSelected(groupId)),
    deleteGroup: (id) => dispatch(deleteGroup(id))
  };
};


class GroupName extends React.Component{

  constructor(props){
    super(props)
  }

  generateLis(questions){
    if (this.props.selected){
      return questions.map((question, idx) => {
        return (
          <QuestionItemContainer key={question.id} question={question} />
        );
      })
    }else {
      return (
        <div className="hidden">
        </div>
      )
    }
  }

  // handleDeleteClick(){
  //   return this.props.deleteGroup(this.props.poll.id)
  // }
  //
  // 
  // <a className="active"
  //   onClick={this.handleDeleteClick.bind(this)}>
  //   Delete
  // </a>
  //
  handleClick(){
    this.props.toggleSelected(this.props.poll.id)
  }

  selectedCarrot(){
    return this.props.selected ? <FontAwesome name="caret-down" size="2x"/>
  : <FontAwesome name="caret-right" size="2x"/>
  }

  numActivities(){
    const length = this.props.poll.questions.length
    if ( length === 0 ){
      return "no activities"
    }else if(length === 1){
        return "1 activity"
    }else{
      return `${length} activities`
    }

  }

  render(){
    return (
      <ul>
        <div className="group-bar">
          <div className="left-group">
              <p onClick={this.handleClick.bind(this)}>
                {this.selectedCarrot()}
              </p>
            <h2>{this.props.poll.title}</h2>
          </div>

          <div className="right-group-view">

            <p>{this.numActivities()}</p>
          </div>
        </div>
        {this.generateLis(this.props.poll.questions)}
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupName)
