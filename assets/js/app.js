const chatvia = {
    documentID: "1083125169756848128",
    authRegister: () => {
        const form = $("form");
        let id = database.users.length + 1;
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let email = $("#email").val();
        let username = $("#username").val();
        let password = $("#password").val();
        let location = "NA";
        form.submit(database.addUser(chatvia.documentID, {
            "id": `${id}`,
            "firstName": `${firstName}`,
            "lastName": `${lastName}`,
            "email": `${email}`,
            "username": `${username}`,
            "password": `${password}`,
            "location": location
        }));
    }
};