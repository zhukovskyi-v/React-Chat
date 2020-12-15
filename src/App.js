import './app.css';
import Sidebar from "./sidebar/Sidebar";
import Chat from "./Chat/Chat";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login/Login";
import {useStateValue} from "./StateProvider";


function App() {
    const [{user}, dispatch] = useStateValue();
    console.log(user?.userId)
    return (
        <div className="app">
            {!user ? (
                <Login/>
            ) : (
                <div className="app__body">
                    <Router>
                        <Sidebar/>
                        <Switch>
                            <Route path='/rooms/:roomId'>
                                <Chat />
                            </Route>
                            <Route path='/'>
                                <Chat />
                            </Route>
                        </Switch>
                    </Router>
                </div>)}
        </div>
    );
}

export default App;
