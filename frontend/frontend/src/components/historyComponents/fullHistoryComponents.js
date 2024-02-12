import GraphGeneration from './graphGeneration.js';
import PastWorkouts from './pastWorkouts.js';

export default function FullHistoryComponents()
{
    return (
        <div> 
            <GraphGeneration/>
            <PastWorkouts/>
        </div>
    );
}