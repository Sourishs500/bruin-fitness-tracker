
/*
Remaining Tasks
1) Write a function to generate graphs
2) Call that function so that the graph is displayed inside the first div area
*/
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Line } from 'react-chartjs-2'; 
import {
  Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Filler
} from 'chart.js';

ChartJS.register( 
    LineElement, CategoryScale, LinearScale, PointElement, Legend
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
    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {}
        }
    }

    const dates = [
        ["2/25/2024", "2/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"],
        ["3/25/2024", "3/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"],
        ["2/25/2024", "4/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"],
        ["2/25/2024", "5/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"],
        ["2/25/2024", "6/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"],
        ["2/25/2024", "7/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"]
    ]
    
    const datas = 
    [
        [
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
        ],
        [
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
        ],
        [
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
        ],
        [
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
        ],
        [
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
        ],
        [
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
            [25,50,75,100,125,150,175,200,250,300,350],
        ]    
    ]

    const graphData= useRef()

    const fetchData = async (name) => {
        const path = '/api/workouts/name/'.concat("", name)
        //console.log(name)
        const response = await fetch(path)
        const json = await response.json()

        if (response.ok){
            graphData.current = json;
        }
        console.log(json)
    }

    const [exercise, setExercise] = useState(0);
    const [measurement, setMeasurement] = useState(0);
    const [data, changeData] = useState({
        labels : dates[exercise], 
        datasets : [{ 
            label : measurements[measurement],
            data:  datas[exercise][measurement],
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            fill: true
            }],      
        });
    
    // console.log(exercise);
    // console.log(measurement);
    // console.log(datas[exercise][measurement])
    const ChangeGraph = async () => {
        changeData(
            {
            labels : dates[exercise], 
            datasets : [{ 
               label : measurements[measurement],
                data:  datas[exercise][measurement],
                backgroundColor: 'aqua',
                boderColor: 'black',
                pointBorderColor: 'aqua',
                fill: true
               }],
            }
        )
        // const graphData = await fetchData(allExercises[exercise])
    }
    return (
        <div>
            <div style={{ width: '600px', height: '300px', padding: '20px' }}> 
                <Line data={data} options={options}></Line>
            </div>
            <div>
                <select 
                    onChange={e => setExercise(e.target.value)} 
                    key={1} 
                    style={{ marginRight: "10px" }}
                >{
                    exCount.map(category => <option key={category} value={category}>{allExercises[category]}</option>)
                }</select>
                <select 
                    onChange={e => setMeasurement(e.target.value)} 
                    key={2} 
                    style={{ marginRight: "10px" }}
                >{
                    measCount.map(category => <option key={category} value={category}>{measurements[category]}</option>)
                }</select>
                
                <Button 
                    onClick = {()=>ChangeGraph()}
                    size="md"
                    key={3} 
                    style={{ marginBottom: "40px", marginTop: "15px" }}
                >Submit Request</Button>
            </div>
        </div>
    );
}
