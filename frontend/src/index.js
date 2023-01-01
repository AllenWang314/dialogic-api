import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Session from './Session';
import Splash from './Splash';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/session",
    element: <Session/>,
  },
  {
    path: "/summary",
    element: (
      <div>
        <h1>Summary page</h1>
      </div>
    ),
  },
  {
    path: "/summary",
    element: (
      <div>
        <h1>Survey page</h1>
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
