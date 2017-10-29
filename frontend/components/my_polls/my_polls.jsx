import React from 'react'
import PollIndexContainer from './polls_index_container.jsx';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import PollHeaderContainer from './poll_header_container.jsx'
import { Footer } from '../footer.jsx';
import { closeModal } from '../../actions/modal_actions.js'
import MyModal from '../myModal.jsx'
import ActivePollLinkContainer from './active_poll_link_container.jsx'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    modal: state.ui.modal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

class MyPolls extends React.Component{

  constructor(props){
    super(props)
  }

  bodyClassName(){
    return this.props.modal ? "my-polls-body modal-open" : "my-polls-body"
  }

  render(){

    return (
      <div className="my-polls">

        <MyModal component={ActivePollLinkContainer}
          modal={this.props.modal}
          closeModal={this.props.closeModal}/>

        <div className={this.bodyClassName()}>
          <PollHeaderContainer />
          <div className="main-polls">
            <div className="my-polls-sidebar">
              <button onClick={() => this.props.history.push('create')}>Create</button>
            </div>

            <div className="polls-index">
              <PollIndexContainer />
            </div>
          </div>
          <Footer />
        </div>

      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyPolls)
