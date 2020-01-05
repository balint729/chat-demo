import React, { useEffect } from 'react';

type Message = {
    message: string;
    timestamp: string;
    title: string;
}

const ChatBox: any = () => {

    const [messageContainer, setMessageContainer] = React.useState<Message[]>([]);
    
    useEffect(() => {
        const evtSource = new EventSource('/eventstream');
        evtSource.addEventListener('message', handleMessage)

        // Specify how to clean up after this effect:
        return function cleanup() {
            evtSource.removeEventListener('message', handleMessage);
        };
    });

    const handleMessage = (event: any) => {
            const data = JSON.parse(event.data);
            console.log(`New message received ${data}`, data);
            setMessageContainer([
                ...messageContainer,
                data
            ]);
            
    }

    

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