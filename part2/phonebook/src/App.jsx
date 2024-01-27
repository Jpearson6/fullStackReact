import { useState, useEffect } from 'react'
import personsServices from './services/persons';

const errorStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
}
const successStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentStyle, setCurrentStyle] = useState(successStyle);

  useEffect(() => {
    personsServices
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let personObject = {
      name: newName,
      number: newNumber
    }
    const isAdded = persons.find(({ name }) => name === personObject.name);
    isAdded ?
      window.confirm(`${personObject.name} is already in the phonebook Would you like to replace Number?`) ?
        updatePerson(isAdded["id"], { ...isAdded, number: newNumber })
        : null
      : personsServices.
        createPerson(personObject)
        .then(newPerson => {
          setCurrentStyle(successStyle);
          setErrorMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
        });
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    const filteredEntries = persons.filter((person) =>
      person.name.toLowerCase()
        .includes(event.target.value.toLowerCase()));
    setPersons(filteredEntries);
  }

  const deletePerson = (id, name) => {
    window.confirm(`Delete ${name}?`) ?
      personsServices.deletePerson(id)
        .then(personDeleted => {
          setCurrentStyle(successStyle);
          setErrorMessage(`${name} has been removed from phonebook`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          const copy = persons.filter((person) => person.id != id);
          setPersons(copy);
        })
        .catch((err) => console.log(err))
      : null
  }

  const updatePerson = (id, person) => {
    personsServices.updatePerson(id, person)
      .then(updatedPerson => {
        const updatedPersons = persons.map((person) =>
          person.id === id ? updatedPerson : person
        );
        setCurrentStyle(successStyle);
        setErrorMessage(`Updated Number for ${person.name}`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(updatedPersons);
      })
      .catch(err => {
        setCurrentStyle(errorStyle);
        setErrorMessage(`Information for${person.name} has been removed from server`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      });
  }

  return (
    <div>
      <Message text={"PhoneBook"} />
      <Notification message={errorMessage} style={currentStyle} />
      <SearchBar handleSearchChange={handleSearchChange} />
      <Message text={"Add new PhoneBook Entry"} />
      <AddNewPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Message text={"Numbers"} />
      <DisplayPersons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

const Message = ({ text }) => <h2>{text}</h2>

const SearchBar = ({ handleSearchChange }) =>
  <div> filter shown with
    <input
      id={"filter"}
      onChange={handleSearchChange}
    />
  </div>

const AddNewPerson = (props) => {
  const { addPerson, newName, newNumber, handleNameChange, handleNumberChange } = props;
  return (
    <form id={"addPerson"} onSubmit={addPerson}>
      <div>
        name: <input
          id={"addName"}
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        number: <input
          id={"addNumber"}
          type='tel'
          value={newNumber}
          onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const DisplayPerson = ({ person, deletePerson }) =>
  <div key={person.name}> {person.name} {person.number}
    <button
      onClick={() => deletePerson(person.id, person.name)}>
      delete
    </button>
  </div>

const DisplayPersons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.length === 0 ? (
        <div>
          ...
        </div>
      ) : (
        persons.map((person) => (
          <DisplayPerson
            key={person.name}
            person={person}
            deletePerson={deletePerson} />
        ))
      )}
    </div>
  );
};

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={style} className='error'>
      {message}
    </div>
  )
}

export default App