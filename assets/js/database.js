var updated = false;
const database = {
    users: (documentID, callback) => {
        api.GET(documentID, response => {
            callback(response.data.users);
        });
        //add a way to upload pictures?
        //add bio? (dont have to include these if we dont want up to you)
    },
    chats: (documentID, callback) => {
        api.GET(documentID, response => {
            callback(response.data.chats);
        });
    },
    messages: (documentID, callback) => {
        api.GET(documentID, response => {
            callback(response.data.messages);
        });
        //need PUT method for sendin messages
    },
    addUser: (documentID, newUser) => {
        api.GET(documentID, response => {
            response.data.users.push(newUser);
            api.PUT(documentID, response.data, () => {
                console.log("User has been added");
            });
        });
    },
    addMessage: (documentID, newMessage) => {
        api.GET(documentID, response => {
            response.data.messages.push(newMessage);
            api.PUT(documentID, response.data, () => {
                console.log("Message has been added");
                updated = true;
                console.log(updated);
            });
        });
    }
}