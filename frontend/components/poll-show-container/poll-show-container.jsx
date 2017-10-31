import React from 'react';
import { retrieveOneQuestion } from '../../actions/question_actions.js'
import { connect } from 'react-redux';
import ChartShow from './chart_show.jsx'
import { clearAnswerChoices } from '../../actions/answer_choice_actions.js';
import PollHeaderContainer from '../my_polls/poll_header_container.jsx'
import { Footer } from '../footer.jsx'
import FontAwesome from 'react-fontawesome';
import MyModal from '../myModal.jsx'
import ActivePollLinkContainer from '../my_polls/active_poll_link_container.jsx'
import { deleteQuestion, activateQuestion } from '../../actions/question_actions.js';
import { openModal, closeModal } from '../../actions/modal_actions.js'


const mapStateToProps = (state, ownProps) => {

  const questions = state.entities.questions
  const wildcardId = ownProps.match.params.id
  const question = questions[wildcardId] ? questions[wildcardId] : {}
  const answers = Object.values(state.entities.answerChoices)
  const AnswerChoices = answers ? answers : []

  return {
    question: question,
    answerChoices: AnswerChoices,
    currentUser: state.session.currentUser,
    modal: state.ui.modal
  }
}

//
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
    this.state = { loading: true }
  }


  handleActivateClick(){
    console.log("hello")
    return this.props.activateQuestion(this.props.question.id)
  }

  handleDeleteClick(){
    return this.props.deleteQuestion(this.props.question.id)
    .then(() => this.props.history.push('/mypolls'))
  }

  handleShareClick(){
    this.props.question.active ?
      this.props.openModal("active-poll-link") :
      this.handleActivateClick()
      .then(() => this.props.openModal("active-poll-link"))
  }


  componentDidMount(){
    this.props.fetchQuestion(this.props.match.params.id)
      .then(() => this.setState({loading: false}))

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

          <PollHeaderContainer />
          <div className="chart-show-grid">
            <div className="chart-show-left">
              <ChartShow question={this.props.question}
                  answerChoices={this.props.answerChoices}/>
            </div>
            <div className="chart-show-right">
              <div className="chart-show-right-body">
                <h4 className="how-to-respond-title">
                  How people can respond
                </h4>
                <div className="how-to-respond">
                  <h4 className="website-response">
                    <FontAwesome className="globe" name="globe" size="2x"/>
                    Website:{'  '}
                  {this.props.question.active ? <span className="active">
                    Active
                  </span> :
                    <span className="inactive">
                      Deactivated
                    </span>}

                  </h4>
                  <p className="how-to-respond-body">
                    Audience can respond <a className="respond-modal-here">here</a>
                    as long as the poll is active.
                    <br/>
                  </p>
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
        <div className="loading">
          <FontAwesome
            name='spinner'
            size='2x'
            pulse
          />
        </div>
      )
    }

  }


  componentWillUnmount(){
    // Need to clear the answer choices, or else when we
    // navigate to another page and click a different
    this.props.clearAnswerChoices()
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PollShowContainer)
