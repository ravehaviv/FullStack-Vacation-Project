import { useEffect, useState } from "react";
import "./Chart.css";
import { BarChart } from '@mui/x-charts/BarChart';
import followerService from "../../../Service/followerService";
import notifyService from "../../../Service/NotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";


function Chart(): JSX.Element {
    const isAdmin = useSelector( (state:RootState) => state.user.user.userRole);
    const [chart ,SetChart] = useState<any[]>([]);
    const navigate = useNavigate()


    useEffect(() => {
    
        if(isAdmin !== "admin") {
            navigate("/vecations")
            notifyService.error("You do not have appropriate permission")
        }
        
        followerService.GetCsv()
        .then( c => SetChart(c))
        .catch(err => notifyService.error(err))
    },[])

    const destinationNames = chart?.map(dest => dest?.destination);

    // Extract follow counts for y-axis
    const followCounts = chart?.map(dest => dest?.follow);

    

    return (
        <div className="Chart">
            <BarChart  
            
            xAxis={[{ scaleType: 'band', data: destinationNames }]}
            series={[{ data:followCounts}]}
            colors={["#045B62","yellow"]}
            
            
            width={800}
            height={500}
            />
          </div>
      );
}

export default Chart;
