
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./MainOut.css";

function MainOut(): JSX.Element {
    return (
        <div className="MainOut">

            <header>
                <Header />
            </header>

            <main>
                <Routing />
            </main>
            
        </div>
    );
}

export default MainOut;
