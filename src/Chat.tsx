import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SimpleMessage from './SimpleMessage';

const socket = io('http://localhost:3000');

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { user: 'A', text: 'Hello, this is User A!', timestamp: new Date().toLocaleTimeString() },
      { user: 'B', text: 'Hi User A, this is User B!', timestamp: new Date().toLocaleTimeString() }
    ];
  });
  const [text, setText] = useState<string>('');
  const user = localStorage.getItem('user');

  useEffect(() => {
    socket.on('message', (message: any) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (text) {
      const message = { user, text, timestamp: new Date().toLocaleTimeString() };
      socket.emit('message', message);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      setText('');
      window.location.reload(); // Refresh the page
    }
  };

  const handleReply = (replyText: string, replyingTo: string) => {
    const replyMessage = {
      user,
      text: `Reply to ${replyingTo}: ${replyText}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    socket.emit('message', replyMessage);
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, replyMessage];
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <SimpleMessage key={index} {...msg} onReply={handleReply} />
        ))}
      </div>
      <h5>Enter your message here:</h5>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        className="form-control mt-2"
      />
    </div>
  );
};

export default Chat;
