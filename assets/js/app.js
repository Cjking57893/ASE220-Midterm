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
                        window.location.href = `index.html?${id}`;
                    }, 500)
                }
                else {
                    alert("All fields need to be filled in before submitting.");
                }
            }
            ));
        })
    }
};