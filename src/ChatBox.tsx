import React from 'react';

const ChatBox: React.FC = () => {

    const [message, setMessage] = React.useState('');

    const sendMessage = () => {
        fetch('/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({message: message})})
            .then((response) => {
                console.log(response)
            })
            .catch(error => console.log(error))
        
    }

    const handleChange = (value: string) => {
        setMessage(value);
    }

    return (
            <div>
                <input onChange={(event) => handleChange(event.target.value)}/>
                <button onClick={() => sendMessage()} children={'Send message'}/>
            </div>
            
    )
}


export default ChatBox;