import ProfilePic from './profilePic.js';

//To-Do: Implementing the profile pic feature

export default function FullHeader()
{
    const name = "USERNAME" //to un-hardcode later

    return (
        <div style={{display:"flex", justifyContent: 'space-between'}}>
            <div style={{marginBottom:"20px", marginLeft:"20px", marginTop:"20px"}}><ProfilePic/></div>
            <h1 style={{ margin: '0 auto' }}>{name}</h1>
        </div>
    );
}