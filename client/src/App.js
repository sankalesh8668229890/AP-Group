import Navbar from "./components/navbar";
import Signup from "./components/employeeComponent/signup";
import Login from "./components/employeeComponent/login";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// import Private from "./components/Privatecomponent";
import UserHomepage from "./components/Userhomepage";
import Update from "./components/employeeComponent/update";
import NewCompanyAdded from "./components/companyComponent/companyRegister"

import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {
  return (
    <>
 <BrowserRouter>
    <Navbar/>
   <Routes>
    
   <Route path="/newCompany" element={<NewCompanyAdded></NewCompanyAdded>}></Route>

   <Route path="/update/:id" element={ <Update></Update>}></Route>

   
    <Route path="/userhomepage" element={<UserHomepage></UserHomepage>}></Route>
    <Route path="/signup" element={<Signup /> }></Route>
    <Route path="/login" element={ <Login></Login>}>

    </Route>

   </Routes>
    </BrowserRouter>
  
    </>
  )

  
}

export default App;
