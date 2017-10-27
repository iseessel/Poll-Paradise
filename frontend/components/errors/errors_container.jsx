import React from 'react';
import { clearErrors } from '../../actions/errors.js';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearErrors: (user) => dispatch(clearErrors())
  };
};

const mapStateToProps = (state) => {
  return {
    errors: state.ui.errors
  };
}

//map state to props here; get rid of session errors reducer;

class Errors extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const liClassName = this.props.correctClass + "-li"
    const errors = this.props.errors.map(
      (error, idx) => <li className={liClassName} key={idx}>{error}</li>);

    return (
        <ul className={this.props.correctClass}>
          {errors}
        </ul>
    );
  }

  componentWillMount(){
    this.props.clearErrors();
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
