export default function GraphGeneration()
{
    const allExercises = ["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"]
    const measurements = ["Average", "Maximum", "Minimum"]
    const exCount = [...Array(allExercises.length).keys()]
    const measCount=[...Array(measurements.length).keys()]

    return (
        <div>
            <div style={{"width":"300px", "height":"300px", "border":"1px solid black", marginTop:"20px"}}> </div>
            <div>
                <select key={1} style={{marginRight:"10px"}}>{exCount.map(category => <option key={category} value="Type of Exercise">{allExercises[category]}</option>)}</select>
                <select key={2} style={{marginRight:"10px"}}>{measCount.map(category => <option key={category} value="Type of Measurement">{measurements[category]}</option>)}</select>
                <button key={3} style={{marginBottom:"40px", marginTop:"15px"}}>Submit Request</button>
            </div>
        </div>
    );
}

//style={{ display: "flex", alignItems: "flex-start" }}
//marginBottom:"20px", marginLeft:"20px", marginTop:"20px