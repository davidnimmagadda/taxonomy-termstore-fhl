import React from "react";
import { Nav } from "office-ui-fabric-react";
import PropTypes from "prop-types";

function TermStoreNav(props) {
  return (
    <Nav
      expandButtonAriaLabel="Expand or collapse"
      onLinkClick={props.onLinkClick}
      styles={{
        root: {
          boxSizing: "border-box",
          border: "1px solid #eee",
          overflowY: "auto",
          width: "250px"
        }
      }}
      groups={[
        {
          links: props.termstore.termTree
        }
      ]}
    />
  );
}

TermStoreNav.propTypes = {
  termstore: PropTypes.object.isRequired,
  onLinkClick: PropTypes.func.isRequired
};
export default TermStoreNav;
