const api = {
    endpoint: "https://jsonblob.com/api/jsonBlob/",
    GET: (documentID, callback) => {
        axios.get(`${api.endpoint}${documentID}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            console.log(error);
        });
    },
    PUT: (documentID, data, callback) => {
        axios.put(`${api.endpoint}${documentID}`, data)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            console.log(error);
        });
    }
}