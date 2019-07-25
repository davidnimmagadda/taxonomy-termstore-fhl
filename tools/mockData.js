const newTerm = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

const ts = [
  {
    id: "termstore",
    path: "/termstore",
    type: "folder",
    isRoot: true,
    children: ["/termstore:Group1", "/termstore:Group2"],
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group1",
    path: "/termstore:Group1",
    type: "folder",
    children: ["/termstore:Group1:TestTerm"],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group1:TestTerm",
    path: "/termstore:Group1:TestTerm",
    type: "folder",
    children: ["/termstore:Group1:TestTerm:SubTerm"],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group1:TestTerm:SubTerm",
    path: "/termstore:Group1:TestTerm:SubTerm",
    type: "folder",
    children: [],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group2",
    path: "/termstore:Group2",
    type: "folder",
    children: ["/termstore:Group2:TermSet1", "/termstore:Group2:TermSet2"],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group2:TermSet1",
    path: "/termstore:Group2:TermSet1",
    type: "folder",
    children: [
      "/termstore:Group2:TermSet1:Term1",
      "/termstore:Group2:TermSet1:Term2"
    ],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group2:TermSet1:Term1",
    path: "/termstore:Group2:TermSet1:Term1",
    type: "folder",
    children: [],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group2:TermSet1:Term2",
    path: "/termstore:Group2:TermSet1:Term2",
    type: "folder",
    children: [],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  },
  {
    id: "termstore:Group2:TermSet2",
    path: "/termstore:Group2:TermSet2",
    type: "folder",
    children: [],
    name: "termstore",
    details:
      "Term 1 details are here.It is a prt of XYZ term set and has been used since 2002.",
    contacts: [
      {
        id: "1",
        name: "lavanya.a@microsoft.com"
      },
      {
        id: "2",
        name: "david.nimmagadda@microsoft.com"
      },
      {
        id: "3",
        name: "gayathri.sns@microsoft.com"
      }
    ]
  }
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTerm,
  ts
};
