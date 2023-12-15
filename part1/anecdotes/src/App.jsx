import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const copyArr = [...points];
  const handleAnecdoteClick = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }


  const handleVoteClick = () => {
    copyArr[selected]+=1;
    setPoints(copyArr);


    let mostVoted = 0;
    for(let i=0; i<copyArr.length; i++){
      

      if(mostVoted < copyArr[i]){
        mostVoted = copyArr[i];
        setMostVotedIndex(i);
      }
  
    }
   }
  


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Votes: {copyArr[selected]}</p>
      <div>
        <button onClick={handleVoteClick}>Vote</button>
        <button onClick={handleAnecdoteClick}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedIndex]}
      <p>Votes: {copyArr[mostVotedIndex]}</p>
    </div>
  )
}

export default App