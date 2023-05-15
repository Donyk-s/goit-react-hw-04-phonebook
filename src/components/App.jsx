import React, { useState, useEffect } from 'react';
import { Form } from './forma/Forma';
import ContactList from './contacklisst/Contactlist';
import { nanoid } from 'nanoid';
import Filter from './filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  ]);

  const [filter, setFilter] = useState('');
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts !== null) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const handleFilterChange = value => setFilter(value);

  const formSubmitHandler = data => {
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isContactExists) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    const newContact = { ...data, id: nanoid() };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Form onSubmit={formSubmitHandler} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
      <Filter filter={filter} onChangeInput={handleFilterChange} />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
//       { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
//       { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
//       { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   handleFilterChange = value => {
//     this.setState({ filter: value });
//   };

//   // render > didMount > getItem > setState > update > render > didUpdate > setItem
//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');

//     if (savedContacts !== null) {
//       this.setState({ contacts: JSON.parse(savedContacts) });
//     } else {
//       this.setState({ contacts: [] });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   formSubmitHandler = data => {
//     const { contacts } = this.state;
//     const isContactExists = contacts.some(
//       contact => contact.name.toLowerCase() === data.name.toLowerCase()
//     );

//     if (isContactExists) {
//       alert(`${data.name} is already in contacts.`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, data],
//     }));
//   };
//   handleDeleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 40,
//           color: '#010101',
//         }}
//       >
//         <Form onSubmit={this.formSubmitHandler} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={this.handleDeleteContact}
//         />
//         <Filter filter={filter} onChangeInput={this.handleFilterChange} />
//       </div>
//     );
//   }
// }
