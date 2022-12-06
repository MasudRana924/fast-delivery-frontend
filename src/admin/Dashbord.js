import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';


const Dashbord = () => {
    const dispatch = useDispatch();
 
    return (
        <div className="dashboard mt-5">
          <Sidebar />
          <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>58</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>0</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>6</p>
            </Link>
          </div>
        </div>

        {/* <div className="lineChart">
          <Line  />
        </div>

        <div className="doughnutChart">
          <Doughnut  />
        </div> */}
        
      </div>
        </div>
    );
};

export default Dashbord;