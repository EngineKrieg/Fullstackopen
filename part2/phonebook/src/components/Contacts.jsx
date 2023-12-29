const Contacts = ({filteredArr,persons,handleDeleteClick}) => {

  

    return (
      <>
        {filteredArr.length===0 
          ? persons.map(person => <p key={person.id}>{person.name}  {person.number} <button onClick={() => handleDeleteClick(person.id)}>delete</button></p>) 
          : filteredArr.map(person => <p key={person.id}>{person.name}  {person.number}<button onClick={() => handleDeleteClick(person.id)}>delete</button></p>)}
      </>
    )
}


export default Contacts