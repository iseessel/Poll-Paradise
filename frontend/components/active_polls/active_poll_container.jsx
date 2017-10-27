import React from 'react';
import { connect } from 'react-redux';
import { fetchUsersActiveQuestion } from '../../actions/question_actions.js'
import { chooseAnswer } from '../../util/api/answer_choice_api_util.js'
import PollHeaderContainer from '../my_polls/poll_header_container.jsx';

const mapStateToProps = (state, ownProps) => {
  const question = Object.values(state.entities.questions)[0]
  const propQuestion = question ? question : {}
  return { question: propQuestion,
  answerChoices: Object.values(state.entities.answerChoices) }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsersActiveQuestion:
      (username) => dispatch(fetchUsersActiveQuestion(username)),

  }
}
//this is not working because while it is changing local storage,
//it is NOT changing our state
//perhaps set state?
class ActivePollContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {selectedId: null}
  }

  componentDidMount(){
    const username = this.props.match.params.userName
    this.props.fetchUsersActiveQuestion(username)
      .then(() => this.setState(
        {selectedId: parseInt(localStorage.getItem(this.props.question.id))
      })
    )}

  handleAnswerChoiceClick(id){
    if(!this.state.selectedId){
      return (e) => {
        this.setState({selectedId: id})
        localStorage.setItem(this.props.question.id, id)
        chooseAnswer(id)
      }
    }else {
      return (e) => {
        console.log("You cannot do that!")
      }
    }

  }

  generateNumResponses(id){
    debugger;
    return this.state.selectedId === id ? "1" : "0"
  }

  generateLiClassName(id){
    const question = this.props.question
    return (question &&
    this.state.selectedId === id) ?
    "answer-choice-item chosen" : "answer-choice-item not-chosen"
  }

  generateUlClassName(){
    const question = this.props.question
    return (question &&
    this.state.selectedId) ? "possible-answer-choices not-yet-chosen"
      : "possible-answer-choices already-chosen"
  }

  generateAnswerChoices(){
    return this.props.answerChoices.map((answerChoice) => {
      return (
        <li onClick={this.handleAnswerChoiceClick(answerChoice.id)}
          className={this.generateLiClassName(answerChoice.id)}>
          <div className="num-responses">
            {this.generateNumResponses(answerChoice.id)}
          </div>
          <p>{answerChoice.body}</p>
        </li>
      )
    })
  }
  render(){
    const question = this.props.question
    const questionText = this.props.question
      ? this.props.question.body : ""


    return (
      <div className="main-poll-take">
        <header className="answer-question-header">

        </header>
        <div className="question-header">
          <h2 className="question-title">{questionText}</h2>
          <h4 className="question-subheading">You can respond once</h4>
        </div>
        <ul className={this.generateUlClassName()}>
          {this.generateAnswerChoices()}
        </ul>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ActivePollContainer)
