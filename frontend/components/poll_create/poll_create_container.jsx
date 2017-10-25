import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../actions/question_actions.js';

// const mapStateToProps = (state) => {
// return {
//   polls: pollIndexSelector.allPolls(state.entities.groups,
//     state.entities.questions)
// };
// };

//data expected: { question: { group_id, body},
//                answer_choices: [{body},{},{}] }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createQuestion: (data) => dispatch(createQuestion(data))
  };
};

const _defaultState = {
  question: "",
  answer_choices: ["", "", ""]
}

class PollCreate extends React.Component{

  constructor(props){
    super(props)
    this.state = _defaultState
  }

  handleAnswerChoiceChange(idx){
    return (e) => {
      const newState = this.state.answer_choices.slice(0)
      newState[idx] = e.currentTarget.value
      this.setState({answer_choices: newState })
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
    const answer_choices = this.state.answer_choices.map((body)=> {
      return {
        body: body
      }
    })

    const question = { body: this.state.question }

    return {
      question: question,
      answer_choices: answer_choices
    };
  }

  generateAnswerChoiceInputs(){
    const that = this
    return this.state.answer_choices.map((body, idx) => {
      return (
        <label key={idx} className="answerchoice-input-element">
          <input onChange={this.handleAnswerChoiceChange(idx).bind(this)}
            value={this.state.answer_choices[idx]}/>
        </label>
      )
    })
  }

  render(){
    return (
      <form className="poll-creation"
        onSubmit={this.handleSubmit().bind(this)}>
        <label>
          <input className="question"
            onChange={this.handleQuestionChange().bind(this)}
            value={this.props.question}
            />
          {this.generateAnswerChoiceInputs()}
        </label>
        <button>Create</button>
      </form>
    )

  }
}

export default connect(null, mapDispatchToProps)(PollCreate)
