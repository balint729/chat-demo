import React from 'react';

type Message = {
    message: string;
    timestamp: string;
    title: string;
}

const ChatBox: React.FC = () => {

    const [messageContainer, setMessageContainer] = React.useState<Message[]>([]);
    
    const evtSource = new EventSource('/eventstream');
    evtSource.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        console.log(`New message received ${data}`, data);
        setMessageContainer([
            ...messageContainer,
            data
        ]);
        
    })

    return (
            <div>
                {messageContainer.map((message, index) => (
                    <div>
                        <p key={`timeStamp-${index}`}>
                            {new Date(message.timestamp).toString()}
                        </p>
                        <p key={`message-${index}`}>
                            {message.message}
                        </p>
                    </div>
                ))}
            </div>
            
    )
}


export default ChatBox;