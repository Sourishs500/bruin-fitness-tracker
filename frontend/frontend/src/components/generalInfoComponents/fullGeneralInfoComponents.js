import GeneralInfo from './generalInfo.js';
import Directions from './directions.js';
import MusclesWorkedOut from './musclesWorkedOut.js';


//To-do: Actually implementing something for musclesWorkedOut.js
//To-do: writing actual directions instead of placeholder text for directions
//To-do: GeneralInfo: implementing the recommendation generator; implementing the textbox for the general notes

export default function FullGeneralInfoComponents()
{
    return (
        <div style={{display:"flex", alignItems:"flex-start"}}>
            <div> <MusclesWorkedOut/> </div>
            <div style={{marginLeft:"100px"}}>
                <div> <Directions/>  </div>
                <div> <GeneralInfo/> </div>
            </div>
        </div>
    );
};