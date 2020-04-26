import React, { useState, useContext} from "react";
import {useParams} from "react-router-dom";
import Modal from "../../shared/UIElements/Modal";
import {AuthContext} from "../../shared/context/AuthContext";

import "./UpdateNote.css";

const UpdateNote = () => {

  const auth = useContext(AuthContext);

  const DUMMY_NOTES = [
    {
      id: 1,
      title: 'O skryptach nr1dsadsadsadasda',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'IG',
      team: 'CoreFr',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '10/03/2019',
      privacy: false,
    },
    {
      id: 2,
      title: 'O skryptach nr2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'ETL',
      team: 'CoreFr',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '21/06/2019',
      privacy: false
    },
    {
      id: 3,
      title: 'O sqlkach 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SQL',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '1/07/2018',
      privacy: false
    },
    {
      id: 4,
      title: 'O sqlkach 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'ADMIN',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '30/09/2018',
      privacy: false
    },
    {
      id: 5,
      title: 'Inne 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SQL',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020',
      privacy: false
    },
    {
      id: 6,
      title: 'Skrypcik1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020',
      privacy: true
    },
    {
      id: 7,
      title: 'Skrypcik 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'OTHERS',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020',
      privacy: true
    },
    {
      id: 8,
      title: 'Skrypcik 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'ETL',
      team: 'CoreFR',
      creatorId: 1,
      creator: 'Mateusz',
      createDate: '15/02/2020',
      privacy: false
    },
    {
      id: 9,
      title: 'Skrypcik 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus at gravida venenatis. Mauris laoreet dignissim venenatis. Maecenas vehicula viverra diam, id placerat ante commodo aliquam. Nulla pretium est nulla, in eleifend enim tristique vel. Etiam vitae lorem finibus, consectetur massa in, molestie lorem. Mauris nulla justo, eleifend vitae facilisis et, iaculis id lectus. Pellentesque auctor volutpat feugiat. Morbi suscipit et urna sed laoreet. Maecenas facilisis quam ex, sit amet sollicitudin tortor sagittis quis. Maecenas eget mauris a sem mattis tempus. Integer fringilla nisi vitae nisi maximus, sed consectetur leo eleifend. Sed auctor luctus lacinia. Vivamus congue, elit quis pulvinar lobortis, urna nisl fringilla nisl, et ullamcorper libero nisi id orci. Sed gravida arcu quis tellus interdum aliquet. Aenean est risus, tincidunt sit amet est vitae, iaculis lacinia mi. Duis semper mi id purus condimentum dapibus eu ac lacus. Sed sodales tincidunt eros non pretium. Nunc malesuada, nunc eget iaculis eleifend, erat nisl congue sem, vel maximus lectus felis ut sem. Mauris suscipit magna at viverra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in quam gravida, blandit odio sed, consequat massa.',
      category: 'SCRIPT',
      team: 'CoreFR',
      creatorId: 2,
      creator: 'Maja',
      createDate: '15/02/2020',
      privacy: true
    },
  ];

  const noteId = useParams().noteId;

  const updatedNote = DUMMY_NOTES.find(note => note.id.toString() === noteId);

  const [title, setTitle] = useState(updatedNote.title);
  const [content, setContent] = useState(updatedNote.description);
  const [category, setCategory] = useState(updatedNote.category);
  const [privacy, setPrivacy] = useState(updatedNote.privacy);

  const [showModal, setShowModal] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('Error');

  const closeModal = () => {
    setShowModal(null);
  };


  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const privacyHandler = () => {
    setPrivacy((prevState) => !prevState);
  };

  const updateNoteHandler = (e) => {
    e.preventDefault();

    if((title.length < 5 || title.length > 20) && content.length < 8){
      setModalType('Error');
      setModalContent(
        "Title and description is invalid! Title must be between 5 characters and 20 characters! Description must be at least 8 characters! Please try again."
      );
      setShowModal(true);
    }

    else if (title.length < 5 || title.length > 20) {
      setModalType('Error');
      setModalContent(
        "Title must be between 5 characters and 20 characters! Please try again."
      );
      setShowModal(true);
    }

    else if (content.length < 8) {
      setModalType('Error');
      setModalContent(
        "Description must be at least 8 characters! Please try again."
      );
      setShowModal(true);
    }

    if(title.length >= 5 && title.length <= 20 && content.length >= 8){

    setModalType('Succeed');
    setModalContent('Note has been updated');
    setShowModal(true);
    }
  };

  if(auth.userId === updatedNote.creatorId){
    return (
      <>
        {showModal ? (
          <Modal
            onClose={closeModal}
            className={modalType}
            header={modalType}
            content={modalContent}
          />
        ) : null}
        <div className={`newNote ${showModal ? "disabled" : ""}`}>
          <form className="newNoteForm" onSubmit={updateNoteHandler}>
            <div className="newTitle newInput newFormElement">
              <label htmlFor="newTitle">Title</label>
              <input
                type="text"
                id="newTitle"
                value={title}
                onChange={titleHandler}
                disabled={showModal === null ? false : true}
              />
            </div>
            <div className="newContent newInput newFormElement">
              <label htmlFor="newContent">Content</label>
              <textarea
                id="newContent"
                value={content}
                onChange={contentHandler}
                disabled={showModal === null ? false : true}
              />
            </div>
            <div className="selectCategory newInput newFormElement">
              <label htmlFor="selectCategory">Category</label>
              <select
                name="selectCategory"
                id="selectCategory"
                value={category}
                onChange={categoryHandler}
                disabled={showModal === null ? false : true}
              >
                <option value="SQL">SQL/Database</option>
                <option value="ETL">ETL/Komodo</option>
                <option value="SCRIPT">Scripting</option>
                <option value="ADMIN">Administration</option>
                <option value="IG">Instruction &amp; Guide</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
            <div className="newPrivacy newFormElement">
              <label htmlFor="newPrivacy">Private</label>
              <input
                type="checkbox"
                id="newPrivacy"
                checked={privacy}
                onChange={privacyHandler}
                disabled={showModal === null ? false : true}
              />
              <h4 className="newPolicy" style={{ display: "none" }}>
                The note will be visible only on your account.
              </h4>
            </div>
            <div className="newSubmit newFormElement">
              <button
                type="submit"
                onSubmit={updateNoteHandler}
                disabled={showModal === null ? false : true}
                style={showModal === null ? {} : {cursor: 'default', color: '#a9a9a9'}}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
  else{
    return(
      <div class="updateCenter">It isn't your note!</div>
    )
  }

};

export default UpdateNote;