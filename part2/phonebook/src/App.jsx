import { useState, useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import people from './services/allpeoples'
import './index.css'

const AddedMessage = ({message}) => {
  if(message[0] === null){
    return
  }
  if(message[1]){
    return (
      <div className='add-message-pos'>{message}</div>
    )
  }
  else{
    return (
      <div className='add-message-neg'>{message}</div>
    )
  }

}


const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredArr, setFilteredArr] = useState([]);
  const [addMessage, setAddMessage] = useState([null,false]);

  const hook = () => {
    people.getAll().then(data => {
      setPersons(data);
    })
  }

  useEffect(hook,[]);

  const handleSubmitClick = (event) => {
    event.preventDefault();
    if(persons.some(item => item.name === newName)){
      const wc = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(wc){
        console.log(persons.map(person => person.name));
        const index = persons.map(person => person.name).indexOf(newName);
        const Arr = [...persons];
        people.replace(persons[index].id,{name: newName, number: newNumber})
          .then(updatePerson => {
            Arr[index].number = updatePerson.number;
            setPersons([...Arr]);
          })
        
      }
    } 
    else{
      people.create({name: newName, number: newNumber}).then(person => {
        setPersons([...persons,person]);
      })
    }
    setAddMessage([`Added ${newName}`,true]);
    setTimeout(()=>{
      setAddMessage([null,false])
    },5000)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const handleSearchInput = (event) => {
    let regex = new RegExp(event.target.value,"i");
    setFilteredArr(persons.filter(person => regex.test(person.name)));
  }

  const handleDeleteClick = (id) => {
    const index = persons.map(human => human.id).indexOf(id);
    const wc = window.confirm(`delete contact:  ${persons[index].name}   ${persons[index].number}`);
    if(wc){
      people
        .remove(id)
        .catch(error => {
          setAddMessage([`Information of ${persons[index].name} has already been removed from the server`],false)
          setTimeout(()=>{
            setAddMessage([null,false])
          },5000)
        })
      
      const filter = persons.filter(person => person.id !== id);
      setPersons(filter);
      setFilteredArr(filter);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchInput={handleSearchInput}/>
      <AddedMessage message={addMessage}/>
      <h2>Add a new number</h2>
      <PersonForm handleSubmitClick={handleSubmitClick} handleNumberInput={handleNumberInput} handleNameInput={handleNameInput}/>
      <h2>Numbers</h2>
      <Contacts filteredArr={filteredArr} persons={persons} handleDeleteClick={handleDeleteClick}/>
      ...
    </div>
  )
}

export default App