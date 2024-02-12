import ProfilePic from './profilePic.js';

//To-Do: Implementing the profile pic feature
export default function FullHeader()
{
    const name = "Laruyanivrarish" //to un-hardcode later

    return (
        <div style={{display:"flex", justifyContent: 'space-between'}}>
            <ProfilePic/>
            <h1 style={{ margin: '0 auto' }}>{name}</h1>
        </div>
    );
}
//<ProfilePic/>