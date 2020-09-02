import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children

}) => {
  return <div>
    <Menu></Menu>
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>

      <div className={className}>{children}</div>
      <p>nvhjgdjdk</p>
      <p>nvhjgdjdk</p>
    </div>

    <footer className="footer   mt-auto ">
      <div className="container-fluid bg-success text-white text-center">
        <h4>If yout got any question fill free to reach out</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">An amazing <span className="text-white">MERN</span> bootcamp</span>
      </div>
    </footer>

  </div>;
};

export default Base;
