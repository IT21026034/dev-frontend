/*import logo from './logo.svg';*/
import "./App.css";
import AddItem from "./components/AddItem";
import AllItems from "./components/AllItems";
import EditItem from "./components/updateItem";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AllItems />} />
        <Route exact path="/AddItem" element={<AddItem />} />
        <Route exact path="/updateItem" element={<updateItem />} />

      </Routes>
    </Router>
  );
}

export default App;
