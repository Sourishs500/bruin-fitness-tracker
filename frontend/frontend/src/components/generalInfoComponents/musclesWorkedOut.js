/*
Remaining Tasks
1) Write a function that takes in the exercises done and returns a list of images containing diagrams highlighting which muscles were used
2) Display these images inside the div returned by this function (maybe the user can click through them)
*/
import { useEffect, useState, useRef } from 'react';



    import kirby from '../../components/headerComponents/kirby.png';
    import chest from '../headerComponents/chest_image.png';
    import bicep from '../headerComponents/bicep.png';
    import legs from "../headerComponents/legs.png";
    //add more import statements here: import chestPressImage from ./chestPressImage is an example

    const exercisesAndMuscles = {"Chest Press":chest, //change "kirby" to the variable representing the path for this exercise's image
                                "Bench Press":chest, 
                                "Preacher Curls":bicep, 
                                "Lat Pull-Downs":bicep, 
                                "Wall-Sits":legs, 
                                "Calf Raises":legs}


function imageForExercise(ex, oneToShow, place)
{
    if (place===oneToShow)
        return (
            <div style={{overflow:"scroll", "width":"400px", "height":"400px"}}>
                <h3 style={{display:"block", fontSize:"25px"}}>Muscles used for {ex}</h3>
                
                <img style={{display:"block", overflow:"hidden", height:"300px", width:"350px"}} src={exercisesAndMuscles[ex]}/>
                
            </div>
        );
        
    else
        return null;
}

//{givenExercises.map(x => imageForExercise(x))}
export default function MusclesWorkedOut({givenExercises})
{
    const [imageTracker, updateImageTracker] = useState(0);
    function incrementImageTracker()
    {
        updateImageTracker(imageTracker+1);
        if (imageTracker >= givenExercises.length-1) updateImageTracker(0);
        if (imageTracker < 0) updateImageTracker(givenExercises.length - 1);
    }

    /*
    
    */
    return(
        <div style={{"display":"inline-block","width":"400px", "height":"400px", "border":"1px solid black"}} 
             onClick = {() => {incrementImageTracker(); console.log(imageTracker)}}
        > 
            {[...Array(givenExercises.length).keys()].map(
                i => imageForExercise(givenExercises[i], imageTracker, i)
            )}
            
        </div>
    );
}