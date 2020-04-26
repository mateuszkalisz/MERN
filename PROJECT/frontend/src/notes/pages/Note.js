import React, { useContext, useState} from "react";
import { useParams, Link } from "react-router-dom";
import {AuthContext} from '../../shared/context/AuthContext';
import DeleteModal from '../../shared/UIElements/DeleteModal';

import "./Note.css";

const Note = () => {

  const DUMMY_NOTES = [
    {
      id: 1,
      title: 'O skryptach nr1dsadsadsadasda',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'IG',
      team: 'CoreFr',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '10/03/2019'
    },
    {
      id: 2,
      title: 'O skryptach nr2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'ETL',
      team: 'CoreFr',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '21/06/2019'
    },
    {
      id: 3,
      title: 'O sqlkach 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SQL',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '1/07/2018'
    },
    {
      id: 4,
      title: 'O sqlkach 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'ADMIN',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '30/09/2018'
    },
    {
      id: 5,
      title: 'Inne 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SQL',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 6,
      title: 'Skrypcik1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 7,
      title: 'Skrypcik 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'OTHERS',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 8,
      title: 'Skrypcik 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'ETL',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020'
    },
    {
      id: 9,
      title: 'Skrypcik 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '15/02/2020'
    },
  ];

  
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const auth = useContext(AuthContext);

  const params = useParams();
  const noteId = params.noteId;

  let note = DUMMY_NOTES.filter((note) => note.id.toString() === noteId);
  note = note[0];


  const closeDeleteModal = () =>{
    setShowDeleteModal(null);
  }

  const acceptDeleteNote = () =>{
    setShowDeleteModal(null);

    const noteIndex = DUMMY_NOTES.findIndex( dummy => dummy.id === note.id);

    // const deletedItem = 
    DUMMY_NOTES.splice(noteIndex, 1);

    console.log("The note has been removed!");

    // console.log(deletedItem);
    // console.log(DUMMY_NOTES);

  }

  const deleteNoteHandler = () =>{
    setShowDeleteModal(true);
  }

  return (
    <>
    {showDeleteModal ? <DeleteModal
    onDelete={acceptDeleteNote}
    onClose={closeDeleteModal}
    className="delete"
    header="Delete"
    content="Do you really want to delete this note?"
    /> : null}
    <div className="currentNote">
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
        {auth.userId === note.creatorId ? <Link to={`/notes/${note.id}/update`}><button className="editNote">EDIT</button></Link>: null}
        {auth.userId === note.creatorId ? <button className="deleteNote" onClick={deleteNoteHandler}>DELETE</button> : null}
      </div>
    </div>
    </>
  );
};

export default Note;
