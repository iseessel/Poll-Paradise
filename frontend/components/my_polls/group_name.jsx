import React from 'react';
import FontAwesome from 'react-fontawesome';
import QuestionIndexContainer from './question_index_container';


class GroupName extends React.Component{

  constructor(props){
    super(props)
    this.state = {clicked: true}
  }

  generateLis(questions){
    if (this.state.clicked){
      return questions.map((question, idx) => {
        return (
          <QuestionIndexContainer key={question.id} question={question} />
        );
      })
    }else {
      return (
        <div className="hidden">
        </div>
      )
    }
  }

  handleClick(){
    const clicked = this.state.clicked ? false : true
    this.setState({clicked: clicked})
  }

  selectedCarrot(){
    return this.state.clicked ? <FontAwesome name="caret-down" size="2x"/>
  : <FontAwesome name="caret-right" size="2x"/>
  }

  render(){
    return (
      <ul>
        <div className="group-bar">
          <div className="left-group">
              <p onClick={this.handleClick.bind(this)}>
                {this.selectedCarrot()}
              </p>
            <h2>{this.props.poll.title}</h2>
          </div>

          <div className="right-group-view">
            <p>{this.props.poll.questions.length}  activities</p>
          </div>
        </div>
        {this.generateLis(this.props.poll.questions)}
      </ul>
    )
  }
}

export default GroupName
