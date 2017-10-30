import React from 'react';
import { retrieveOneQuestion } from '../../actions/question_actions.js'
import { connect } from 'react-redux';
import ChartShow from './chart_show.jsx'
import { clearAnswerChoices } from '../../actions/answer_choice_actions.js';
import PollHeaderContainer from '../my_polls/poll_header_container.jsx'
import { Footer } from '../footer.jsx'

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
    fetchQuestion: (id) => dispatch(retrieveOneQuestion(id)),
    clearAnswerChoices: () => dispatch(clearAnswerChoices())
  }
}

class PollShowContainer extends React.Component{


  constructor(props){
    
    super(props)
    this.state = { loading: true }
  }

  componentDidMount(){
    this.props.fetchQuestion(this.props.match.params.id)
      .then(() => this.setState({loading: false}))
  }

  render(){
    if(!this.state.loading){
      return(
        <div className="main-polls-show">
          <PollHeaderContainer />
          <div className="chart-show-grid">
            <div className="chart-show-left">
              <ChartShow question={this.props.question}
                answerChoices={this.props.answerChoices}/>
            </div>
            <div className="chart-show-right">
              <div>

              </div>
            </div>
          </div>
          <Footer/>
        </div>
      )
    }else{
      return (
        <div className="loading">
        </div>
      )
    }

  }

  // <div className="chart-show-right-header">
  //   <p>
  //     Configure
  //   </p>
  // </div>
  // <div className="chart-show-right-body">
  //   <h4 className="how-to-respond-title">
  //     How people can respond
  //   </h4>
  //   <p className="how-to-respond-body">
  //
  //   </p>
  // </div>
  // <div className="chart-show-right-footer">
  //   <button className="delete">
  //     Activate
  //   </button>
  //   <button className="delete">
  //     Share
  //   </button>
  //   <button className="delete">
  //     Delete
  //   </button>
  // </div>

  componentWillUnmount(){
    this.props.clearAnswerChoices()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollShowContainer)
