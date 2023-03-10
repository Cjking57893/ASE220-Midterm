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
                        window.location.href = `example-index.html?id=${id}`;
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
                        window.location.href = `example-index.html?id=${data[i].id}`;
                    }
                    else if (i == data.length - 1) {
                        alert("Incorrect username or password.");
                    }
                }
            }));
        })
    },
    index: () => {
        database.users(chatvia.documentID, (data) =>{
            
            //hide initial messages template
            let sentMessages=$(".sent-msg");
            for(let i=0;i<sentMessages.length;i++){
                sentMessages[i].style.display="none";
            }

            const MAINUSER=data[getAllUrlParams().id-1];
            console.log(MAINUSER);
            //start setting profile images
                //note: need to update chat avatar and add a way for user to upload their own imgs
            let smProfImg = $(".profile-user");
            let profImg = $(".avatar-lg");
            
            for(let i=0; i<profImg.length; i++){
                profImg[i].src='https://sienaconstruction.com/wp-content/uploads/2017/05/test-image.jpg';
            }
            for(let i=0; i<smProfImg.length; i++){
                smProfImg[i].src='https://sienaconstruction.com/wp-content/uploads/2017/05/test-image.jpg'; //these will be GET calls for users profile image --- not sure how to change the conversation image
            }
            //end setting profile images

            //start setting users name
            let name = $(".users-name");
            let conversationName = $(".conversation-name")

            for(let i=0; i<name.length; i++){
                name[i].innerHTML=`${MAINUSER.firstName} ${MAINUSER.lastName}`;
            }
            for(let i=0; i<conversationName.length; i++){
                conversationName[i].innerHTML="enter Conversation Name here"; //not sure how to tell what user you are talking to
            }
            //end setting users name

            //start displying users email
            let email = $(".users-email");
            for(let i=0;i<email.length;i++){
                email[i].innerHTML=MAINUSER.email;
            }
            //end displaying users email

            //start location
            let userLocation = $(".user-location");
            for(let i=0;i<userLocation.length;i++){
                userLocation[i].innerHTML=MAINUSER.location;
            }
            //end location

            //start contact list
                //populates contact list
            let contactList=$(".contact-list");
            for(let i=0; i<data.length; i++){
                contactList[0].innerHTML += `
                <li class="user-contact">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h5 class="font-size-14 m-0 contact-name">${data[i].firstName} ${data[i].lastName}</h5>
                    </div>
                </div>
            </li>`
            }

            //contact on click
            let contact = $(".user-contact");
            for(let i=0;i<contact.length;i++){
                contact[i].addEventListener('click',function(){
                    alert("test");
                })
            }
        })
    }
}