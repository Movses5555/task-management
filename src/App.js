import React from "react";
import ReactDOM from 'react-dom'
import { ToastContainer } from "react-toastify";

import List from "./components/list";
import Nav from "./components/nav";
function App() {
  return (
    <>
      <div className="w-screen h-screen app-container overflow-x-hidden">
        <Nav />
        <List />
      </div>
      {ReactDOM.createPortal(
        <ToastContainer className="toaster" hideProgressBar autoClose={3000} />,
        document.getElementById("toasts")
      )}
    </>
  );
}

export default App;
