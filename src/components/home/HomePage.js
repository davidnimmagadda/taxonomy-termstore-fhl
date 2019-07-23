import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Taxonomy TermStore Administration</h1>
      <p>
        Using React, Redux and React-Router to create TermStore Admin Console.
      </p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn More
      </Link>
    </div>
  );
}
