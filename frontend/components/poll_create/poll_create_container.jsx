import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../actions/question_actions.js';
import ErrorsContainer from '../errors/errors_container.jsx'
import PollHeaderContainer from '../my_polls/poll_header_container.jsx';
import FontAwesome from 'react-fontawesome';



const mapStateToProps = (state) => {
  return {
    errors: state.errors
  };
}

//data expected: { question: { group_id, body},
//                answerChoices: [{body},{},{}] }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createQuestion: (data) => {
      return dispatch(createQuestion(data))}
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

  handleTrashClick(idx){
    return (e) => {
      e.preventDefault();
      const newState = this.state.answerChoices.slice(0)
      newState.splice(idx, 1);
      this.setState({answerChoices: newState })
    }
  }

  handleAnswerChoiceChange(idx){
    return (e) => {
      const newState = this.state.answerChoices.slice(0)
      newState[idx] = e.currentTarget.value
      this.setState({answerChoices: newState })
    }
  }

  handleQuestionChange(e){
    this.setState({question: e.currentTarget.value})
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

  handleSubmit(e){
    e.preventDefault();
    const data = this.packageData()
    this.setState(_defaultState)
    return this.props.createQuestion(data)
  }

  handleCreateClick(e){
    this.handleSubmit(e)
      .then(() => this.props.history.push('/mypolls'))

  }

  handleXClick(e){
    this.props.history.push('/mypolls')
  }

  handlePlusClick(e){
    e.preventDefault()
    const newState = this.state.answerChoices.slice(0)
    newState.push("")
    this.setState({answerChoices: newState })
  }

  hasQuestionError(){
    const allErrors = this.props.errors
    return allErrors.some((error) => error.hasOwnProperty("body"))
  }

  errorQuestionClassName(){
    return this.hasQuestionError() ? "poll-create question-error"
      : "poll-create"
  }

  generateQuestionError(){
    this.hasQuestionError() ?
      <li className="question-error">

      </li>
    : <div></div>
  }

  hasAnswerChoiceError(){
    const allErrors = this.props.errors
    return allErrors.some((error) => error.hasOwnProperty("question"))
  }

  errorAnswerChoiceClassName(){
    return this.hasAnswerChoiceError() ? "poll-create answer-choice-error"
      : "poll-create"
  }



  generateAnswerChoiceInputs(){
    return this.state.answerChoices.map((body, idx) => {
      return (
        <div className={this.errorAnswerChoiceClassName()}>
          <input key={idx} className="poll-create" placeholder="(Text or Image)"
            onChange={this.handleAnswerChoiceChange(idx).bind(this)}
            value={this.state.answerChoices[idx]}/>
          <div onClick={this.handleTrashClick(idx).bind(this)}
            className="delete-answer-choice">
            <FontAwesome name="trash" size="2x"/>
              <li className="answer-choice-errors">

              </li>
          </div>
        </div>
      )
    })
  }

  render(){
    return (
      <div className="main">
        <PollHeaderContainer/>
          <div className="create-poll">
            <div className="create-poll-banner">
              <div className="left-banner">
                <button onClick={this.handleXClick.bind(this)} className="x-back-to-polls">
                  X
                </button>
              </div>

              <div className="right-banner">
              </div>

            </div>
          </div>
      <div className="main-poll">
          <div className="poll-form">
              <div className="poll-selection">

              </div>


          <form className="poll-creation">
            <div className="poll-inputs">
              <input
                className={this.errorQuestionClassName()}
                placeholder="Question"
                onChange={this.handleQuestionChange.bind(this)}
                value={this.state.question}
                />
              {this.generateAnswerChoiceInputs()}
              <div className="left-poll">
                <button onClick={this.handlePlusClick.bind(this)}
                  className="poll-creation-plus"><FontAwesome name="plus" size="2x"/></button>
              </div>
            </div>

              <div className="bottom-create-buttons">

                <div className="left-create-banner">
                  <select className="group-dropdown">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>

                <div className="right-create-banner">
                  <button onClick={this.handleSubmit.bind(this)}
                    className="add-activity">Add another activity</button>
                  <button onClick={this.handleCreateClick.bind(this)} className="create">Create</button>
                </div>

              </div>
          </form>
          </div>
        </div>
      </div>
    )
    //make left-create-banner
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollCreate)
