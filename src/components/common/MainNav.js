import React from "react";
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
    name: "Terms",
    key: "key4",
    url: "/terms"
  },
  {
    name: "Notebook",
    key: "key5",
    url: "/notebook"
  },
  {
    name: "Communication and Media",
    key: "key6",
    url: "/communication-media"
  },
  {
    name: "News",
    key: "key7",
    url: "/news"
  }
];

function MainNav({ history }) {
  function handleLinkClick(ev, item) {
    history.push(navlinks.find(_ => _.key === item.key).url);
  }

  return (
    <Nav
      onLinkClick={handleLinkClick}
      selectedKey="key1"
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
