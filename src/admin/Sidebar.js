import React from "react";
import "./sidebar.css";
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PostAddIcon from '@mui/icons-material/PostAdd';
import QueueIcon from '@mui/icons-material/Queue';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StarRateIcon from '@mui/icons-material/StarRate';

const Sidebar = () => {

    return (
        <>
            <div className="sidebar">
                <Link to="/">
                    {/* <img src="" alt="Ecommerce" /> */}
                </Link>
                <Link to="/admin/dashboard">
                    <p>
                        <DashboardIcon /> Dashboard
                    </p>
                </Link>
                {/* <Link>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        <TreeItem nodeId="1" label="Products">
                            <Link to="/admin/products">
                                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                            </Link>

                            <Link to="/admin/product">
                                <TreeItem nodeId="3" label="Create" icon={<QueueIcon />} />
                            </Link>
                        </TreeItem>
                    </TreeView>
                </Link> */}
                <Link to="/admin/products">
                    <p> All products</p>
                </Link>
                <Link to="/admin/product">
                    <p>Craete a product</p>
                </Link>
                <Link to="/admin/orders">
                    <p>
                        <ViewListIcon />
                        Orders
                    </p>
                </Link>
                <Link to="/admin/users">
                    <p>
                        <PersonOutlineIcon /> Users
                    </p>
                </Link>
                <Link to="/admin/reviews">
                    <p>
                        <StarRateIcon />
                        Reviews
                    </p>
                </Link>
            </div>

        </>
    );
};

export default Sidebar;