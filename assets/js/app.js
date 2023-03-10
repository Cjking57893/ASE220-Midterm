const chatvia = {
    documentID: "1083125169756848128",
    authRegister: () => {
        database.users(chatvia.documentID, (data) => {

            console.log(data);

            $(document).ready($("button").on("click", (event) => {
                let areFieldsBlank = false;

                event.preventDefault();

                $('#form *').filter(':input').each(function () {
                    if ($(this).prop("tagName") == "INPUT") {
                        if ($(this).val() == "") {
                            areFieldsBlank = true;
                        }
                    }
                });

                id = data.length += 1;

                if (!areFieldsBlank) {
                    database.addUser(chatvia.documentID, {
                        id: id,
                        firstName: $("#firstName").val(),
                        lastName: $("#lastName").val(),
                        email: $("#email").val(),
                        username: $("#username").val(),
                        password: $("#password").val(),
                        location: "N/A"
                    });
                    window.setTimeout(() => {
                        window.location.href = `index.html?id=${id}`;
                    }, 1000)
                }
                else {
                    alert("All fields need to be filled in before submitting.");
                }
            }
            ));
        })
    },
    authLogin: () => {
        database.users(chatvia.documentID, (data) => {
            $(document).ready($("button").on("click", (event) => {
                event.preventDefault();

                let username = $("#username").val();
                let password = $("#password").val();

                for (i = 0; i < data.length; i++) {
                    if (data[i].username == username && data[i].password == password) {
                        window.location.href = `index.html?id=${data[i].id}`;
                    }
                    else if (i == data.length - 1) {
                        alert("Incorrect username or password.");
                    }
                }
            }));
        })
    }
}