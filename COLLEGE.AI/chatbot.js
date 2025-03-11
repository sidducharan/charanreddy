document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    const chatbotHeader = document.getElementById('chatbot-header');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    let isChatbotOpen = false;

    chatbotHeader.addEventListener('click', function() {
        isChatbotOpen = !isChatbotOpen;
        chatbot.style.display = isChatbotOpen ? 'flex' : 'none';
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${sender}: ${message}`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function sendUserMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            appendMessage('You', message);
            processMessage(message.toLowerCase());
            chatbotInput.value = '';
        }
    }

    function sendPredefinedMessage(message){
        appendMessage('You', message);
        processMessage(message.toLowerCase());
    }

    function processMessage(message) {
        if (message.includes('courses')) {
            fetch('data/courses.json')
                .then(response => response.json())
                .then(courses => {
                    let response = "Our courses are:\n";
                    courses.forEach(course => {
                        response += `${course.course} (${course.code}): ${course.description}\n`;
                    });
                    appendMessage('Chatbot', response);
                });
        } else if (message.includes('admission')) {
            fetch('data/admissions.json')
                .then(response => response.json())
                .then(admissions => {
                    let response = `Admission process: ${admissions.admission_process}\nEAMCET code: ${admissions.EAMCET_Code}\nContact: ${admissions.contact_email}`;
                    appendMessage('Chatbot', response);
                });
        } else if (message.includes('placement')) {
            fetch('data/placements.json')
                .then(response => response.json())
                .then(placements => {
                    let response = `Average salary: ${placements.average_salary}\nTop recruiters: ${placements.top_recruiters.join(', ')}`;
                    appendMessage('Chatbot', response);
                });
        } else if(message.includes('eamcet code')){
            fetch('data/admissions.json')
            .then(response => response.json())
            .then(admissions => {
                let response = `EAMCET code: ${admissions.EAMCET_Code}`;
                appendMessage('Chatbot', response);
            });

        } else if(message.includes('hello')){
            appendMessage('Chatbot', 'Hello there! How can I help you?');
        } else {
            appendMessage('Chatbot', "I'm sorry, I don't have that information.");
        }
    }

    chatbotSend.addEventListener('click', sendUserMessage);
    chatbotInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendUserMessage();
        }
    });
});