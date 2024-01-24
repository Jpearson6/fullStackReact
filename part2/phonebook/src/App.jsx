import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let personObject = {
      name: newName,
      number: newNumber
    }
    const isAdded = persons.find(({ name }) => name === personObject.name);
    isAdded ? alert(`${personObject.name} is already in the phonebook`) : setPersons(persons.concat(personObject));
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    const filteredEntries = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setPersons(filteredEntries);
  }

  return (
    <div>
      <Message text={"PhoneBook"} />
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
      <DisplayPersons persons={persons}/>
    </div>
  )
}

const Message = ({ text }) => <h2>{text}</h2>

const SearchBar = ({ handleSearchChange }) => <div> filter shown with <input id={"filter"} onChange={handleSearchChange} /> </div>

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

const DisplayPerson = ({person}) => <div key={person.name}> {person.name} {person.number} </div>

const DisplayPersons = ({ persons }) => {
  return (
    <div>
      {persons.length === 0 ? (
        <div>
          ...
        </div>
      ) : (
        persons.map((person) => (
          <DisplayPerson key={person.name} person={person} />
        ))
      )}
    </div>
  );
};

export default App