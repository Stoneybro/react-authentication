import Register from './pages/Register';
import Editor from './pages/Editor'
import Login from './pages/Login';
import LinkPage from './pages/LinkPage';
import Home from './pages/Home';
import Lounge from './pages/Lounge'
import Missing from './pages/Missing'
import Admin from './pages/Admin'
import Unauthorized from './pages/Unauthorized'
import RequireAuth from './pages/RequireAuth';
import Layout from './pages/Layout';
import {Route,Routes} from 'react-router-dom'

import './index.css'

function App() {

  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* we want to protect these routes */}      

      <Route element={<RequireAuth />}>
      <Route path="editor" element={<Editor />} />
      <Route path="admin" element={<Admin />} />
      <Route path="lounge" element={<Lounge />} />
      </Route>
     
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
  );
}

export default App;