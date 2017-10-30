import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import onClickOutside from 'react-onclickoutside'


//onClickOutside this //disable scrolling // style

const mapStateToProps = (state) => {

  return {
    currentUser: state.session.currentUser
  }
}

class ActivePollLink extends React.Component{

  constructor(props){

    super(props)
  }

  handleClickOutside(){
    this.props.closeModal()
  }

  render(){
    const activePollsUrl
      = "https://poll-paradise.herokuapp.com/#/active_polls/" +
      this.props.currentUser.username
    return (
      <div className="share-modal">
        <div className="share-modal-header">
          <p className="active-share">Share</p>
          <button onClick={this.handleClickOutside.bind(this)} className="close-modal">
            <FontAwesome className="window-close" name="window-close" size="2x"/>
          </button>
        </div>
        <div className="share-modal-main-content">
          <h4 className="shareable-response-link">
            <a href={activePollsUrl}>Shareable response link</a>
          </h4>
          <p className="shareable-response-subheader">
            Use this link to share with people on the web.</p>
            <input value={activePollsUrl} onClick={(e) => e.target.select()}className="poll-link" readOnly={true}/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(onClickOutside(ActivePollLink))
