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
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    const filteredEntries = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setPersons(filteredEntries);
  }

  return (
    <div>
      <Message text={"PhoneBook"} />
      <SearchBar handleSearchChange={handleSearchChange}/>
      <Message text={"Add new PhoneBook Entry"}/>
      <AddNewPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Message text={"Numbers"}/>
      {
        persons.length === 0 ?
          <div>
            ...
          </div>
          :
          persons.map((person) => {
            return (
              <div key={person.name}>
                {person.name} {person.number}
              </div>
            )
          })
      }
    </div>
  )
}

const Message = ({ text }) => <h2>{text}</h2>

const SearchBar = ({handleSearchChange}) => <div> filter shown with <input onChange={handleSearchChange}/> </div>

const AddNewPerson = (props) => {
  const { addPerson, newName, newNumber, handleNameChange, handleNumberChange } = props;
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        number: <input
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



export default App