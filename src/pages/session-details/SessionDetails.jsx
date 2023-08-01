import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

export const SessionDetails = () => {
  const { sessionId } = useParams()

  const { document: session } = useDocument('sessions', sessionId)

  return (
    <div className="page">
      {session &&
        <>
          <h2>{session.name}</h2>
          <p>Code to join: <strong>{session.code}</strong></p>
          <h3>Event: {session.event}</h3>
          <h3>Members:</h3>
          <ul>{session.members.map(
            member => <li>{member.displayName}</li>
          )}</ul>
        </>
      }
    </div>
  )
}
