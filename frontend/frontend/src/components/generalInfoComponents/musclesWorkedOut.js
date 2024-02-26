/*
Remaining Tasks
1) Write a function that takes in the exercises done and returns a list of images containing diagrams highlighting which muscles were used
2) Display these images inside the div returned by this function (maybe the user can click through them)
*/
import { useEffect, useState, useRef } from 'react';



//YOU CAN CHANGE ANYTHING FROM THIS LINE TO THE LINE THAT SAYS "DO NOT CHANGE ANYTHING BELOW THIS LINE"

    import kirby from '../../components/headerComponents/kirby.png';
    //add more import statements here: import chestPressImage from ./chestPressImage is an example

    const exercisesAndMuscles = {"Chest Press":kirby, //change "kirby" to the variable representing the path for this exercise's image
                                "Bench Press":kirby, //change "kirby" to the variable representing the path for this exercise's image
                                "Preacher Curls":kirby, //change "kirby" to the variable representing the path for this exercise's image
                                "Lat Pull-Downs":kirby, //change "kirby" to the variable representing the path for this exercise's image
                                "Wall-Sits":kirby, //change "kirby" to the variable representing the path for this exercise's image
                                "Calf-Raises":kirby} //change "kirby" to the variable representing the path for this exercise's image

//DO NOT CHANGE ANYTHING BELOW THIS LINE


/*
Base the actual implementation of this module on: https://www.w3schools.com/howto/howto_js_slideshow.asp
*/


function imageForExercise(ex, oneToShow, place)
{
    console.log("One to show: ", oneToShow);
    console.log("Place: ", place);

    //exercisesAndMuscles[ex]
    if (place===oneToShow)
        return (
            <div style={{overflow:"scroll", "width":"400px", "height":"400px"}}>
                <h3 style={{display:"block"}}>Muscles used for {ex}</h3>
                
                <img style={{display:"block", overflow:"hidden"}} src={exercisesAndMuscles[ex]}/>
                
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
    console.log([...Array(givenExercises.length).keys()].map(i => givenExercises[i]));
    console.log("THISTHAT");
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