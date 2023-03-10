const database = {
    users: (documentID, callback) => {
        api.GET(documentID, response => {
            callback(response.data.users);
        });
        //add a way to upload pictures?
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
    addUser: (documentID, newUser, callback) => {
        api.GET(documentID, response => {
            response.data.users.push(newUser);
            api.PUT(documentID, response.data, () => {
                console.log("User has been added");
            });
        });
    }
}