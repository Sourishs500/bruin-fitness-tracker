import ProfilePic from './profilePic.js';
import {Link} from 'react-router-dom'

//To-Do: Implementing the profile pic feature

export default function FullHeader()
{
    const name = "USERNAME" //to un-hardcode later

    return (
        <div style={{height: 90, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Link to="/">
                <div className="titleText" >{"Bruin Fitness Tracker"}</div>
            </Link>
            <div className="topBarRight" >
                <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                    <div className="usernameText" style={{marginLeft:"15px"}}>{"Username: ???"}</div>
                    <div className="usernameText" style={{marginLeft:"15px"}}>{"sign up/sign in"}</div>
                </div>
                <Link to="/login">
                    <div>
                        <ProfilePic/>
                    </div>
                </Link>
            </div>
        </div>
    )
}