export default function GraphGeneration()
{
    const allExercises = ["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"]
    const measurements = ["Average", "Maximum", "Minimum"]
    return (
        <div>
            <div style={{"width":"300px", "height":"300px", "border":"1px solid black"}}> </div>
            <div>
                <select style={{marginRight:"10px"}}>{allExercises.map(category => <option value="Type of Exercise">{category}</option>)}</select>
                <select style={{marginRight:"10px"}}>{measurements.map(category => <option value="Type of Measurement">{category}</option>)}</select>
                <button style={{marginBottom:"40px", marginTop:"15px"}}>Submit Request</button>
            </div>
        </div>
    );
}

//style={{ display: "flex", alignItems: "flex-start" }}