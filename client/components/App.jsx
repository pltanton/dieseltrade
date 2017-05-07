import {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import FullPage from './FullPage/FullPage.jsx';
import Login from './Login/Login.jsx';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={FullPage} />
                    <Route exact path="/admin" render={() => <FullPage admin={true} />} />
                    <Route exact path="/login" render={() => <Login />} />
                </div>
            </Router>
        );
    }
}

export default App;
