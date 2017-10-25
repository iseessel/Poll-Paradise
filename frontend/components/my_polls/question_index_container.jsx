import React from 'react'
import { connect } from 'react-redux';
import { deleteQuestion } from '../../actions/question_actions.js';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteQuestion: (id) => dispatch(deleteQuestion(id))
  };
};

class QuestionIndexContainer extends React.Component{

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.deleteQuestion(this.props.question.id)
  }

  render(){
    return (
      <li>
        <div className="left-row-question">
          <FontAwesome name="wpforms" size="2x"/>
          <Link to="">{this.props.question.body}</Link>
        </div>
        <div className="right-row-question">
          <a onClick={this.handleClick}>Delete</a>
        </div>
      </li>
    );
  }
}

export default connect(null, mapDispatchToProps)(QuestionIndexContainer)
