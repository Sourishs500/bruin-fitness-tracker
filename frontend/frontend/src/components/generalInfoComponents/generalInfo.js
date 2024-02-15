import { useEffect, useState, useRef } from 'react';
//import {Button} from 'react-native';

function CreateTextBox()
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value);};
    return <textarea type="text" value={value} onChange={handleChange} placeholder="" style={{"width":"200px", "height":"145px", marginRight:"20px", overflowY:"scroll"}}/>;
};



export default function GeneralInfo ()
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value);};
    const TextBox = () => (<textarea type="text" value={value} onChange={handleChange} placeholder="" style={{"width":"200px", "height":"150px", marginRight:"50px", overflowY:"scroll"}}/>);  


    let possibleCategories = ["Push", "Pull", "Legs"]; //To un-hardcode later

    const [recommendationGenerated, setRec] = useState("");
    const getCategoryForRandomEx = () => setRec("Recommendation: Chest Press"); //To un-hardcode later

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <CreateTextBox/>
            <select>{possibleCategories.map(category => <option key={category[3]} value="Type of Day">{category}</option>)}</select>         
            <button onClick={getCategoryForRandomEx} style={{marginLeft:"10px", marginRight:"10px"}}>Generate Recommendation</button>
            <span>{recommendationGenerated} </span>
       </div>
    );
};