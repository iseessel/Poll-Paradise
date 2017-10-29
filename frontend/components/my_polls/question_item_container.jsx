import React from 'react'
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions.js'
import { deleteQuestion, activateQuestion } from '../../actions/question_actions.js';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteQuestion: (id) => dispatch(deleteQuestion(id)),
    activateQuestion: (id) => dispatch(activateQuestion(id)),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

class QuestionItemContainer extends React.Component{

  constructor(props){

    super(props)
    this.state = {mouseover: false};
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleActivateClick = this.handleActivateClick.bind(this)
    this.handleShareClick = this.handleShareClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleActivateClick(){
    return this.props.activateQuestion(this.props.question.id)
  }

  handleDeleteClick(){
    return this.props.deleteQuestion(this.props.question.id)
  }

  handleShareClick(){
    this.props.question.active ?
      this.props.openModal("active-poll-link") :
      this.handleActivateClick()
      .then(() => this.props.openModal("active-poll-link"))
  }

  handleMouseEnter(){
    this.setState({mouseover: true})
  }

  handleMouseLeave(){
    this.setState({mouseover: false})
  }

  mousoverClassName(){
    return this.state.mouseover ? "active" : "inactive"
  }

  activeQuestionClassName(){
    return this.props.question.active ? "active-question question-view"
      : "question-view"
  }

  activeThumbIcon(){
    return this.props.question.active ?
    <FontAwesome title="Deactivate" name="thumbs-down" size="2x"/> :
    <FontAwesome title="Activate" name="thumbs-up" size="2x"/>

  }

  render(){
    const linkUrl = '/polls/' + this.props.question.id
    return (
        <li className={this.activeQuestionClassName()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          <div className="left-row-question">
            <FontAwesome name="wpforms" size="2x"/>
            <Link to={linkUrl}>{this.props.question.body}</Link>
          </div>
          <div className="right-row-question">

            <a className={this.mousoverClassName()}
              onClick={this.handleDeleteClick}>Delete
            </a>
              <a className={this.mousoverClassName()}
                onClick={this.handleShareClick}>
                Share
              </a>
              <a className={this.mousoverClassName()}
                onClick={this.handleActivateClick}>
                {this.activeThumbIcon()}
              </a>

          </div>
        </li>
    );
  }
}

export default connect(null, mapDispatchToProps)(QuestionItemContainer)
