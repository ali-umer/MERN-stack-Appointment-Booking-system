import './App.css';
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Contact from './Components/Contact/Contact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/HomeScreen/Home';
import Doctor from './Components/Doctor/Doctor'
import Appointment from './Components/Appointment/Appointment'
import Hospital from './Components/Hospital/Hospital'
import Error from './Components/Error/Error'
function App() {
  return (
    <div>
=      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/Signup' component={Signup} />
          <Route path='/Home' component={Home} />
          <Route path='/Contact' component={Contact}/>
          <Route path='/Doctor' component={Doctor}/>
          <Route path='/Appointment' component={Appointment}/>
          <Route path='/Hospital' component={Hospital}/>
          <Route path='*' exact component={Error}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
