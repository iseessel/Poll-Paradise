import React from 'react'
import { connect } from 'react-redux';
import * as pollIndexSelector from '../../util/selectors/poll_index_selector.js';
import { retrieveGroups } from '../../actions/group_actions.js';
import QuestionIndexContainer from './question_index_container.jsx';
import FontAwesome from 'react-fontawesome';



/* polls: [
  // {title: Seinfeld, id: 1, questions: [{}, {}]}
      },{}]

  */

const mapStateToProps = (state) => {
  return {
    polls: pollIndexSelector.allPolls(state.entities.groups,
      state.entities.questions)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    retrieveGroups: () => dispatch(retrieveGroups())
  };
};

class PollIndex extends React.Component{

  constructor(props){
    super(props)
    this.state = { loading: true }
  }

  componentDidMount(){
    this.props.retrieveGroups().then(() => this.setState({loading: false}))
  }

  render(){
    if (this.state.loading){
      return(
        <div className="loading">

        </div>
      )
    }else {
      return (
        <div className="poll-view">
          {this.generateUls()}
        </div>
      );
    }
  }

  generateUls(){
    return this.props.polls.map((poll) => {
      return (
        <ul>
          <div className="group-bar">
            <div className="left-group">
              <FontAwesome name="caret-down" size="2x"/>
              <h2>{poll.title}</h2>
            </div>

            <div className="right-group-view">
              <p>{poll.questions.length}  activities</p>
            </div>
          </div>
          {this.generateLis(poll.questions)}
        </ul>
      )
    })
  }

  generateLis(questions){
    return questions.map((question, idx) => {
      return (
        <QuestionIndexContainer key={question.id} question={question} />
      );
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollIndex)
