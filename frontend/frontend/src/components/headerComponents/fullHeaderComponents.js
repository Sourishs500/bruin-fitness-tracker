import ProfilePic from './profilePic.js';

//To-Do: Implementing the profile pic feature

export default function FullHeader()
{
    const name = "USERNAME" //to un-hardcode later

    return (
        <div style={{height: 90, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div className="titleText" >{"Bruin Fitness Tracker"}</div>
            <div className="topBarRight" >
                <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                    <div className="usernameText" style={{marginLeft:"15px"}}>{"Username: ???"}</div>
                    <div className="usernameText" style={{marginLeft:"15px"}}>{"sign up/sign in"}</div>
                </div>          
                <div><ProfilePic/></div>
            </div>
        </div>
    );
}