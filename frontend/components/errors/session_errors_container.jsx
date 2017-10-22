import React from 'react';
import { clearSessionErrors } from '../../actions/session_actions.js';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearErrors: (user) => dispatch(clearSessionErrors())
  };
};

class Errors extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const errors = this.props.errors.map((error, idx) => <li key={idx}>{error}</li>);
    return (
      <ul className="session-errors">
        <p>{errors}</p>
      </ul>
    );
  }

  componentWillMount(){
    this.props.clearErrors();
  }

}

export default connect(null, mapDispatchToProps)(Errors);
