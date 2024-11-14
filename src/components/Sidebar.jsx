// src/components/Sidebar.js
import { useState } from 'react';
import SvgIcon from './SvgIcon';
import AdminSvgIcon from './AdminSVGIcon';
import DashboardSvgIcon from './DashboardSVGIcon';
import MessageSVGIcon from './MessageSVGIcon';
import EmployeeSVGIcon from './EmployeeSVGIcon';




const Sidebar = () => {


  return (
    <div className="sidebar">
   <SvgIcon />
   <div className="admin"><AdminSvgIcon/><div><p  className='name'>Aman Admin</p><span className='role'>Admin</span></div></div>
   <p>Features</p>
   <nav>
     <ul>
       <li><button className="nav-buttons" ><DashboardSvgIcon className="dashboard-icon"/>Dashboard</button></li>
       <li><button className="nav-buttons" ><MessageSVGIcon className="message-icon"/>Messages <span className="message-count">42</span></button></li>
       <li><button className="nav-buttons" ><EmployeeSVGIcon className="employee-icon"/>Employee Management</button></li>
      


     </ul>

   </nav>

    </div>
  );
};

export default Sidebar;
