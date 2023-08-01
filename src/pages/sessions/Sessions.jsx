// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// mui
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

// hooks
import { useCreateSession } from '../../hooks/useCreateSession'
import { useJoinSession } from '../../hooks/useJoinSession'

export const Sessions = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [sessionCode, setSessionCode] = useState('');

  const { createSession } = useCreateSession();
  const { joinSession } = useJoinSession();

  const navigate = useNavigate()

  const handleOpenCreate = () => {
    setOpenCreate(true);
  }

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setSessionName('');
  }

  const handleOpenJoin = () => {
    setOpenJoin(true);
  }

  const handleCloseJoin = () => {
    setOpenJoin(false);
    setSessionCode('');
  }

  const handleSessionNameChange = (event) => {
    setSessionName(event.target.value);
  }

  const handleSessionCodeChange = (event) => {
    setSessionCode(event.target.value);
  }

  const handleSubmitCreate = async () => {
    const newSessionId = await createSession(sessionName);
    setSessionName('');
    handleCloseCreate();
    navigate(`/sessions/${newSessionId}`)
  }

  const handleSubmitJoin = async () => {
    const sessionId = await joinSession(sessionCode);
    setSessionCode('');
    handleCloseJoin();
    if (sessionId) {
      navigate(`/sessions/${sessionId}`);
    }
  }

  return (
    <div className="page">
      <h2>Sessions</h2>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleOpenJoin}>
          Join Session
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOpenCreate}>
          Add Session
        </Button>
      </div>

      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>Add a new session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Session Name"
            fullWidth
            value={sessionName}
            onChange={handleSessionNameChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitCreate} color="primary" variant="contained" disabled={!sessionName}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openJoin} onClose={handleCloseJoin}>
        <DialogTitle>Join a session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Session Code"
            fullWidth
            value={sessionCode}
            onChange={handleSessionCodeChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoin} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitJoin} color="primary" variant="contained" disabled={!sessionCode}>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
