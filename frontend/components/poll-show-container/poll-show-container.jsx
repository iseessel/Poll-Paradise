import React from 'react';
import { retrieveOneQuestion } from '../../actions/question_actions.js'
import { connect } from 'react-redux';
import ChartShow from './chart_show.jsx'


const mapStateToProps = (state, ownProps) => {

  const questions = state.entities.questions
  const wildcardId = ownProps.match.params.id
  const question = questions[wildcardId] ? questions[wildcardId] : {}
  const answers = Object.values(state.entities.answerChoices)
  const AnswerChoices = answers ? answers : []
  
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
    super(props)

  }

  componentDidMount(){
    this.props.fetchQuestion(this.props.match.params.id)
  }

  render(){


    return(
      <div>
        <ChartShow question={this.props.question}
          answerChoices={this.props.answerChoices}/>
        {this.props.question.body}
        {this.props.answerChoices.map((answerChoice, idx) => {
          return (
            <li key={idx}>
              {answerChoice.body}
              {answerChoice.timesChosen}
            </li>
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollShowContainer)
