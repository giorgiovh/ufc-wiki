import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useFirestore } from '../hooks/useFirestore';

export default function SessionCard({ session, sessionId }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedSession, setEditedSession] = useState({ name: session.name })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const navigate = useNavigate()

  const { deleteDocument: deleteSession, updateDocument: updateSession } = useFirestore('sessions', sessionId)

  const handleClickOpen = () => {
    setIsDeleteDialogOpen(true)
  };

  const handleClose = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleDelete = () => {
    deleteSession()
    navigate('/sessions')
  }

  const handleEditClickOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditSubmit = async () => {
    handleEditClose();
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/sessions/${session.id}`)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {session.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={handleEditClickOpen}
          startIcon={<EditIcon />}
          size="small"
        >
          Edit
        </Button>
        <Dialog
          open={isEditDialogOpen}
          onClose={handleEditClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Session</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Session Name"
              type="text"
              fullWidth
              value={editedSession.name}
              onChange={(e) => setEditedSession({ ...editedSession, name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button
              onClick={handleEditSubmit}
              color="primary"
              variant="contained"
              disabled={!editedSession.name}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={handleClickOpen}
          startIcon={<DeleteIcon />}
          size="small"
        >
          Delete
        </Button>
        <Dialog
          open={isDeleteDialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete the session ${session.name}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
