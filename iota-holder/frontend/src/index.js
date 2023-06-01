import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import CreateDID from './pages/CreateDID';
import HomePage from './pages/homePage';
import GetDID from './pages/GetDID'

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
