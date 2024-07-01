import * as React from 'react';
import { NavLink} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import Csv from '../../chartsArea/csv/csv';
import GetVecationsByFollow from '../../conditions-Area/getVecationsByFollow/getVecationsByFollow';
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import Between from '../../conditions-Area/between/between';
import DontStart from '../../conditions-Area/DontStart/DontStart';


export default function BasicMenu() {

  const isAdmin = useSelector( (state:RootState) => state.user.user.userRole);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (

    <div className='BasicMenu' >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx = {{color:'black'}}
      >
        <ReorderRoundedIcon />
      </Button>
      {isAdmin === "admin" && 
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
              
          <NavLink to="/add" style={{ textDecoration: 'none'}}><MenuItem onClick={handleClose} sx={{color:`black`}}>ADD</MenuItem></NavLink>
          <NavLink to="/chart" style={{ textDecoration: 'none'}}><MenuItem onClick={handleClose} sx={{color:`black`}}>Chart</MenuItem></NavLink>
          <NavLink to="/vecations" style={{ textDecoration: 'none'}}><MenuItem onClick={handleClose} sx={{color:`black`}}>Vacations</MenuItem></NavLink>
          <MenuItem sx={{color:`black`}}><Csv/></MenuItem>
          </Menu>
        

      }
      {isAdmin !== "admin" &&  
      <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
        
             <MenuItem sx={{color:`black`}}><GetVecationsByFollow /></MenuItem>
             <MenuItem sx={{color:`black`}}><DontStart/></MenuItem>
             <MenuItem sx={{color:`black`}}><Between /></MenuItem>
      </Menu>
        
      }
    
       
        
    </div>
  );
}
