import React from 'react'
import { Bar } from 'react-chartjs-2';

class ChartShow extends React.Component{

  constructor(props){
    super(props)
  }

  correctStepSize(){
    let totalNumResponses = 0
    this.props.answerChoices.forEach((answerChocie) => {
      totalNumResponses += answerChoice.num_responses
    })
  }

  generateOptions(){
    return {
      title: {
        display: true,
        text: this.props.question.title,
      },
      scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
        }]
      }
    }
  }

  generateData(){
    const labels = []
    const data = []
    this.props.answerChoices.forEach((answerChoice) => {
      labels.push(answerChoice.body)
      data.push(answerChoice.times_chosen) // ?
    })
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }
  }

  render(){
    return (
      <div className="chart">
        <Bar data={this.generateData()}
          options={this.generateOptions()}/>
      </div>
    )
  }
}

export default ChartShow
