const PersonForm = ({handleNameInput, handleNumberInput, handleSubmitClick}) => {
    return (
      <form>
          <div>
            name: <input onChange={handleNameInput}/>
          </div>
          <div>
            number: <input onChange={handleNumberInput}/>
          </div>
          <div>
            <button type="submit" onClick={handleSubmitClick}>add</button>
          </div>
      </form>
    )
}

export default PersonForm