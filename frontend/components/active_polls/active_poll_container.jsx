import React from 'react';
import { connect } from 'react-redux';
import { fetchUsersActiveQuestion } from '../../actions/question_actions.js'
import { updateTimesChosen } from '../../util/api/answer_choice_api_util.js'
import PollHeaderContainer from '../my_polls/poll_header_container.jsx';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const mapStateToProps = (state, ownProps) => {
  const question = Object.values(state.entities.questions)[0]
  const propQuestion = question ? question : {}
  return { question: propQuestion,
  answerChoices: Object.values(state.entities.answerChoices),
  errors: state.ui.errors
 }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsersActiveQuestion:
      (username) => dispatch(fetchUsersActiveQuestion(username)),
  }
}

class ActivePollContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {selectedId: null, loading: true}
  }

  componentDidMount(){
    const username = this.props.match.params.userName
    this.props.fetchUsersActiveQuestion(username)
      .then(() => this.setState(
        {selectedId: parseInt(localStorage.getItem(this.props.question.id))
        })
      )
      .then(() => this.setState({loading: false}))
  }

  handleAnswerChoiceClick(id){
    if(!this.state.selectedId){
      return (e) => {
        this.setState({selectedId: id})
        localStorage.setItem(this.props.question.id, id)
        updateTimesChosen(id, 1)
      }
    }else {
      return (e) => { }
    }
  }

  clearResponse(){
    if(this.state.selectedId){
      return (e) => {
        this.setState( {selectedId: null } )
        const answerChoiceId = localStorage.getItem(this.props.question.id)
        localStorage.setItem(this.props.question.id, null)
        updateTimesChosen(answerChoiceId, -1)
      }
    }else{
      return (e) => { }
    }
  }

  generateNumResponses(id){
    return this.state.selectedId === id ? "1" : "0"
  }

  generateLiClassName(id){
    return this.state.selectedId ?
    "answer-choice-item already-chosen" : "answer-choice-item not-chosen"
  }

  generateClearLastResponseButton(){
    if(this.state.selectedId){
      return (
        <button onClick={this.clearResponse().bind(this)}
            className="clear-last-response">
          Clear Last Response
        </button>
      )
    }else{
      return(
        <div className='clear-last-response inactive-response'></div>
      )
    }
  }

  generateAnswerChoices(){
    return this.props.answerChoices.map((answerChoice, idx) => {
      const body = answerChoice.imageUrl !== "/images/original/missing.png" ?
        <img style={{width: 125}} className="answer-choice-image" src={answerChoice.imageUrl}/> :
        <p className="answer-choice-text">{answerChoice.body}</p>

      return (
        <li key={idx} onClick={this.handleAnswerChoiceClick(answerChoice.id)}
          className={this.generateLiClassName(answerChoice.id)}>
          <div className="num-responses">
            {this.generateNumResponses(answerChoice.id)}
          </div>
          {body}
        </li>
      )
    })
  }
  render(){
    const question = this.props.question
    const questionText = this.props.question
      ? this.props.question.body : ""
    if(this.props.errors.length === 0){
      return (
        <div className="active-polls">
          <div className="main-poll-take">
            <header className="answer-question-header">
              <a href="/#/signup">
                <img className="white-logo" src={window.logoWhiteUrl}></img>
              </a>
            </header>
            <div className="question-header">
              <h2 className="question-title">{questionText}</h2>
              <h4 className="question-subheading">You can respond once</h4>
            </div>
            <ReactCSSTransitionGroup transitionName="answer-choice-group"
              transitionAppear={true} transitionAppearTimeout={500}
              transitionEnter={false} transitionLeave={false}>
            <ul className="possible-answer-choices">
              {this.generateAnswerChoices()}
              {this.generateClearLastResponseButton()}
            </ul>
          </ReactCSSTransitionGroup>
          </div>
        </div>
      )
    }else{
      return (
        <div className="no-active-polls">
            <div className="poll-not-found-messages">
              <h1 className='poll-not-found'>404</h1>
              <h2 className="no-active-polls-message">
                This user currently has no active polls.
              </h2>
            </div>
            <div className="link-to-login">
              <Link className="back-to-homepage" to="/">Go back to our homepage</Link>
            </div>
        </div>
      )
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ActivePollContainer)
