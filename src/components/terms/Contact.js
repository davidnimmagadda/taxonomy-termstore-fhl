import React from "react";
import PropTypes from "prop-types";
import "./Contact.css";
function Contact(props) {
  const contacts = props.contacts;
  if (contacts) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return <></>;
}

Contact.propTypes = {
  contacts: PropTypes.array.isRequired
};
export default Contact;
