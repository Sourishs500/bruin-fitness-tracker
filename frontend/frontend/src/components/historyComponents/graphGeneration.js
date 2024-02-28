
/*
Remaining Tasks
1) Write a function to generate graphs
2) Call that function so that the graph is displayed inside the first div area
*/
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Line } from 'react-chartjs-2'; // corrected import
import {
  Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement
} from 'chart.js';

ChartJS.register( // corrected typo from ChatJS to ChartJS
    LineElement, CategoryScale, LinearScale, PointElement
); 


export default function GraphGeneration()
//One div box where the graph will go, [a selection for exercises, a selection for the type of statistic to display, a submit button]
/*
    functions defined:
        
    variables used:
        allExercises, measurements, exCount, measCount
*/

{ 
    const allExercises = ["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"] //hard-coded for now
    const measurements = ["Average", "Maximum", "Minimum"] //this is hard-coded and should stay that way
    const exCount = [...Array(allExercises.length).keys()]
    const measCount=[...Array(measurements.length).keys()]
    const data = {
       labels : ["2/25/2024", "2/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"], 
     datasets : [{ 
        labels : "The average workout exercises",
         data: [100,150,200,250,300,350,400,450,500,550],
         backgroundColor: 'aqua',
         boderColor: 'black',
         pointBorderColor: 'aqua',
         fill: true
        }
    ] 
}
    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {}
        }
    }
    return (
        <div>
            <div style={{ width: '600px', height: '300px', padding: '20px' }}> 
                <Line data={data} options={options}></Line>
            </div>
            <div>
                <select key={1} style={{ marginRight: "10px" }}>{exCount.map(category => <option key={category} value="Type of Exercise">{allExercises[category]}</option>)}</select>
                <select key={2} style={{ marginRight: "10px" }}>{measCount.map(category => <option key={category} value="Type of Measurement">{measurements[category]}</option>)}</select>
                <Button size="sm" key={3} style={{ marginBottom: "40px", marginTop: "15px" }}>Submit Request</Button>
            </div>
        </div>

    );
}