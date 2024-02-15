import { useEffect, useState, useRef } from 'react';

function CreateDateBox(setNum, exLabel)
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value);};
    return <input type="text" label = {setNum} name = {exLabel} style = {{"width":"150px", height:"15px", marginTop:"10px"}} onInput = {handleChange}/>;   
}

export default function PastWorkouts()
{
    return (
        <div>
            <div style={{"width":"300px", "height":"300px", "border":"1px solid black"}}> </div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <CreateDateBox/>
                <input type="checkbox" style = {{"width":"150px", height:"20px", marginTop:"10px", marginRight:"-63px"}}/>
                <span style={{marginTop:"10px"}}>SHOW DETAILED</span>
            </div> 
        </div>
    );
}

//style={{ display: "flex", alignItems: "flex-start" }}