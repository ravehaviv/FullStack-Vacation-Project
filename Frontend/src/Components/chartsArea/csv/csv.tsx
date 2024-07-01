import { useEffect, useState } from "react";
import "./csv.css";
import { CSVLink } from 'react-csv';
import followerService from "../../../Service/followerService";
import notifyService from "../../../Service/NotifyService";


function Csv(): JSX.Element {

    const [csvData ,SetcsvData] = useState<[]>([])

    const headers = [

        { label: 'destination', key: 'destination' },
        { label: 'followers', key: 'follow' },
        // Add more headers as needed
      ];

      const filename = "Followers_Per_Vecatioans"
    useEffect(() => {
        
        followerService.GetCsv()
        .then( c => SetcsvData(c))
        .catch(err => notifyService.error(err))
    },[])


    return (
        <div className="csv">
			<CSVLink style={{textDecoration:`none`,color:`black`}} data={csvData} headers={headers} filename={`${filename}.csv`}>
                Download CSV
            </CSVLink>
        </div>
    );
}

export default Csv;
