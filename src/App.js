
import "./App.css";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Article from "./views/Article";
import Articles from "./views/Articles";
import NewArticle from "./views/NewArticle";
import EditArticle from "./views/EditArticle";
import ArticlesWithForm from "./views/ArticlesWithForm";

function App() {
  return (
    <div className="App">
      <header style={{ marginBottom: 20 }}>
        <nav>
          <Link to="/articles">All Articles</Link> |{" "}
          <Link to="/articles/new">New Article</Link>
        </nav>
      </header>

      <Switch>
        <Redirect exact from="/" to="/articles" />

        <Route exact path="/articles">
          <Articles />
        </Route>

        {/* <Route exact path="/articles">
          <ArticlesWithForm />
        </Route> */}

        <Route exact path="/articles/new">
          <NewArticle />
        </Route>

        <Route exact path="/articles/:id">
          <Article />
        </Route>

        <Route exact path="/articles/:id/edit">
          <EditArticle />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
