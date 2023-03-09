const database = {
    users: (documentID, callback) => {
        api.GET(documentID, response => {
            callback(response.data.users);
        });
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
    },
    addUser: (documentID, newUser) => {
        api.GET(documentID, response => {
            response.data.users.push(newUser);
            api.PUT(documentID, response.data, () => {
                console.log("User has been added");
            });
        })
    }
}