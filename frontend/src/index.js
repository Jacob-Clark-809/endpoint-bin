import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import ErrorPage from './components/ErrorPage';
import BinPage from './components/BinPage';
import BinList from './components/BinList';
import RequestDetails from './components/RequestDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/bins",
        element: <BinList />,
      },
      {
        path: "/bins/:binId",
        element: <BinPage />,
        children: [
          {
            path: "request/:requestId",
            element: <RequestDetails />,
          },
        ],
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
