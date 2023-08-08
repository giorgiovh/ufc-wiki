// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';

// components
import SessionCard from '../../components/SessionCard';

// hooks
import { useCreateSession } from '../../hooks/useCreateSession';
import { useJoinSession } from '../../hooks/useJoinSession';
import { useCollection } from '../../hooks/useCollection'

// styles
import styles from './Sessions.module.css';
import { useSelector } from 'react-redux';

export const Sessions = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [sessionCode, setSessionCode] = useState('');

  const { createSession } = useCreateSession();
  const { joinSession } = useJoinSession();

  const navigate = useNavigate();

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
    navigate(`/sessions/${newSessionId}`);
  }

  const handleSubmitJoin = async () => {
    const sessionId = await joinSession(sessionCode);
    setSessionCode('');
    handleCloseJoin();
    if (sessionId) {
      navigate(`/sessions/${sessionId}`);
    }
  }

  // get the logged in user from Redux store
  const loggedInUser = useSelector(state => ({
    uid: state.auth.uid,
    displayName: state.auth.displayName
  }))

  // Get the sessions that the loggedInUser is a member of
  const { documents: sessions } = useCollection(
    'sessions',
    null,
    null,
    ['members', 'array-contains', { displayName: loggedInUser.displayName, id: loggedInUser.uid }]
  );

  return (
    <div className={styles.sessionsDashboardPage}>
      <div className={styles.titleContainer} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4' gutterBottom>
          Your Sessions
        </Typography>
        <div className={styles.buttonGroup}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleOpenJoin}>
            Join Session
          </Button>
          <Button variant="contained" color="secondary" onClick={handleOpenCreate}>
            Create Session
          </Button>
        </div>
      </div>
      {/* Rest of the code, including Dialog components and Grid for displaying SessionCards */}
      {sessions && sessions.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {sessions.map(session => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <SessionCard key={session.id} session={session} sessionId={session.id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant='h6' gutterBottom>
          You are not part of any session. Please join or create a session.
        </Typography>
      )}

      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>Create Session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="sessionName"
            label="Session Name"
            type="text"
            fullWidth
            value={sessionName}
            onChange={handleSessionNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>
            Cancel
          </Button>
          <Button onClick={handleSubmitCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openJoin} onClose={handleCloseJoin}>
        <DialogTitle>Join Session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="sessionCode"
            label="Session Code"
            type="text"
            fullWidth
            value={sessionCode}
            onChange={handleSessionCodeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoin}>
            Cancel
          </Button>
          <Button onClick={handleSubmitJoin} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
