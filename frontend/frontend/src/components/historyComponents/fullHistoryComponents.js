import GraphGeneration from './graphGeneration.js';
import PastWorkouts from './pastWorkouts.js';

//To-do: Everything

export default function FullHistoryComponents()
{
    return (
        <div style={{display:"flex", justifyContent: 'space-between'}}>
            <div></div> 
            <GraphGeneration/>
            <PastWorkouts/>
            <div></div>
        </div>
    );
}