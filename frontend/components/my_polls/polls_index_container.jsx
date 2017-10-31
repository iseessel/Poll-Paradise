import React from 'react'
import { openModal, closeModal } from '../../actions/modal_actions.js'
import { connect } from 'react-redux';
import * as pollIndexSelector from '../../util/selectors/poll_index_selector.js';
import { retrieveGroups } from '../../actions/group_actions.js';
import QuestionItemContainer from './question_item_container';
import FontAwesome from 'react-fontawesome';
import GroupName from './group_name.jsx'



/* polls: [
  // {title: Seinfeld, id: 1, questions: [{}, {}]}
      },{}]

  */

const mapStateToProps = (state) => {

  return {
    polls: pollIndexSelector.allPolls(state.entities.groups,
      state.entities.questions),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    retrieveGroups: () => dispatch(retrieveGroups()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

class PollIndex extends React.Component{

  constructor(props){
    super(props)
    this.state = { loading: true }
  }

  componentDidMount(){
    //props will always have default ungrouped questions.
    if(this.props.polls.length === 1){
      setTimeout(() => this.props.retrieveGroups()
        .then(() => this.setState({loading: false})), 500)
    }else(
      this.setState({loading: false})
    )
  }

  handleGroupClick(){
    this.props.openModal("poll-create-modal")
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
              <div onClick={this.handleGroupClick.bind(this)}
                className="poll-banner-text">
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

}

export default connect(mapStateToProps, mapDispatchToProps)(PollIndex)
