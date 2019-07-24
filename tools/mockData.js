const terms = [
  {
    id: 1,
    title: "Securing React Apps with Auth0",
    slug: "react-auth0-authentication-security",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 2,
    title: "React: The Big Picture",
    slug: "react-big-picture",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 3,
    title: "Creating Reusable React Components",
    slug: "react-creating-reusable-components",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 4,
    title: "Building a JavaScript Development Environment",
    slug: "javascript-development-environment",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 5,
    title: "Building Applications with React and Redux",
    slug: "react-redux-react-router-es6",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 6,
    title: "Building Applications in React and Flux",
    slug: "react-flux-building-applications",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 7,
    title: "Clean Code: Writing Code for Humans",
    slug: "writing-clean-code-humans",
    authorId: 1,
    category: "Software Practices"
  },
  {
    id: 8,
    title: "Architecting Applications for the Real World",
    slug: "architecting-applications-dotnet",
    authorId: 1,
    category: "Software Architecture"
  },
  {
    id: 9,
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    slug: "career-reboot-for-developer-mind",
    authorId: 1,
    category: "Career"
  },
  {
    id: 10,
    title: "Web Component Fundamentals",
    slug: "web-components-shadow-dom",
    authorId: 1,
    category: "HTML5"
  }
];

const authors = [
  { id: 1, name: "Cory House" },
  { id: 2, name: "Scott Allen" },
  { id: 3, name: "Dan Wahlin" }
];

const newTerm = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};
const termDetails = [
  {
    id: "1",
    details: "Term 1 details are here"
  },
  {
    id: "2",
    details: "Term 2 details are here"
  }
];
const ts = [
  {
    id: "termstore",
    path: "/termstore",
    type: "folder",
    isRoot: true,
    children: ["/termstore:Group1", "/termstore:Group2"]
  },
  {
    id: "termstore:Group1",
    path: "/termstore:Group1",
    type: "folder",
    children: ["/termstore:Group1:TestTerm"]
  },
  {
    id: "termstore:Group1:TestTerm",
    path: "/termstore:Group1:TestTerm",
    type: "folder",
    children: ["/termstore:Group1:TestTerm:SubTerm"]
  },
  {
    id: "termstore:Group1:TestTerm:SubTerm",
    path: "/termstore:Group1:TestTerm:SubTerm",
    type: "folder",
    children: []
  },
  {
    id: "termstore:Group2",
    path: "/termstore:Group2",
    type: "folder",
    children: ["/termstore:Group2:TermSet1", "/termstore:Group2:TermSet2"]
  },
  {
    id: "termstore:Group2:TermSet1",
    path: "/termstore:Group2:TermSet1",
    type: "folder",
    children: [
      "/termstore:Group2:TermSet1:Term1",
      "/termstore:Group2:TermSet1:Term2"
    ]
  },
  {
    id: "termstore:Group2:TermSet1:Term1",
    path: "/termstore:Group2:TermSet1:Term1",
    type: "folder",
    children: []
  },
  {
    id: "termstore:Group2:TermSet1:Term2",
    path: "/termstore:Group2:TermSet1:Term2",
    type: "folder",
    children: []
  },
  {
    id: "termstore:Group2:TermSet2",
    path: "/termstore:Group2:TermSet2",
    type: "folder",
    children: []
  }
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTerm,
  terms,
  authors,
  ts,
  termDetails
};
