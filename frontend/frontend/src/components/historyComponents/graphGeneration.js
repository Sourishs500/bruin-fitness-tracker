
/*
Remaining Tasks
1) Write a function to generate graphs
2) Call that function so that the graph is displayed inside the first div area
*/
import Button from 'react-bootstrap/Button';

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

    return (
        <div>
            <div style={{"width":"300px", "height":"300px", "border":"1px solid black", marginTop:"20px"}}> </div>
            <div>
                <select key={1} style={{marginRight:"10px"}}>{exCount.map(category => <option key={category} value="Type of Exercise">{allExercises[category]}</option>)}</select>
                <select key={2} style={{marginRight:"10px"}}>{measCount.map(category => <option key={category} value="Type of Measurement">{measurements[category]}</option>)}</select>
                <Button size="sm" key={3} style={{marginBottom:"40px", marginTop:"15px"}}>Submit Request</Button>
            </div>
        </div>
    );
}