import './App.css';
import Main from './Components/Main.jsx';
import List from './Components/List.jsx';
import Leave from './Components/Leave.jsx';
import AddEmp from './Components/AddEmp.jsx';




import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
function App() {

  return (
    <Router>
   <div className="App">
<Switch>
   <Route exact path="/">
<Main/>
</Route>
<Route path="/list">
<List/>
</Route>
<Route path="/leave">
  <Leave/>
</Route>

<Route path="/addemp">
  <AddEmp/>
</Route>
</Switch> 
   </div>
   </Router>
  )
}

export default App;
