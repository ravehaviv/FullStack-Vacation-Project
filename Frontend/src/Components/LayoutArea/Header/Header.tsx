import AuthHeadaer from "../../AuthAre/AuthHeadaer/AuthHeadaer";
import Menu from "../Menu/Menu";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import "./Header.css";
import { StayPrimaryLandscape } from "@mui/icons-material";

function Header(): JSX.Element {

  const user = useSelector( (state:RootState) => state.user.user);

  


    return (
        <div className="Header">

          <span>
            { user=== null ? <span></span> : <Menu /> }
          </span>

            <span>
              <h1>Vacation`s</h1>
            </span>

            <span>
              <AuthHeadaer/>
            </span>
            
        </div>
    );
}

export default Header;
