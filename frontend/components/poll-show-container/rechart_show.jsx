import {BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import React from 'react'


// const userData = props.data[props.index]

class CustomTicks extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    debugger;
    if(this.props.payload.value.slice(0, 4) === "http"){
      return(
        <g transform={  "translate( " + this.props.x + "," + this.props.y + " )"}>
            <image
              x={-160}
              y={-(this.props.width)}
              width={150}
              textAnchor="middle"
              xlinkHref={this.props.payload.value}
            />
        </g>
      )
    }else {
      const shiftX = this.props.payload.value.length * 7
      return(
        <g transform={ "translate( " + this.props.x + "," + this.props.y + " )"}>
          <text
            x={-10 - shiftX}
            y={5}
            >
            {this.props.payload.value}
          </text>
        </g>
      )
    }
  }
}

class Chart extends React.Component{

  constructor(props){
    super(props)
  }

  generateData(){
    const data = this.props.answerChoices.map((answerChoice) => {
      const datum = { fill: "#4a89c3",
        amt: answerChoice.timesChosen,
        }
      answerChoice.imageUrl !== "/images/original/missing.png" ?
        datum["name"] = answerChoice.imageUrl :
        datum["name"] = answerChoice.body
      return datum
    });
    debugger;
    return data
  }

  percent(dec){
    return `${(dec * 100).toFixed(0)}%`;
  }


  render(){
    return(
        <ResponsiveContainer width='90%' height="95%">
          <BarChart
            width={600}
            height={300}
            data={this.generateData()}
            layout="vertical"
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis tickFormatter={this.percent}type="number"/>
            <YAxis tick={<CustomTicks/>} type="category" dataKey="name" />
            <Bar dataKey="amt" fill="#82ca9d" />
          </BarChart>

        </ResponsiveContainer>
    );
  }
}

export default Chart
