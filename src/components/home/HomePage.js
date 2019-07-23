import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>
        Using React, Redux and React-Router to create ultra responsive web apps.
      </p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn More
      </Link>
    </div>
  );
}
