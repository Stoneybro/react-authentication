import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AuthProvider} from './context/contextauth'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
    <AuthProvider>
      <Routes>
      <Route path='/*' element={<App />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

