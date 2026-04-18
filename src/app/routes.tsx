import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Stories from "./pages/Stories";
import Upcoming from "./pages/Upcoming";
import Contact from "./pages/Contact";        // ← Add this import
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "donate", Component: Donate },
      { path: "stories", Component: Stories },
      { path: "upcoming", Component: Upcoming },
      { path: "contact", Component: Contact }, 
      {
    path: "/about",
    element: <About />,
  },    // ← Now it will work
    ],
  },
  {
    path: "/admin",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
]);