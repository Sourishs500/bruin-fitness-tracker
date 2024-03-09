import kirby from './kirby.png'
import chest from './chest.png'
import bicep from './bicep.png'



export default function ProfilePic()
{
    return ( <div> <img className="profilePicture" src={kirby} /> </div>);

    //return (
    //    <div style={{"display":"inline-block","width":"50px", "height":"50px", "border":"1px solid black"}}> </div>
    //);
}