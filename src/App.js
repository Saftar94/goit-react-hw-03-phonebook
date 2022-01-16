// import './App.css'
import { Component } from "react";
import Section from "./components/Sections/Sections";
import Addcontact from "./components/Addcontact/Addcontact";
import ConctactsList from "./components/Contact/ConctactList";
import Filter from "./components/Filter/Filte.js";
// import { alert } from '@pnotify/core'
import { nanoid } from "nanoid";
class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  formSubmitHandler = (data) => {
    let isUniqueName = this.state.contacts.find((elem) =>
      elem.name.includes(data.name)
    );

    if (!isUniqueName) {
      const userId = { id: nanoid() };
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, { ...userId, ...data }],
      }));
    } else {
      alert({
        title: "Alert",
        text: `${isUniqueName.name} is already in contacts`,
      });
    }
  };
  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  filterContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizeFilter)
    );
  };
  componentDidMount() {
    const contact = localStorage.getItem("contacts");
    const parseContact = JSON.parse(contact);
    if (parseContact) {
      this.setState({ contacts: parseContact });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.contacts !== prevProps.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const filterContact = this.filterContacts();
    return (
      <>
        <Section title="PhoneBook">
          <Addcontact onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title="Contact">
          <Filter value={this.state.filter} onChange={this.handleChange} />
          <ConctactsList
            contacts={filterContact}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
