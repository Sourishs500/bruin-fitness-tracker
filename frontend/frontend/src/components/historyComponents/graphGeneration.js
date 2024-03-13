
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
import 'chartjs-adapter-date-fns';

import {
  Chart as ChartJS, TimeScale, LineElement, CategoryScale, LinearScale, PointElement, Legend, Filler
} from 'chart.js';

ChartJS.register( 
    LineElement, CategoryScale, LinearScale, TimeScale, PointElement, Legend, Filler
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
        scales: {
            x: {
                type: 'time',
                time: {
                    unit:'day'    
                }, 
              },
        }
    }

    
    const [allExercises, setAllExercises] = useState(["Choose An Exercise"])
    
    const fetchExerciseNames = async () => {
        const path = '/api/workouts/names/getAllExerciseNames/'.concat("", username)
        
        if (username !== "")
        {
            // console.log(path)
            const response = await fetch(path)
            const json = await response.json()
            // console.log(json)
            if (response.ok){
                if(json.length !== 0)
                {
                    setAllExercises(["Choose An Exercise"].concat(json));
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
        if (username !== "" && exerciseName !== "Choose An Exercise")
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

        function compDate(a ,b)
        {
            // console.log("cDate")
            // console.log(a["date"])
            // console.log(b["date"])
            // console.log((new Date(a["date"])) < (new Date( b["date"])))
            
            if ((new Date(a["date"])) < (new Date( b["date"])))
            {
                return -1
            }
            if ((new Date(a["date"])) > (new Date( b["date"])))
            {
                return 1
            }
            if ((new Date(a["date"])) > (new Date( b["date"])))
            {
                return 0
            }
        }

        graphData.current.sort(compDate)

        changeData( 
            {
            labels : graphData.current.map(x => new Date (x["date"])), 
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
            <div style={{ width: '600px', height: '300px', padding: '20px', alignContent:"center"}}> 
                <Line data={data} options={options}></Line>
            </div>
            <div style = {{display:"flex", flexDirection:"row", justifyContent: "center", alignContent:"center"}}>
                <div>
                <select
                    onChange={e => setExercise(e.target.value)} 
                    onClick={() => fetchExerciseNames()}
                    key={1} 
                    style={{ margin: 5}}
                >{
                    exCount.map(category => <option key={category} value={category}>{allExercises[category]}</option>)
                }</select></div>
                <div><select 
                    onChange={e => setMeasurement(e.target.value)} 
                    key={2} 
                    style={{ margin: 5 }}
                >{
                    measCount.map(category => <option key={category} value={category}>{measurements[category]}</option>)
                }</select></div>
                <Button 
                    onClick = {()=>ChangeGraph()}
                    size="sm"
                    key={3} 
                    style={{ margin: 5}}
                >Submit Request</Button>
            </div>
        </div>
    );
}

