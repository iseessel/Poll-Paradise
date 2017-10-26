import React from 'react'
import { connect } from 'react-redux';
import * as pollIndexSelector from '../../util/selectors/poll_index_selector.js';
import { retrieveGroups } from '../../actions/group_actions.js';
import QuestionIndexContainer from './question_index_container.jsx';
import FontAwesome from 'react-fontawesome';
import GroupName from './group_name.jsx'



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
          <FontAwesome
            name='spinner'
            size='2x'
            pulse
          />
        </div>
      )
    }else {
      return (
        <div className="poll-view">
          <div className="poll-view-banner">
              <FontAwesome name="check" size="2x"/>
              <div className="poll-banner-text">
                Group
              </div>
          </div>
          {this.generateUls()}
        </div>
      );
    }
  }

  generateUls(){

    return this.props.polls.map((poll, idx) => {
      return (
        <GroupName key={idx} poll={poll}/>
      );
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
