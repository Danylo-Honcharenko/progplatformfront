import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import './style/App.scss'
import './style/index.css'
import Registration from "./pages/Registration.tsx";
import Course from "@/pages/Course.tsx";
import UserControlPanel from "@/pages/UserControlPanel.tsx";
import ChangePassword from "@/pages/ChangePassword.tsx";
import UserProfile from "@/pages/UserProfile.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/course/:id" element={<Course />} />
                <Route path="/user" element={<UserControlPanel />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
