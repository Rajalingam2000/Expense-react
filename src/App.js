import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/nav/nav';
import SignInLogin from './components/signInLogin/SignInLogin';
import Expansive from './components/Expansive/Expansive';
function App() {
  return (
    <>

      <Nav/>


      <Route path='/' exact>
               <SignInLogin/>
      </Route>

      <Route path='/expansive/:user_name/:user_id' exact>
               <Expansive/>
      </Route>
    </>
  );
}

export default App;
