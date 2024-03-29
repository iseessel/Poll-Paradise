import React from 'react';
import { retrieveOneQuestion } from '../../actions/question_actions.js'
import { connect } from 'react-redux';
import { clearAnswerChoices } from '../../actions/answer_choice_actions.js';
import PollHeaderContainer from '../my_polls/poll_header_container.jsx'
import { Footer } from '../footer.jsx'
import FontAwesome from 'react-fontawesome';
import MyModal from '../myModal.jsx'
import Chart from './rechart_show.jsx'
import ActivePollLinkContainer from '../my_polls/active_poll_link_container.jsx'
import { deleteQuestion, activateQuestion } from '../../actions/question_actions.js';
import { openModal, closeModal } from '../../actions/modal_actions.js'

const mapStateToProps = (state, ownProps) => {

  const questions = state.entities.questions
  const wildcardId = ownProps.match.params.id
  const question = questions[wildcardId] ? questions[wildcardId] : null
  const answerChoices = state.entities.answerChoices

  return {
    question: question,
    answerChoices: answerChoices,
    currentUser: state.session.currentUser,
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchQuestion: (id) => dispatch(retrieveOneQuestion(id)),
    clearAnswerChoices: () => dispatch(clearAnswerChoices()),
    deleteQuestion: (id) => dispatch(deleteQuestion(id)),
    activateQuestion: (id) => dispatch(activateQuestion(id)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  }
}

class PollShowContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = { loading: true}
  }

  componentDidMount(){
    const questionId = this.props.match.params.id

    //Put answer choices in the state so that we can use web sockets.
    this.props.fetchQuestion(questionId)
      .then(() => this.setState({answerChoices: this.props.answerChoices}))
      .then(() => this.setState({loading: false}))
      .then(this.setUpWebSocket.bind(this))
  }

  setUpWebSocket(){

    let pusher = new Pusher('c46aa86a38d2bd68ba6c', {
      cluster: 'us2',
      encrypted: true
    });

    const questionId = this.props.match.params.id
    //Dynamically set up subscription channel based on the questionId.
    const subscriptionChannel = "update_question_" + questionId

    let channel = pusher.subscribe(subscriptionChannel);
      channel.bind('update_answer_choices', function(data){
        //Update state so that our charts reflect new data.
        const newState = Object.assign({}, this.state.answerChoices)
        const newAnswerChoice = Object.assign({}, newState[data.id],
          {timesChosen: data.times_chosen})

        newState[data.id] = newAnswerChoice
        this.setState({answerChoices: newState})
      }.bind(this));
  }

  handleActivateClick(){
    return this.props.activateQuestion(this.props.question.id)
  }

  handleDeleteClick(){
    this.props.history.push('/mypolls')
    this.props.deleteQuestion(this.props.question.id)
  }

  handleShareClick(){
    this.props.question.active ?
      this.props.openModal("active-poll-link") :
      this.handleActivateClick()
      .then(() => this.props.openModal("active-poll-link"))
  }

  render(){
    const activePollsUrl
      = "https://poll-paradise.herokuapp.com/#/active_polls/" +
      this.props.currentUser.username

    if(!this.state.loading){
      return(
        <div className="main-polls-show">

          <MyModal component={ActivePollLinkContainer}
            modal={this.props.modal}
            closeModal={this.props.closeModal}/>

          <div className="chart-show-grid">
            <div className="chart-show-left">
              <h1 className="chart-title">{this.props.question.body}</h1>
              <Chart answerChoices={Object.values(this.state.answerChoices)}
                question={this.props.question}/>
            </div>
            <div className="chart-show-right">
              <div className="chart-show-right-body">
                <h4 className="how-to-respond-title">
                  How people can respond
                </h4>
                <div className="how-to-respond">
                  <p className="how-to-respond-body">
                    Audience can respond as long as the poll is active.
                    <br/>
                  </p>
                  <h4 className="website-response">
                    <FontAwesome className="globe" name="globe" size="2x"/>
                    Website: {'  '}
                  {this.props.question.active ? <span className="active">
                    Active
                  </span> :
                    <span className="inactive">
                      Deactivated
                    </span>}
                  </h4>
                </div>
              </div>
              <div className="chart-show-right-footer">
                <button onClick={this.handleActivateClick.bind(this)}
                  className="chart-show-activate">
                  {this.props.question.active ?
                    <p className="deactivated">Deactivate</p> :
                    <p className="activated">Activate</p> }
                </button>
                <button onClick={this.handleShareClick.bind(this)}
                  className="chart-show-share">
                  Share
                </button>
                <button onClick={this.handleDeleteClick.bind(this)}
                  className="chart-show-delete">
                  Delete
                </button>

              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <div className="main-polls-show">
          <PollHeaderContainer />
            <div className="loading">
              <FontAwesome
                name='spinner'
                size='2x'
                pulse
              />
            </div>
        </div>

      )
    }

  }

}


export default connect(mapStateToProps, mapDispatchToProps)(PollShowContainer)
