import GraphGeneration from './graphGeneration.js';
import PastWorkouts from './pastWorkouts.js';

//To-do: Everything

export default function FullHistoryComponents({username, measureGetter})
{
    return (
        <div style={{display:"flex", justifyContent: 'space-between'}}>
            <div></div> 
            <GraphGeneration username={username}/>
            <PastWorkouts getStats={measureGetter} username={username}/>
            <div></div>
        </div>
    );
}