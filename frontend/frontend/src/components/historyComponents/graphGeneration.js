
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
    LineElement, CategoryScale, LinearScale, PointElement, Legend, Filler
); 


export default function GraphGeneration({username})
//One div box where the graph will go, [a selection for exercises, a selection for the type of statistic to display, a submit button]
/*
    functions defined:
        
    variables used:
        allExercises, measurements, exCount, measCount
*/

{ 
   
    const measurements = ["Maximum", "Minimum", "Mean", "Standard Deviation", "Sum", "Total Reps", "Total Sets"] //this is hard-coded and should stay that way
    const measurementsMap = {
                                "Maximum": 'max',
                                "Minimum": 'min',
                                "Mean": 'mean', 
                                "Standard Deviation": 'stddev',
                                "Sum": 'sum',
                                "Total Reps": 'totalreps',
                                "Total Sets": 'totalsets'
                            }
    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {}
        }
    }

    let checkIfCalled=true;

    
    const [allExercises, setAllExercises] = useState(["Choose An Exercise"])
    
    const fetchExerciseNames = async () => {
        const path = '/api/workouts/names/getAllExerciseNames/'.concat("", username)
        
        if (username != "")
        {
            // console.log(path)
            const response = await fetch(path)
            const json = await response.json()
            // console.log(json)
            if (response.ok){
                if(json.length != 0)
                {
                    setAllExercises(json);
                }
                else
                {
                    setAllExercises(["Choose An Exercise"]);
                } 
            }
        } 
        else
        {
            setAllExercises(["Choose An Exercise"]);
        }    
    }
    
    const graphData=useRef({})
    const fetchData = async (exerciseName, statistic) => {
        if (username != "" && exerciseName != "Choose An Exercise")
        {

            const path = '/api/workouts/statistics/'.concat("", username, "/", exerciseName, "/", statistic);
            //const path = '/api/workouts/statistics/sourish/Calf Raises/max'
            const response = await fetch(path)
            const json = await response.json()
            //console.log(json)
            if (response.ok){
                graphData.current = json;
            }
            
        } 
        else 
        {
            graphData.current = [];
        }
    }
    //console.log(graphData)
    //console.log(allExercises)

    const exCount = [...Array(allExercises.length).keys()]
    const measCount=[...Array(measurements.length).keys()]

    

    const [exercise, setExercise] = useState(0); //keeps track of exercise to display
    const [measurement, setMeasurement] = useState(0); //keeps track of measurement to display
    //data of graph
    const [data, changeData] = useState({ 
        labels : [],
        datasets : [{ 
            label : ["Please Choose an Exercise"],
            data:  [],
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            }]      
        });

    const ChangeGraph = async () => {
        const f = await fetchData(allExercises[exercise], measurementsMap[measurements[measurement]])
        
        changeData(
            {
            labels : graphData.current.map(x => x["date"]), 
            datasets : [{ 
               label : measurements[measurement],
                data:  graphData.current.map( x => x[measurementsMap[measurements[measurement]]]),
                backgroundColor: 'aqua',
                borderColor: 'black',
                pointBorderColor: 'aqua',
               }],
            }
        )
       
    }
    return (
        <div>
            <div style={{ width: '600px', height: '300px', padding: '20px' }}> 
                <Line data={data} options={options}></Line>
            </div>
            <div>
                <select 
                    onChange={e => setExercise(e.target.value)} 
                    onClick={() => fetchExerciseNames()}
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
                    size="sm"
                    key={3} 
                    style={{ marginBottom: "40px", marginTop: "15px" }}
                >Submit Request</Button>
            </div>
        </div>
    );
}

