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
            var convo; //to tell what conversation is displayed
            //hide initial messages template
            function hideMsgs(){
                console.log("called hide msg");
                let sentMessages=$(".placeholder-msg");
                for(let i=0;i<sentMessages.length;i++){
                    sentMessages[i].style.display="none";
                }
            }
            //hideMsgs();

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
                if(data[i].id != MAINUSER.id){
                    contactList[0].innerHTML += `
                    <li class="user-contact" id="${data[i].id}">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <h5 class="font-size-14 m-0 contact-name">${data[i].firstName} ${data[i].lastName}</h5>
                        </div>
                    </div>
                </li>`
                }
            }
            //contact on click shows conversation
            let contact = $(".user-contact");
            var chatID;
            var chatName;
            for(let i=0;i<contact.length;i++){
                contact[i].addEventListener('click',function(){
                    hideMsgs();
                    convo=contact[i].id;

                    //changing the conversation names after clicking
                    
                    for(let j=0; j<conversationName.length; j++){
                        chatName = data[i].firstName + " " + data[i].lastName;
                        chatID = data[i].id;
                        conversationName[j].innerHTML=`${chatName}`;
                    }
                    showMsgs(chatID, chatName);  
                })
            }
            //show messages
            var chatDataUpdate;
            var chatLog;
            function showMsgs(chatID, chatName){
                database.messages(chatvia.documentID, function(chatData){
                    chatDataUpdate=chatData;
                    console.log("called show msgs");
                    chatLog=$(".chat-log")
                    for(let i=0; i<chatData.length; i++){
                        if(chatData[i].to == MAINUSER.id && chatData[i].from == chatID){
                            chatLog[0].innerHTML+=`<li class="sent-msg">
                            <div class="conversation-list">
                                <div class="chat-avatar">
                                    <img src="assets/images/users/avatar-4.jpg" alt="">
                                </div>
    
                                <div class="user-chat-content">
                                    <div class="ctext-wrap">
                                        <div class="ctext-wrap-content">
                                            <p class="mb-0">
                                                ${chatData[i].text}
                                            </p>
                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle">${chatData[i].dateSent}</span></p>
                                        </div>
                                    </div>
                                    <div class="conversation-name">${chatName}</div>
                                </div>
                            </div>
                        </li>`;
                        }
                        if(chatData[i].to==chatID && chatData[i].from==MAINUSER.id){
                            chatLog[0].innerHTML+=`<li class="right sent-msg">
                            <div class="conversation-list">
                                <div class="chat-avatar">
                                    <img src="assets/images/users/avatar-1.jpg" alt="">
                                </div>

                                <div class="user-chat-content">
                                    <div class="ctext-wrap">
                                        <div class="ctext-wrap-content">
                                            <p class="mb-0">
                                                ${chatData[i].text}
                                            </p>
                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle">${chatData[i].dateSent}</span></p>
                                        </div>   
                                    </div>
                                    <div class="users-name">${MAINUSER.firstName} ${MAINUSER.lastName}</div>
                                </div>
                            </div>
                        </li>`;
                        }
                    }
                });
            }
            function updateMsgs(chatID, chatData, chatLog){
                console.log("called update msgs")
                for(let i=0; i<chatData.length; i++){
                    if(chatData[i].to==chatID && chatData[i].from==MAINUSER.id){
                        chatLog[0].innerHTML+=`<li class="right sent-msg">
                        <div class="conversation-list">
                            <div class="chat-avatar">
                                <img src="assets/images/users/avatar-1.jpg" alt="">
                            </div>
    
                            <div class="user-chat-content">
                                <div class="ctext-wrap">
                                    <div class="ctext-wrap-content">
                                        <p class="mb-0">
                                            ${chatData[i].text}
                                        </p>
                                        <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle">${chatData[i].dateSent}</span></p>
                                    </div>   
                                </div>
                                <div class="users-name">${MAINUSER.firstName} ${MAINUSER.lastName}</div>
                            </div>
                        </div>
                    </li>`;
                    }
                }
            }

            //sending messages
            let submit=$(".btn-primary");
            let content=$(".msg-content");
            console.log(submit);
            submit[0].addEventListener('click',function(msgData){
                console.log(content[0].value);
                let id=msgData.length++;
                database.addMessage(chatvia.documentID, {
                    id: id,
                    text: content[0].value,
                    from: MAINUSER.id,
                    to: convo,
                    chat: 1,
                    dateSent: "3/8/2023"
                })
                content[0].value = "";
            })
            updateMsgs(chatID, chatDataUpdate, chatLog);
        })
    }
}