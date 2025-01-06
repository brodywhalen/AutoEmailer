import MainMenu from './pages/MainMenu'
import UploadCSV from './pages/UploadCSV'
import './App.css'

import { MemoryRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return(  
    
    <Router>
      <Routes>
        <Route path= "/" element= {<MainMenu/>}></Route>
        <Route path= "/UploadCSV" element = {<UploadCSV/>}></Route>
        
      </Routes>
    </Router>  
    
  )
}

export default App
