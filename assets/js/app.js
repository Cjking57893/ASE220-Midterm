const chatvia = {
    documentID: "1083125169756848128",
    authRegister: () => {
        database.users(chatvia.documentID, (data) => {

            $(document).ready($("button").on("click", (event) => {
                event.preventDefault();

                let areFieldsBlank = false;

                $('#form *').filter(':input').each(function () {
                    if ($(this).prop("tagName") == "INPUT") {
                        if ($(this).val() == "") {
                            areFieldsBlank = true;
                        }
                    }
                });

                if (!areFieldsBlank) {
                    database.addUser(chatvia.documentID, {
                        id: data.length += 1,
                        firstName: $("#firstName").val(),
                        lastName: $("#lastName").val(),
                        email: $("#email").val(),
                        username: $("#username").val(),
                        password: $("#password").val(),
                        location: "N/A"
                    });
                }
                else {
                    alert("All fields need to be filled in before submitting.");
                }
            }
            ));

        })
    }
};