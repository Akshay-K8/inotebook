
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
  const host ="http://localhost:5000"
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial)

   //Get all Notes
   const getNotes = async ()=>{
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMzYxNjAzY2RlOTNmNmRhOTQwYmNlIn0sImlhdCI6MTYzOTIzMzg2OH0.RzOUTwXsvXDdagIoM50uico0YgQKBkvWlKang7X5YUQ"
       
      }    
  });
  const json = await response.json()
  console.log(json)
  setNotes(json)
}  
  //Add a Note 
  const addNote = async (title, description, tag)=>{
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMzYxNjAzY2RlOTNmNmRhOTQwYmNlIn0sImlhdCI6MTYzOTIzMzg2OH0.RzOUTwXsvXDdagIoM50uico0YgQKBkvWlKang7X5YUQ"
       
      },
    
      body: JSON.stringify({title,description,tag}) 
  });
    
  const json = await response.json();
  console.log(json)



    const note = {
      "_id": "61c5c641c97f32f690156d00",
      "user": "61b361603cde93f6da940bce",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-12-16T13:21:35.077Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //Delete a Note 
  const deleteNote = async (id) => {
    //API CAll
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMzYxNjAzY2RlOTNmNmRhOTQwYmNlIn0sImlhdCI6MTYzOTIzMzg2OH0.RzOUTwXsvXDdagIoM50uico0YgQKBkvWlKang7X5YUQ"
       
      }
    
      
  });
    const json =  response.json(); 
    console.log(json)

  console.log("Deleting the note with id" + id);
  const newNotes = notes.filter((note)=>{return note._id !== id })
  setNotes(newNotes)
  }
  //Edit a Note
  const editNote = async (id, title, description, tag )=>{
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMzYxNjAzY2RlOTNmNmRhOTQwYmNlIn0sImlhdCI6MTYzOTIzMzg2OH0.RzOUTwXsvXDdagIoM50uico0YgQKBkvWlKang7X5YUQ"
       
      },
    
      body: JSON.stringify({title, description, tag}) 
  });
    const json = await response.json(); 
    console.log(json)
  
  let newNotes = JSON.parse(JSON.stringify(notes))

    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(id, newNotes);
    setNotes(newNotes);
  }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote ,editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}



export default NoteState;