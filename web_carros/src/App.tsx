import { createBrowserRouter } from "react-router-dom"
import { Car } from "./pages/car/CarDetail"
import { Dash } from "./pages/dashboard/Dash"
import New from "./pages/dashboard/New/New"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import {Register} from "./pages/register/Register"
import Layout from "./components/Layout/Layout"

import { Private } from "./routes/private"


const router = createBrowserRouter([

  {
    element: <Layout/>,
    children: [
      
      {
        element: <Home/>,
        path: '/'
      },

      {
        element: <Car/>,
        path: '/car/:id'
      },

      {
        element: <Private> <Dash/> </Private> ,
        path: '/dashboard'
      },

      {
        element: <Private> <New/> </Private>,
        path: '/dashboard/new'
      },

    ]
  },

  {
    element: <Login/>,
    path: '/login'
  },

  {
    element: <Register/>,
    path: '/register'
  }

]);

export {router}
