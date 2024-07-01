import "./AuthHeadaer.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Service/authService";

function AuthHeadaer(): JSX.Element {


    const user = useSelector( (state:RootState) => state.user.user);
    const navigate = useNavigate()
    const location = useLocation();

    const logout = () =>{
        authService.Logout();
        navigate("/login")
        
     
    }

    return (
        <div className="AuthHeadaer">
			{user && <>
                <span>Hello {user.firstName} | </span>
               <button onClick={logout}>Logout</button>
            
            </>

            }

            {!user && <>
            
                <span>Hello Guest | </span>
                {location.pathname === "/register" ?<NavLink to={"/login"} >Login</NavLink> : <NavLink to={"/register"} >Register </NavLink> }
       

            
            </>

            }
        </div>
    );
}

export default AuthHeadaer;
