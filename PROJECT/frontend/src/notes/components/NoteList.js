import React from 'react';
import NoteItem from './NoteItem';

import './NoteList.css';

const NoteList = (props) =>{
    if(props.notes.length === 0){
        return(
            <div className="notNotesFound">
                <h2>No notes found</h2>
            </div>
        );
    }
    else{
        return(
            <ul className="notesList">
                {props.notes.map(note => (
                    <NoteItem
                    key={note.id}
                    id={note.id}
                    noteTitle={note.title}
                    noteContent={note.description}
                    noteAuthor={note.creator}
                    noteCreateDate={note.createDate}
                    />
                ))}
            </ul>
        )
    }
}

export default NoteList;