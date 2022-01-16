import styles from "./Addcontact.module.scss";
import { Component } from "react";
class Addcontact extends Component {
  state = {
    name: "",
    number: "",
  };

  inputName = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  HandelSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: "", number: "" });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.Blockinput} onSubmit={this.HandelSubmit}>
        <label>
          <p>Name</p>
          <input
            className={styles.Input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.inputName}
          />
        </label>
        <label>
          <p>Number</p>
          <input
            className={styles.Input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.inputName}
          />
        </label>
        <button className={styles.Button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default Addcontact;
