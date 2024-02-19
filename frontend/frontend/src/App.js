import { useEffect, useState, useRef } from 'react';

import FullGeneralInfoComponents from './components/generalInfoComponents/fullGeneralInfoComponents.js'; 
import FullHeaderComponents from './components/headerComponents/fullHeaderComponents.js'; 
import FullHistoryComponents from './components/historyComponents/fullHistoryComponents.js'; 
import FullSpecificInfoComponents from './components/specificInfoComponents/fullSpecificInfoComponents.js'; 


function getPrintableVersion(x) 
{
    console.log(x.Workout);
    return (
        <p>
            <b>Workout Details</b> <br/>
            <table style={{"border":"1px solid black", "borderCollapse":"collapse"}}>
                <tr>
                    <th style={{"border":"1px solid black"}}>Exercise</th>
                    <th style={{"border":"1px solid black"}}>Average Across Sets</th>                
                </tr>
            {x.Workout.map(
                            row => 
                            {
                                let message = "";
                                if (Object.keys(row).length > 0)
                                {
                                    message = JSON.stringify(row);
                                    let ex=row.Exercise;
                                    let info=row.SetInformation.map(set => {return <span> | {set} | </span>} );
                                    return (<tr>
                                                <td style={{"border":"1px solid black"}}>{ex}</td>
                                                <td style={{"border":"1px solid black"}}>{info}</td>
                                            </tr>);
                                }
                                else return (<tr>
                                                <td style={{"border":"1px solid black"}}>{"N/A"}</td>
                                                <td style={{"border":"1px solid black"}}>{"N/A"}</td>
                                            </tr>);
                            }
                          )
            }
            </table>
        </p>
    )
}


export default function App () {

    const dataWithoutGeneralComments = useRef([]);
    const generalNotes = useRef("");
    const completeWorkoutData = useRef({});
    const [displayFull, updateRecord] = useState("");
    const niwe = "DEFAULT";
    function receiveGeneralNotes({notes})   {generalNotes.current = notes["n"];}
    function receiveData({data})            {dataWithoutGeneralComments.current = data["n"]; 
                                             completeWorkoutData.current = {"GeneralNotes":generalNotes.current, "Workout":dataWithoutGeneralComments.current};
                                             updateRecord(getPrintableVersion(completeWorkoutData.current) )
                                             console.log("Updated: ", completeWorkoutData.current);
                                            }

    return (
        <>
        <div style={{ backgroundColor: 'pink' }}><FullHeaderComponents/></div>
		<div style={{ backgroundColor: 'lightgreen' }}><FullGeneralInfoComponents SendValueUp={receiveGeneralNotes}/></div>
		<div style={{ backgroundColor: 'lightyellow' }}><FullSpecificInfoComponents SendValueUp={receiveData} summaryToDisplay={completeWorkoutData.current}/></div>
        <div style={{ backgroundColor: 'lightblue' }}><FullHistoryComponents/></div>
        </>
   );
};