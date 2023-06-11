import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import CreateDID from './pages/CreateDID';
import HomePage from './pages/homePage';
import GetDID from './pages/GetDID'
import GetVP from './pages/GetVP';
import AddVM from './pages/AddVM';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/", 
        element: <Navigate to="/homepage" replace />
      },
      {
        path: "homepage",
        element: <HomePage />,
      },
      {
        path: "createdid",
        element: <CreateDID />,
      },
      {
        path: "getdid",
        element: <GetDID />,
      },
      {
        path: "getvp",
        element: <GetVP/>
      },{
        path: "addvm",
        element: <AddVM />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
