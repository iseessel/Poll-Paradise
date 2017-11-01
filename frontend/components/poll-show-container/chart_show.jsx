import React from 'react'
import { HorizontalBar } from 'react-chartjs-2';

class ChartShow extends React.Component{

  constructor(props){

    super(props)
  }

  componentDidMount(){

  }

  totalNumResponses(){

    let totalNumResponses = 0
    this.props.answerChoices.forEach((answerChoice) => {
      totalNumResponses += answerChoice.timesChosen
    })
    return totalNumResponses
  }

  generateOptions(){
    return {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
              min: 0,
              max: 100,
              callback: function(value){
                return value + "%"
              },
              stepSize: 10,
              fontColor: '#303334',
              fontFamily: "Source Sans Pro",
              fontSize: 15,
              fontStyle: 'bold'
            },
            scaleLabel:{
              display: true,
              labelString: "Percentage"
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
        yAxes: [{
          ticks: {
            fontColor: '#303334',
            fontFamily: "Source Sans Pro",
            fontSize: 25,
            },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            }
          }]
      }
    }
  }

  generateData(){
    const totalNumResponses = this.totalNumResponses()
    const labels = []
    const data = []
    let percentage;
    this.props.answerChoices.forEach((answerChoice) => {
      labels.push(answerChoice.body)
      percentage =
        Math.round(
          answerChoice.timesChosen/totalNumResponses * 100
        )
      data.push(percentage)
    })
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          label: "Percent Chosen",
          backgroundColor: '#5491C9'
        }
      ]
    }
  }

  render(){
    debugger;
    return (
      <div className="chart">
        <img src={this.props.question.imageUrl} />
        <h1 className="chart-title">{this.props.question.body}</h1>
        <HorizontalBar data={this.generateData()}
          options={this.generateOptions()}/>
      </div>
    )
  }
}

export default ChartShow
