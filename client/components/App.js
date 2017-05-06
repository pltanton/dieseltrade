import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import FullPage from './FullPage/FullPage'
import Login from './Login/Login'

function Test(params) {
  return (
    <h1>
      Ololo
    </h1>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={FullPage}/>
          <Route exact path="/admin" render={() => <FullPage admin={true} />}/>
          <Route exact path="/login" render={() => <Login />}/>
        </div>
      </Router>
    );
  }
}

export default App;
