import "./assets/css/App.css"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainComponent from './shared/MainComponent/MainComponent'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Blogs from './pages/Blogs/Blogs'
import Events from './pages/Events/Events'
import Notices from './pages/Notices/Notices'
import About from './pages/About/About'
import Treasury from './pages/Treasury/Treasury'
import NotFound from "./pages/NotFound/NotFound"
import AdminRoute from './components/AdminRoute/AdminRoute'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import BlogList from "./components/BlogList/BlogList"
import BlogForm from "./components/BlogForm/BlogForm"
import EventList from "./components/EventList/EventList"
import EventForm from "./components/EventForm/EventForm"
import NoticeList from "./components/NoticeList/NoticeList"
import NoticeForm from "./components/NoticeForm/NoticeForm"
import BlogDetail from "./pages/Blogs/BlogDetail"
import BlogDetails from "./pages/Blogs/BlogDetail"


const Logout = () => {
  localStorage.clear()
  return <Navigate to="/login" />
}

const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register />
} 


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent children={<Home />} />} />
        <Route path="/admin" element={<MainComponent children={<AdminRoute><AdminDashboard /></AdminRoute>} />} />
        <Route path="/admin/blogs" element={<MainComponent children={<AdminRoute><BlogList /></AdminRoute>} />} />
        <Route path="/admin/blogs/new" element={<MainComponent children={<AdminRoute><BlogForm /></AdminRoute>} />} />
        <Route path="/admin/blogs/edit/:id" element={<MainComponent children={<AdminRoute><BlogForm /></AdminRoute>} />} />
        <Route path="/admin/events/" element={<MainComponent children={<AdminRoute><EventList /></AdminRoute>} />} />
        <Route path="/admin/events/new" element={<MainComponent children={<AdminRoute><EventForm /></AdminRoute>} />} />
        <Route path="/admin/events/edit/:id" element={<MainComponent children={<AdminRoute><EventForm /></AdminRoute>} />} />
        <Route path="/admin/notices/" element={<MainComponent children={<AdminRoute><NoticeList /></AdminRoute>} />} />
        <Route path="/admin/notices/new" element={<MainComponent children={<AdminRoute><NoticeForm /></AdminRoute>} />} />
        <Route path="/admin/notices/edit/:id" element={<MainComponent children={<AdminRoute><NoticeForm /></AdminRoute>} />} />
        <Route path="/home" element={<MainComponent children={<Home />} />} />
        <Route path="/login" element={<MainComponent children={<Login />} />} />
        <Route path="/register" element={<MainComponent children={<RegisterAndLogout />} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/blogs' element={<MainComponent children={<Blogs />} />} />
        <Route path='/blogs/:id' element={<MainComponent children={<BlogDetails />} />} />
        <Route path='/events' element={<MainComponent children={<Events />} />} />
        <Route path='/events/:id' element={<MainComponent children={<Events />} />} />
        <Route path='/notices' element={<MainComponent children={<Notices />} />} />
        <Route path='/notices/:id' element={<MainComponent children={<Notices />} />} />
        <Route path='/about' element={<MainComponent children={<About />} />} />
        <Route path="/treasury" element={
          <ProtectedRoute>
            <MainComponent children={<Treasury />} />
          </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
