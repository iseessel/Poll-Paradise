import {BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import React from 'react'


// const userData = props.data[props.index]

class CustomTicks extends React.Component{

  constructor(props){
    debugger;
    super(props)
  }

  render(){
    return (
    <g transform={  "translate( " + this.props.x + "," + this.props.y + " )"}>
      <image
        x={-100}
        y={-(this.props.width * .9)}
        width={100}
        height={100}
        textAnchor="middle"
        xlinkHref="https://www.runnersworld.com/sites/runnersworld.com/files/styles/listicle_slide_custom_user_phone_1x/public/beagle2.jpg?itok=lv5EvG-2"
      />
    </g>
    )
  }
}

class Chart extends React.Component{

  constructor(props){
    // debugger;
    super(props)
  }

  // generateDate(){
  //   return this.props.answerChoices.map((answerChoice) => {
  //     const data = { fill: "#4a89c3",
  //       value: answerChoice.timesChosen }
  //     answerChoice.imageU
  //       ? data[name] = answerChoice.imageURl
  //       : data[name] = answerChoice.body
  //     return data
  //   });
  // }


  generateCustomTicks(){
    this.state.answerChoices.forEach((answerChoice) => {

    })
  }

  render(){
    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page E', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page F', uv: 2000, pv: 9800, amt: 2290},
    ];
    return(
      <ResponsiveContainer width='90%'>
        <BarChart
          width={600}
          height={300}
          data={data}
          layout="vertical"
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis type="number"/>
          <YAxis tick={<CustomTicks/>} type="category" dataKey="name" />
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>

      </ResponsiveContainer>
    );
  }
}

export default Chart
