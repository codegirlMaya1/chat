import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

type MessageProps = {
  user: string;
  text: string;
  timestamp: string;
  onReply: (text: string, replyingTo: string) => void;
};

const SimpleMessage: React.FC<MessageProps> = ({ user, text, timestamp, onReply }) => {
  const [replyText, setReplyText] = useState<string>('');
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const bgColor = user === 'A' ? 'gray' : user === 'B' ? 'blue' : user === 'C' ? 'green' : 'red';

  const handleReply = () => {
    if (replyText) {
      onReply(replyText, user);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <Container style={{ backgroundColor: bgColor, padding: '10px', margin: '10px 0', color: 'white' }}>
      <strong>{user}:</strong> {text}
      <div className="text-muted" style={{ fontSize: '0.8em' }}>{timestamp}</div>
      <Button variant="light" size="sm" onClick={() => setShowReplyInput(!showReplyInput)}>Reply</Button>
      {showReplyInput && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="form-control mt-2"
          />
          <Button variant="primary" size="sm" onClick={handleReply} className="mt-2">Send Reply</Button>
        </div>
      )}
    </Container>
  );
};

export default SimpleMessage;
