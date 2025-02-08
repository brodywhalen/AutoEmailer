import MainMenu from './pages/MainMenu'
import UploadCSV from './pages/UploadCSV'
import ViewList from './pages/ViewList'
import CreateAutomation from './pages/CreateAutomation'
import './App.css'

import { MemoryRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return(  
    
    <Router>
      <Routes>
        <Route path= "/" element= {<MainMenu/>}></Route>
        <Route path= "/UploadCSV" element = {<UploadCSV/>}></Route>
        <Route path= "/ViewList" element = {<ViewList/>}></Route>
        <Route path='/CreateAutomation' element= {<CreateAutomation/>}></Route>
        
      </Routes>
    </Router>  
    
  )
}

export default App
