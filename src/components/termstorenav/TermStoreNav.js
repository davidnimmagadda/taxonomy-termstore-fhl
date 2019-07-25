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
          overflowY: "auto"
        }
      }}
      groups={[
        {
          links: props.termstoreChildren
        }
      ]}
    />
  );
}

TermStoreNav.propTypes = {
  termstoreChildren: PropTypes.array.isRequired,
  onLinkClick: PropTypes.func.isRequired
};
export default TermStoreNav;
