import React from 'react';
import { retrieveOneQuestion } from '../../actions/question_actions.js'
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  debugger
  const questions = state.entities.questions
  const wildcardId = ownProps.match.params.id
  const question = questions[wildcardId] ? questions[wildcardId] : {}
  const answers = Object.values(state.entities.answerChoices)
  const AnswerChoices = answers ? answers : []
  debugger
  return {
    question: question,
    answerChoices: AnswerChoices
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchQuestion: (id) => dispatch(retrieveOneQuestion(id))
  }
}

class PollShowContainer extends React.Component{


  constructor(props){
    debugger;
    super(props)
  }

  componentDidMount(){
    this.props.fetchQuestion(this.props.match.params.id)
  }

  render(){
    debugger;
    return(
      <div>
        {this.props.question.body}
        {this.props.answerChoices.map((answerChoice, idx) => {
          return (
            <li key={idx}>
              {answerChoice.body}
              {answerChoice.times_chosen}
            </li>
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollShowContainer)
