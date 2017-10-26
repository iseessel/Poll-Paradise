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
        <input key={idx} className="poll-create" placeholder="(Text or Image)"
          onChange={this.handleAnswerChoiceChange(idx).bind(this)}
          value={this.state.answerChoices[idx]}/>
      )
    })
  }

  handleXClick(e){
    this.props.history.push('/mypolls')
  }

  render(){
    return (
      <div className="main">
        <PollHeaderContainer/>
          <div className="create-poll">
            <div className="create-poll-banner">
              <button onClick={this.handleXClick.bind(this)} className="x-back-to-polls">
                X
              </button>
            </div>
          </div>
      <div className="main-poll">
          <div className="poll-form">
              <div className="poll-selection">

              </div>


          <form className="poll-creation"
            onSubmit={this.handleSubmit().bind(this)}>
            <div className="poll-inputs">
              <input
                className="poll-create"
                placeholder="Question"
                onChange={this.handleQuestionChange().bind(this)}
                value={this.state.question}
                />
              {this.generateAnswerChoiceInputs()}
              <div className="left-poll">
                <button className="poll-creation-plus"><FontAwesome name="plus" size="2x"/></button>
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
                  <button className="add-activity">Add another activity</button>
                  <button className="create">Create</button>
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

export default connect(null, mapDispatchToProps)(PollCreate)
