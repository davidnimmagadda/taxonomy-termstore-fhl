const newTerm = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

const ts = [
  {
    id: "Taxonomy",
    path: "Taxonomy",
    type: "folder",
    isRoot: true,
    children: ["Taxonomy:People", "Taxonomy:System"],
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
    name: "Taxonomy",
    displayName: "TermStore Admins",
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
    id: "Taxonomy:People",
    path: "Taxonomy:People",
    type: "folder",
    children: [
      "Taxonomy:People:Department",
      "Taxonomy:People:JobTitle",
      "Taxonomy:People:Location"
    ],
    name: "People",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:System",
    path: "Taxonomy:System",
    type: "folder",
    children: [
      "Taxonomy:System:Hashtags",
      "Taxonomy:System:Keywords",
      "Taxonomy:System:OrphanedTerms"
    ],
    name: "System",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:Department",
    path: "Taxonomy:People:Department",
    type: "folder",
    children: [],
    name: "Department",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:JobTitle",
    path: "Taxonomy:People:JobTitle",
    type: "folder",
    children: [],
    name: "JobTitle",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:Location",
    path: "Taxonomy:People:Location",
    type: "folder",
    children: ["Taxonomy:People:Location:India", "Taxonomy:People:Location:US"],
    name: "Location",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:Location:India",
    path: "Taxonomy:People:Location:India",
    type: "folder",
    children: [
      "Taxonomy:People:Location:India:Hyderabad",
      "Taxonomy:People:Location:India:Bangalore"
    ],
    name: "India",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:Location:India:Bangalore",
    path: "Taxonomy:People:Location:India:Bangalore",
    type: "folder",
    children: [],
    name: "Bangalore",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:Location:India:Hyderabad",
    path: "Taxonomy:People:Location:India:Hyderabad",
    type: "folder",
    children: [],
    name: "Hyderabad",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:Location:US",
    path: "Taxonomy:People:Location:US",
    type: "folder",
    children: ["Taxonomy:People:Location:US:Redmond"],
    name: "US",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:People:Location:US:Redmond",
    path: "Taxonomy:People:Location:US:Redmond",
    type: "folder",
    children: [],
    name: "Redmond",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:System:Hashtags",
    path: "Taxonomy:System:Hashtags",
    type: "folder",
    children: [],
    name: "Hashtags",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:System:Keywords",
    path: "Taxonomy:System:Keywords",
    type: "folder",
    children: [],
    name: "Keywords",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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
    id: "Taxonomy:System:OrphanedTerms",
    path: "Taxonomy:System:OrphanedTerms",
    type: "folder",
    children: [],
    name: "Orphaned Terms",
    uniqueIdentifier: "xyzdsfjhweljrelwkenflm12143344",
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

const req4 = {
  "@odata.context":
    "https://prepspo.spgrid.com/_api/v2.1/$metadata#termStore('global')/termGroups('635e69f3-fbcf-4952-8370-fbef46d401e1')/termSets('7d61e43c-429f-44a1-b28b-4c30c7c0f35a')/terms",
  value: [
    {
      Id: "b324c3c5-4c63-4ec8-a787-2dd964ab2c05",
      Label: [{ Name: "Term1", isDefaultLabel: true, Language: 1033 }]
    }
  ]
};

const req3 = {
  "@odata.context":
    "https://prepspo.spgrid.com/_api/v2.1/$metadata#termStore('global')/termGroups('635e69f3-fbcf-4952-8370-fbef46d401e1')/termSets/$entity",
  Id: "7d61e43c-429f-44a1-b28b-4c30c7c0f35a",
  Name: "Set1"
};

const req2 = {
  "@odata.context":
    "https://prepspo.spgrid.com/_api/v2.1/$metadata#termStore('global')/termGroups/$entity",
  Id: "635e69f3-fbcf-4952-8370-fbef46d401e1",
  description: "",
  Name: "Group1"
};

const req1 = {
  "@odata.context":
    "https://prepspo.spgrid.com/_api/v2.1/$metadata#termStore('global')/termGroups",
  value: [
    {
      Id: "635e69f3-fbcf-4952-8370-fbef46d401e1",
      description: "",
      Name: "Group1"
    },
    {
      Id: "d6a21ba5-107d-4f7e-8885-a0cbf10545c9",
      description: "",
      Name: "People"
    },
    {
      Id: "d87b6a37-c801-4a36-9046-6296d4779c87",
      description: "",
      Name: "Search Dictionaries"
    },
    {
      Id: "12737b42-0261-478a-9da7-025541dff09a",
      description: "These term sets are used by the system itself.",
      Name: "System"
    }
  ]
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTerm,
  ts
};
