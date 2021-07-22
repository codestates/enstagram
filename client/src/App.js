import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { useState } from "react";
import Login from './components/Login.js'
import Main from './components/Main.js'
import Signup from './pages/Signup.js'
import Mypage from './pages/Mypage.js'
import ProfileEdit from './pages/ProfileEdit.js'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLogin ? <Main /> : <Login setIsLogin={setIsLogin}/>}
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/mypage/edit">
          <ProfileEdit />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
