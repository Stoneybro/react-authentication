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
import Persistlogin from './components/Persistlogin';
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
      <Route element={<Persistlogin />}>
      <Route element={<RequireAuth allowedRoles={['2344']} />}>
      <Route path="editor" element={<Editor />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={['2005']} />}>
      <Route path="admin" element={<Admin />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={['2005','4000']} />}>
      <Route path="lounge" element={<Lounge />} />
      </Route>
      </Route>
     
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
  );
}

export default App;