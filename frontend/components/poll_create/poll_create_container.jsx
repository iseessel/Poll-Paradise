import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../actions/question_actions.js';
import ErrorsContainer from '../errors/errors_container.jsx'
import PollHeaderContainer from '../my_polls/poll_header_container.jsx';
import FontAwesome from 'react-fontawesome';
import { Route, Redirect } from 'react-router'
import { clearErrors } from '../../actions/errors.js'
import { ensureSelected } from '../../actions/ui_actions.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { retrieveGroups } from '../../actions/group_actions.js';


const mapStateToProps = (state) => {

  return {
    errors: state.ui.errors,
    groups: Object.values(state.entities.groups)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    createQuestion: (data) => dispatch(createQuestion(data)),
    clearErrors: () => dispatch(clearErrors()),
    retrieveGroups: () => dispatch(retrieveGroups()),
    ensureSelected: (id) => dispatch(ensureSelected(id))
  };
};

const _defaultState = {
  groupId: null,
  question: "",
  answerChoices: ["", "", ""],
  imageFiles: [false, false, false],
 }

class PollCreate extends React.Component{

  constructor(props){
    super(props)
    this.state = _defaultState
  }

  componentDidMount(){
    this.props.groups.length === 0 ? this.props.retrieveGroups() : null
  }

  componentWillUnmount(){
    this.props.clearErrors()
  }

  handleTrashClick(idx){
    return (e) => {
      e.preventDefault();
      this.deleteAnswerChoice(idx)
    }
  }

  handleKeyPress(idx){
    return (e) => {
      if(e.target.value === "" && e.key === "Backspace"){
        this.deleteAnswerChoice(idx)
      }
    }
  }

  deleteAnswerChoice(idx){
    const newAnswerChoiceState = this.state.answerChoices.slice(0)
    const newImageFilesState = this.state.imageFiles.slice(0)
    newAnswerChoiceState.splice(idx, 1);
    newImageFilesState.splice(idx, 1);
    this.setState({answerChoices: newAnswerChoiceState,
      imageFiles: newImageFilesState})
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
      answerChoices.push({body: body})
    }


    const question = { body: this.state.question,
      group_id: this.state.groupId }
    ;
    return {
      question: question,
      answer_choices: answerChoices
    };
  }

  handleSubmit(e){
    e.preventDefault();
    const data = this.packageData()
    const formData = new FormData();
    const formDataTwo = new FormData();

    //Image index will match with appropriate answer_choice.
    this.state.imageFiles.forEach((image) => {
      formData.append('images[]', image)
    })

    //formData does not support nested objects, so we have to JSON encode it.
    formData.append("question",
      JSON.stringify(data.question)
      )
    formData.append("answer_choices",
      JSON.stringify(data.answer_choices))
    return this.props.createQuestion(formData)
      .then(()=> this.props.ensureSelected(this.state.groupId))
      .then(()=>this.setState(_defaultState))
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
    const answerChoiceState = this.state.answerChoices.slice(0)
    const imageFilesState = this.state.imageFiles.slice(0)
    answerChoiceState.push("")
    imageFilesState.push(false)
    this.setState({answerChoices: answerChoiceState,
      imageFiles: imageFilesState})
  }

  hasQuestionError(){
    const allErrors = this.props.errors
    return allErrors.some((error) => error.hasOwnProperty("body"))
  }

  errorQuestionClassName(){
    return this.hasQuestionError() ? "poll-input-item question-error"
      : "poll-input-item"
  }

  generateQuestionError(){
    return this.hasQuestionError() ?
      <li className="question-error-message">
        Question cannot be blank
      </li>
    : <div></div>
  }

  hasAnswerChoiceError(){
    const allErrors = this.props.errors
    return allErrors.some((error) => error.hasOwnProperty("question"))
  }

  errorAnswerChoiceClassName(idx){
    return this.hasAnswerChoiceError() && idx === 0
     ? "poll-input-item answer-choice-error" : "poll-input-item"
  }

  generateAnswerChoiceError(idx){
    return this.hasAnswerChoiceError() ?
      <li className="answer-choice-error-message">
        Question must have at least one response item
      </li>
    : <div></div>
  }

  generateDropDowns(){
    return this.props.groups.map((group, idx) => {
      return(
        <option key={idx}
          className="dropdown-menu"
          value={group.id}>
        {group.title}
        </option>
      )
    })
  }

  updateFile(idx){

    return (e) => {
      const newState = this.state.imageFiles.slice(0)
      const file = e.currentTarget.files[0]
      newState[idx] = file
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({imageFiles: newState })
      }

      if (file){
        fileReader.readAsDataURL(file);
      }
    }
    
  }

  fileUpdatedClassName(idx){
    return this.state.imageFiles[idx] ? "file-upload file-uploaded" :
      "file-upload"
  }

  generateAnswerChoiceInputs(){
    return this.state.answerChoices.map((body, idx) => {
      return (
        <ReactCSSTransitionGroup key={idx} transitionName="example"
          transitionAppear={true} transitionAppearTimeout={500}
          transitionEnter={false} transitionLeave={false}>
          <div className="answer-choice-transition">
            <div className={this.errorAnswerChoiceClassName(idx)}>
              <input className="poll-input" placeholder="(Text or Image)"
                onKeyDown={this.handleKeyPress(idx).bind(this)}
                onChange={this.handleAnswerChoiceChange(idx).bind(this)}
                value={this.state.answerChoices[idx]}/>

              <div className={this.fileUpdatedClassName(idx)}>
                <span className="picture-upload">
                  <FontAwesome name="picture-o"/>
                </span>
                <input type="file"
                  tabIndex="-1"
                  className="input-file"
                  onChange={this.updateFile(idx).bind(this)}
                  />
              </div>

              <div className="delete-answer-choice"
                onClick={this.handleTrashClick(idx).bind(this)}>
                <FontAwesome name="trash" size="2x"/>
                  <li className="answer-choice-errors">
                  </li>
              </div>
            </div>
          </div>
       </ReactCSSTransitionGroup>
      )
    })
  }

  render(){
    ;
    return (
      <div className="main-poll-create">
        <PollHeaderContainer/>
          <ReactCSSTransitionGroup transitionName="example"
            transitionAppear={true} transitionAppearTimeout={500}
            transitionEnter={false} transitionLeave={false}>
        <div className="transition-wrapper">
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
              <div className="poll-question">
                <div className={this.errorQuestionClassName()}>
                  <input
                    className="poll-input question"
                    placeholder="Question"
                    onChange={this.handleQuestionChange.bind(this)}
                    value={this.state.question}
                    />
                    {this.generateQuestionError()}
                </div>
              </div>

              <div className="answer-choices">
                {this.generateAnswerChoiceError()}
                {this.generateAnswerChoiceInputs()}
              </div>

              <div className="left-poll">
                <button onClick={this.handlePlusClick.bind(this)}
                  className="poll-creation-plus"><FontAwesome name="plus" size="2x"/></button>
              </div>
            </div>

              <div className="bottom-create-buttons">
                <div className="left-create-banner">
                  <select onChange={(e) => this.setState({groupId: parseInt(e.currentTarget.value)})}
                    className="group-dropdown">
                    <option value={null}>Select an optional grouping</option>
                    {this.generateDropDowns()}
                  </select>
                  <div className="group-dropdown-overlay">
                    <FontAwesome className="group-overlay-carrot"
                      name="caret-down" size="2x"/>
                  </div>
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
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollCreate)
