import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllNotes, createNote } from '../../store/notes';
import './CreateNoteForm.css'

const CreateNoteForm = ({ hideForm }) => {
  const currentUserId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();
  const history = useHistory();
  const [userId, setUserId] = useState(currentUserId)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notebookId, setNotebookId] = useState('');
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateNotebookId = (e) => setNotebookId(e.target.value);

  useEffect(() => {
    const errors = [];

    if (title.length >= 50) errors.push("Notebook title must be less than 50 characters")
    setErrors(errors)

  }, [title])

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  const reset = () => {
    setTitle("");
    setContent("");
    setNotebookId("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      title, 
      content,
      notebookId
    };

    let createdNote;
    createdNote = await dispatch(createNote(payload))
    if (createdNote) {
      history.push(`/notebooks/${createdNote.notebookId}`);
      reset()
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/notes/new');
    reset()
  };

  return (
    <section className='form'>
      <div className='add-note-text'>Add Note</div>
      <form onSubmit={handleSubmit}>
        <div className='error-message'>
          {errors.map((error) => <div key={error}>{error}</div>)}
        </div>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="text"
          placeholder="Content"
          required
          value={content}
          onChange={updateContent} />
        <input
          type="text"
          placeholder="NotebookId"
          required
          value={notebookId}
          onChange={updateNotebookId} />
        <button className='post-button' type="submit">Post New Note</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
}


export default CreateNoteForm;
