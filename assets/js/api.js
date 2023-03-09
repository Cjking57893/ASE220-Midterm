const api = {
    endpoint: "https://jsonblob.com/api/jsonBlob/",
    GET: (documentID, callback) => {
        axios.get(`${api.endpoint}${documentID}`)
        .then(response => {
            callback(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}