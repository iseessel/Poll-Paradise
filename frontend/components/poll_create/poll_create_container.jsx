import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../actions/question_actions.js';
import ErrorsContainer from '../errors/session_errors_container.jsx'
import PollHeaderContainer from '../my_polls/poll_header_container.jsx';
import FontAwesome from 'react-fontawesome';


// const mapStateToProps = (state) => {
// return {
//   polls: pollIndexSelector.allPolls(state.entities.groups,
//     state.entities.questions)
// };
// };

//data expected: { question: { group_id, body},
//                answerChoices: [{body},{},{}] }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createQuestion: (data) => dispatch(createQuestion(data))
  };
};

const _defaultState = {
  question: "",
  answerChoices: ["", "", ""]
}

class PollCreate extends React.Component{

  constructor(props){
    super(props)
    this.state = _defaultState
  }

  handleAnswerChoiceChange(idx){
    return (e) => {
      const newState = this.state.answerChoices.slice(0)
      newState[idx] = e.currentTarget.value
      this.setState({answerChoices: newState })
    }
  }

  handleQuestionChange(){
    return (e) => {
      this.setState({question: e.currentTarget.value})
    };
  }

  handleSubmit(){
    return (e) => {
      e.preventDefault();
      const data = this.packageData()
      this.props.createQuestion(data)

      this.setState(_defaultState)
    }
  }

  packageData(){
    const userInputAnswerChoices = this.state.answerChoices
    let answerChoices = []
    let body
    for (let i = 0; i < userInputAnswerChoices.length; i++){
      body = userInputAnswerChoices[i]
      if(body){
        answerChoices.push({body: body })
      }
    }

    const question = { body: this.state.question }
    ;
    return {
      question: question,
      answer_choices: answerChoices
    };
  }

  generateAnswerChoiceInputs(){
    return this.state.answerChoices.map((body, idx) => {
      return (
        <label className="answerchoice-input-element" key={idx}>
          <input className="poll-create" placeholder="(Text or Image)"
            onChange={this.handleAnswerChoiceChange(idx).bind(this)}
            value={this.state.answerChoices[idx]}/>
        </label>
      )
    })
  }

  render(){
    return (
      <div className="main">
        <PollHeaderContainer/>
          <div className="create-poll">
            <div className="create-poll-banner">
              <button className="x-back-to-polls">
                X
              </button>
            </div>
          </div>
      <div className="main-poll">
        <div className="poll-selection">

        </div>

        <div className="poll-form"></div>
          <form className="poll-creation"
            onSubmit={this.handleSubmit().bind(this)}>
              <label className="question">
                <input
                  className="poll-create"
                  placeholder="Question"
                  onChange={this.handleQuestionChange().bind(this)}
                  value={this.state.question}
                  />
              </label>
              {this.generateAnswerChoiceInputs()}
              <button><FontAwesome name="plus" size="2x"/></button>
            <button>Add another activity</button>
            <button>Create</button>
          </form>
        </div>
      </div>
    )

  }
}

export default connect(null, mapDispatchToProps)(PollCreate)
