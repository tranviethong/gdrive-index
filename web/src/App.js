import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import parseCookies from "./utils/parseCookies";
import Navbar from "./components/Navbar";

const Folder = React.lazy(() => import("./pages/Folder"));
const File = React.lazy(() => import("./pages/File"));
const Share = React.lazy(() => import("./pages/Share"));
const Setup = React.lazy(() => import("./pages/Setup"));
const Login = React.lazy(() => import("./pages/Login"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  localStorage.setItem('apiKey', 'AIzaSyCrplAFEKKT9qn-mRF18qfNEbDa90NO0S8');
  localStorage.setItem('clientId', '235560315556-1l05hu1cr0sbts74ba4g9ijvbs06fmo8.apps.googleusercontent.com');
  localStorage.setItem('rootFolderId', '12me7P6FmgB8vYGWCKe343SaD-3SPDzks');

  useEffect(() => {
    (async () => {
      const cookies = parseCookies(document.cookie);
      if (!cookies.basicauth) {
        setLoading(false);
        setLoggedIn(false);
        return;
      }
      setLoading(true);
      const host = window.location.host === "localhost:3000" ? "http://localhost:3001" : "";
      const req = await fetch(`${host}/checkAuth?basicauth=${cookies.basicauth}`).then((res) => res.json());
      if (req["auth"]) {
        setLoggedIn(true);
      } else {
        document.cookie = `basicauth=`;
        setLoggedIn(false);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Router>
        <Navbar />
        <main>
          <div className="loading-div" />
        </main>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar />
      <main>
        <Suspense fallback={<div className="loading-div" />}>
          <Switch>
            <Route exact path="/setup" component={Setup} />
            <Route exact path="/share/:folderId" component={Share} />
            {!loggedIn && <Route exact path="/" component={Login} />}
            {loggedIn && <Route exact path="/" component={Folder} />}
            {loggedIn && <Route exact path="/:folderId" component={Folder} />}
            {loggedIn && <Route exact path="/file/:fileId" component={File} />}
            <Route>
              <h2 style={{ textAlign: "center" }}>404 - Are you lost babygirl?</h2>
            </Route>
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
}
