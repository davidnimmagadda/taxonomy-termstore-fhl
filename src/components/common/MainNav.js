import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Nav } from "office-ui-fabric-react";
import PropTypes from "prop-types";

const navlinks = [
  {
    name: "Home",
    key: "key1",
    url: "/"
  },
  {
    name: "About",
    key: "key3",
    url: "/about"
  },
  {
    name: "Term Store Admin Center",
    key: "key4",
    url: "/terms"
  },
  {
    name: "Term Store Analytics",
    key: "key5",
    url: "/notebook"
  },
  {
    name: "Content Type Admin Center",
    key: "key6",
    url: "/communication-media"
  }
];

function MainNav({ history }) {
  const [selectedKey, setSelectedKey] = useState("key1");

  function handleLinkClick(ev, item) {
    setSelectedKey(item.key);
    history.push(navlinks.find(_ => _.key === item.key).url);
  }

  return (
    <Nav
      onLinkClick={handleLinkClick}
      selectedKey={selectedKey}
      expandButtonAriaLabel="Expand or collapse"
      styles={{
        root: {
          boxSizing: "border-box",
          border: "1px solid #eee",
          overflowY: "auto"
        }
      }}
      groups={[
        {
          links: navlinks.map(({ name, key }) => {
            return { name, key };
          })
        }
      ]}
    />
  );
}

MainNav.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(MainNav);
