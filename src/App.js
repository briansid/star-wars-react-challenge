import "./App.css";
import List from "./pages/List";
import Detail from "./pages/Detail";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={List}></Route>
        <Route path="/:id" component={Detail}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
