import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Component/Auth/Auth";
import User from "./Component/User/User";
import EditUser from "./Component/EditUser/EditUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/user/:id/edit" element={<EditUser />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
