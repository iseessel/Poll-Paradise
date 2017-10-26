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
    this.state = {active: false};
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleClick(){

    this.props.deleteQuestion(this.props.question.id)
  }

  handleMouseEnter(){
    this.setState({active: true})
  }

  handleMouseLeave(){
    this.setState({active: false})
  }

  activeClassName(){
    return this.state.active ? "active" : "inactive"
  }

  render(){
    return (
        <li className="question-view" onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          <div className="left-row-question">
            <FontAwesome name="wpforms" size="2x"/>
            <Link to="">{this.props.question.body}</Link>
          </div>
          <div className="right-row-question">
            <a className={this.activeClassName()}
              onClick={this.handleClick}>Delete</a>
          </div>
        </li>
    );
  }
}

export default connect(null, mapDispatchToProps)(QuestionIndexContainer)
