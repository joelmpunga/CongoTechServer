import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CreatFolder from './components/CreatFolder.jsx'
import ArchDocs from './components/archDoc/ArchDocs.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreatFolder />
  </React.StrictMode>,
)
