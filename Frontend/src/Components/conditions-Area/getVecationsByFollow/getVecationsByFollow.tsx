
import "./getVecationsByFollow.css";
import vecationService from "../../../Service/vecationService";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import notifyService from "../../../Service/NotifyService";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ChangeEvent, useState } from "react";


function GetVecationsByFollow(): JSX.Element {

    const [isChecked1 ,setisChecked1] = useState<boolean>(false);
 
 
    const user_id = useSelector( (state:RootState) => +state.user.user.userID);
    

 const onswitch1 = async (e:ChangeEvent<HTMLInputElement>) => {
    
    try {         
            
        if(e.target.checked === true) {
            await vecationService.GetVecationByFollow(user_id)
            setisChecked1(true)
            
        }else{
            setisChecked1(false)
            await vecationService.deleteStore()
        }
    } catch (error:any) {
        notifyService.error(error.message)
    }
    

 }

 

 


 const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

    return (

        <div className="getVecationsByFollow">

          <FormControlLabel
                  control={<Android12Switch  checked={isChecked1} onChange={e =>onswitch1(e)} /> }
                  label="Follow vecations"
            />
            <br />
        </div>
    );
}

export default GetVecationsByFollow;
