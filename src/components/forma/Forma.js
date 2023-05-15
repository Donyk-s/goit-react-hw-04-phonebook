import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Forma.module.css';

export const Form = onSubmit => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  // const handleChange = event => {
  //   const { name, value } = event.currentTarget;
  //   setNumber(value);
  //   setName(value);
  // };
  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    onSubmit(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <div className={css.container}>
      Phonebook
      <form onSubmit={handleSubmit} className={css.formBox}>
        <label className={css.labelInput}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <br />
        <label className={css.labelInput}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            onChange={handleChange}
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.myButton}>
          {' '}
          Add Contact
        </button>
      </form>
    </div>
  );
};
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Form extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = { name: '', number: '' };
//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const contact = {
//       id: nanoid(),
//       name: this.state.name,
//       number: this.state.number,
//     };
//     this.props.onSubmit(contact);
//     this.reset();
//   };
//   reset = () => this.setState({ name: '', number: '' });
//   render() {
//     return (
//       <div className={css.container}>
//         Phonebook
//         <form onSubmit={this.handleSubmit} className={css.formBox}>
//           <label className={css.labelInput}>
//             Name
//             <input
//               className={css.input}
//               type="text"
//               name="name"
//               value={this.state.name}
//               onChange={this.handleChange}
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//             />
//           </label>
//           <br />
//           <label className={css.labelInput}>
//             Number
//             <input
//               className={css.input}
//               type="tel"
//               name="number"
//               onChange={this.handleChange}
//               value={this.state.number}
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//             />
//           </label>
//           <button type="submit" className={css.myButton}>
//             {' '}
//             Add Contact
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
// export default Form;
