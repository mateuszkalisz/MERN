import React from "react";
import {useParams} from "react-router-dom";

import "./Note.css";

const Note = () => {

  const DUMMY_NOTES = [
    {
      id: 1,
      title: 'O skryptach nr1',
      description: 'O skryptach nr1.. O skryptach nr1.. O skryptach nr1.. O skryptach nr1.. O skryptach nr1.. O skryptach nr1.. O skryptach nr1..',
      category: 'SCRIPT',
      team: 'CoreFr',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '10/03/2019'
    },
    {
      id: 2,
      title: 'O skryptach nr2',
      description: 'O skryptach nr2.. O skryptach nr2.. O skryptach nr2.. O skryptach nr2.. O skryptach nr2.. O skryptach nr2.. O skryptach nr2..',
      category: 'SCRIPT',
      team: 'CoreFr',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '21/06/2019'
    },
    {
      id: 3,
      title: 'O sqlkach 1',
      description: 'O sqlkach nr1.. O sqlkach nr1.. O sqlkach nr1.. O sqlkach nr1.. O sqlkach nr1.. O sqlkach nr1.. O sqlkach nr1.. O sqlkach nr1..',
      category: 'SQL',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '1/07/2018'
    },
    {
      id: 4,
      title: 'O sqlkach 2',
      description: 'O sqlkach nr2.. O sqlkach nr2.. O sqlkach nr2.. O sqlkach nr2.. O sqlkach nr2.. O sqlkach nr2.. O sqlkach nr2.. O sqlkach nr2..',
      category: 'SQL',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '30/09/2018'
    },
    {
      id: 5,
      title: 'Inne 1',
      description: 'O Inne 1..O Inne 1..O Inne 1.. O Inne 1.. O Inne 1.. O Inne 1..O Inne 1.. O Inne 1.. O Inne 1.. O Inne 1..',
      category: 'OTHERS',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 6,
      title: 'Skrypcik1',
      description: 'Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1 Skrypcik1',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 7,
      title: 'Skrypcik 2',
      description: 'Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2 Skrypcik 2',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 8,
      title: 'Skrypcik 3',
      description: 'Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3 Skrypcik 3',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 9,
      title: 'Skrypcik 4',
      description: 'Skrypcik 4 Skrypcik 4 Skrypcik 4 Skrypcik 4 Skrypcik 4Skrypcik 4 Skrypcik 4 Skrypcik 4 Skrypcik 4 Skrypcik 4',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '15/02/2020'
    },
  ];

  const params = useParams();

  const noteId = params.noteId;

  let note = DUMMY_NOTES.filter(note => note.id.toString() === noteId);
  note = note[0]; 

  return <div className="currentNote">
    <div className="currentNoteHeader">
          <h2>{note.title}</h2>
        </div>
        <div className="currentNoteDescription">
          <p>{note.description}</p>
        </div>
        <div className="currentNoteFooter">
          <h3>{note.creator}</h3>
          <h4>{note.createDate}</h4>
        </div>
        <div className="currentNoteOptions">
          <button className="editNote">EDIT</button>
          <button className="deleteNote">DELETE</button>
        </div>
  </div>;
};

export default Note;
