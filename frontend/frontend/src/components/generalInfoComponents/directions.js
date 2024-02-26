/*
Remaining Tasks
1) Write instructions for how to use the website.
*/

export default function Directions()
{
    return (
    <div style={{background:"aquamarine", maxWidth:"1200px"}}>
        <div style={{marginLeft:"25px", marginRight:"25px"}}>
            <h3><br/> DIRECTIONS</h3>
            
                <p>
                    To create your workout, enter your workout data in the yellow section. Select the appropriate exercise from the drop-down menu. Then,
                    click the "Add Set" button and enter your information in the following format: [WEIGHT]x[NUMBER OF REPS]. If you changed your weight in the
                    middle of the set, just separate the entries with a comma.
                </p>
                
                <p>
                    As an example, suppose you did 10 reps for your first set of Lat Pull-Downs (5 sets at 115 pounds, 2 sets at 105 pounds, 3 sets at 95 pounds). 
                    First, go to the drop-down menu and select Preacher Curls from the options you see.
                    Then, click the "Add Set" button. In the resulting text box, enter the following string: "115x5, 105x2, 95x3". This is your entry for that set.
                    Once you've done your next set, click "Add Set" again and enter your information in the same style. Keep going until you've finished doing Lat Pull-Downs.
                    Now, you can click the "Add Exercise" button, which will enable you to add the next exercise in your workout. Keep going in this fashion until you're done for the day.
                    At that point, you can click the "Submit Workout" button; this will upload your workout information to your account.
                </p>

                <p>
                    If you have any notes that you want to add, there are designated spaces for you to do so. If your note is about a specific exercise, enter it into
                    the text box to the left of the corresponding exercise. If your note is about the workout as a whole, enter it into the large text box underneath these directions.
                    Once you click the submit button, these notes will be recorded alongside your workout information.
                </p>

            <h3>ADDITIONAL FEATURES (TBD)</h3>
                <p>
                    1) <b>Recommendation System:</b> Enter the theme for the day into the drop-down menu underneath these directions and then click "Generate Recommendation". <em>(80% Complete)</em>
                </p>
                <p>
                    2) <b>Past Workout Access:</b> Go to the bottom right of the page in the blue section. Enter the date whose records you are looking for into the text box and click submit.
                    If you want the full information for that day, click the "SHOW DETAILED" checkbox before clicking submit. Otherwise, you will be shown a statistical summary of your workout for that date.
                </p>

                <p>
                    3) <b> Graph Generation: </b> This will show you a graph that maps out your progress for a given exercise over time. Go to the bottom left of the page in the blue section. 
                    Select the exercise whose graph you want to see and the kind of statistic that you want to track. Then, click the "Submit Request" button.
                </p>

                <div style={{fontSize:"20px", textAlign:"center"}}>
                    <p><b><em>Good luck!<br/><br/></em></b></p>
                </div>

        </div>
    </div>
    );
}