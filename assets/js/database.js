const database = {
    users: (documentID, callback) => {
        api.GET(documentID, (response) => {
            callback(response.data.users);
        });
    },
    chats: (documentID, callback) => {
        api.GET(documentID, (response) => {
            callback(response.data.chats);
        });
    },
    messages: (documentID, callback) => {
        api.GET(documentID, (response) => {
            callback(response.data.messages);
        });
    }
}