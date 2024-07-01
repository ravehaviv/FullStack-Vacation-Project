import { Routes ,Route} from "react-router-dom";
import "./Routing.css";
import Login from "../../AuthAre/Login/Login";
import Register from "../../AuthAre/Register/Register";
import NotFound404 from "../NotFound404/NotFound404";
import Vecations from "../../VecationArea/Vecations/Vecations";
import VecationCardEdit from "../../VecationArea/VecationCardEdit/VecationCardEdit";
import AddCard from "../../VecationArea/AddCard/AddCard";
import Chart from "../../chartsArea/Chart/Chart";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

			<Routes>
                <Route path="/" element={<Login />}  />
                <Route path="/login" element={<Login />}  />
                <Route path="/register" element={<Register />}  />
                <Route path="/vecations" element={<Vecations />}  />
                <Route path="/add" element={<AddCard />}  />
                <Route path="/chart" element={<Chart/>}  />
                <Route path="/not" element={<NotFound404 />}  />
                <Route path="*" element={<NotFound404 />}  />
                <Route path="/vacation/edit/:id" element={<VecationCardEdit />}/>

            </Routes>
        </div>
    );
}

export default Routing;
