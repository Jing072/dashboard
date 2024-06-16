// Variabelen
const msgBox = document.querySelector(".message-box");
const userMsg = document.querySelector(".user-message");
const chatBot = document.querySelector(".chat-person");
const sendBtn = document.querySelector(".bi-send");
const messageInput = document.querySelector("#message");

// Event listener
sendBtn.addEventListener("click", function(e){
    // we stop the form from being submitted cause we have our own submit fetch logic
    e.preventDefault();
    e.stopPropagation();

    const message = messageInput.value;
    
    (async () => {
        const rawResponse = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        
        const content = await rawResponse.json();

        console.log(content);

        if (content.sendMessage) {
            console.log();
        } else {
            console.log();
        }
    })();

    // Het versturen van berichten
    msgBox.innerHTML += `
    <p class="text-message text-end bg-dark bg-opacity-10 rounded p-2 m-2">
        ${messageInput.value}
    </p>
    <p class="text-message bg-light rounded p-2 m-2"> Hello, how can I help you? </p>`;
});