import FullPage from './FullPage'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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
        </div>
      </Router>
    );
  }
}

export default App;
