import { NavLink } from "react-router-dom";
import "./NotFound404.css";
import {  useState } from "react";

function NotFound404(): JSX.Element {

    const [position, setPosition] = useState({top:110,left:42});
    const [count, setCount] = useState<number>(0);

  

    const data = () =>{
    
        setCount(count + 1)
        const top = Math.floor(Math.random() * 90 + 5) ;
        const left = Math.floor(Math.random() * 90 + 5) ;
        if(count < 5){

            setPosition({top:top,left:left})
        }else{
            setPosition({top:110,left:42})
        }

    }


    return (
        <div className="NotFound404">
            <div>
                <h1>page not found</h1>
                <img src="../assets/images/notfound404.png" alt="" />
                <br />
                <NavLink onMouseMove={data}  to="/vecations" style={{ textDecoration: 'none',fontSize:"xx-large", position:"absolute",top:`${position.top}%`,left:`${position.left}%`}}>
                    To Return Click Me
                </NavLink>
            </div>
        </div>
    );
}

export default NotFound404;
