/*
Remaining Tasks
1) Write an actual recommendation function
2) Extract the possibleCategories from some source instead of hard-coding (optional)
*/

import { useEffect, useState, useRef } from 'react';

function CreateTextBox()
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value);};
    return <textarea type="text" value={value} onChange={handleChange} placeholder="" style={{"width":"200px", "height":"145px", marginRight:"20px", overflowY:"scroll"}}/>;
};



export default function GeneralInfo () //One text box for general notes, one selection for which type of exercises to recommend, a button (generates recommendations), an actual recommendation
/*
    functions defined:
        getCategoryForRandomEx
    variables used:
        possibleCategories (what types of day categorizations are supported), chosenCat, recommendationGenerated
        
*/
{
    let possibleCategories = ["Push", "Pull", "Legs"]; //To un-hardcode later
    const [chosenCat, updateCat] = possibleCategories[0];
    const [recommendationGenerated, setRec] = useState("");
    const getCategoryForRandomEx = cat => setRec("Recommendation: Chest Press"); //To un-hardcode later

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <CreateTextBox/>
            <select>{possibleCategories.map(category => <option key={category[3]} value="Type of Day">{category}</option>)}</select>         
            <button onClick={() => getCategoryForRandomEx(chosenCat)} style={{marginLeft:"10px", marginRight:"10px"}}>Generate Recommendation</button>
            <span>{recommendationGenerated} </span>
       </div>
    );
};