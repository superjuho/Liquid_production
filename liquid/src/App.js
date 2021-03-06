import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./App.css";
import Home from "./views/Home";
import Nav from "./components/Nav";
import Single from "./views/Singe";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Logout from "./views/Logout";
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';
import Upload from './views/Upload';
import UploadProfilePic from "./views/UploadProfilePic";
import AddFavorite from "./views/AddFavorite";
import AddReview from './views/AddReview';
import AddWish from './views/AddWish';
import MyFiles from './views/MyFiles';
import ProfileView from './views/ProfileView';
import NewUpload from './views/NewUpload';
import Modify from './views/Modify';


const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Container maxWidth="sm">
          <Nav />
          <main>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path={"/logout"} component={Logout} />
              <Route path="/single/:id" component={Single} />
              <Route path={"/upload"} component={Upload} />
              <Route path={"/uploadprofilepic"} component={UploadProfilePic} />
              <Route path={"/addfavorite"} component={AddFavorite} />
              <Route path={"/addreview"} component={AddReview} />
              <Route path={"/addwish"} component={AddWish} />
              <Route path={"/myfiles"} component={MyFiles} />
              <Route path={"/newpost"} component={NewUpload} />
              <Route path={'/modify/:id'} component={Modify}/>
            </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>
  );
};

export default App;
