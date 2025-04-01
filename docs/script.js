document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate Sections on Scroll
    const animatedSections = document.querySelectorAll('.animated-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Simple AI Chatbot
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotClose = document.getElementById('chatbot-close');

    // Predefined AI responses
    const aiResponses = {
        greetings: [
            "Hello! How can I help you today?",
            "Hi there! Welcome to P@C. What can I assist you with?",
            "Greetings! I'm the P@C AI assistant."
        ],
        services: [
            "We offer AI-powered solutions including interview systems, coding assessments, and sentiment analysis.",
            "Our AI services range from automated interviews to custom AI bots for businesses.",
            "P@C specializes in cutting-edge AI technologies to transform business processes."
        ],
        contact: [
            "You can reach us at yaswanthsaipodapati@gmail.com",
            "Feel free to use our contact form to get in touch with our team.",
            "We're always happy to discuss how AI can help your business."
        ],
        default: [
            "I'm not sure I understand. Could you rephrase that?",
            "Can you provide more details?",
            "I'm still learning. Could you be more specific?"
        ]
    };

    function getAIResponse(userMessage) {
        const lowercaseMessage = userMessage.toLowerCase();

        if (['hi', 'hello', 'hey'].some(greeting => lowercaseMessage.includes(greeting))) {
            return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
        }

        if (lowercaseMessage.includes('service') || lowercaseMessage.includes('ai')) {
            return aiResponses.services[Math.floor(Math.random() * aiResponses.services.length)];
        }

        if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('email')) {
            return aiResponses.contact[Math.floor(Math.random() * aiResponses.contact.length)];
        }

        return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    chatbotToggle.addEventListener('click', () => {
        if (chatbotContainer.style.display === 'flex') {
            chatbotContainer.style.display = 'none';
        } else {
            chatbotContainer.style.display = 'flex';
            addMessage('ai', "Hello! I'm the P@C AI assistant. How can I help you today?");
        }
    });

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatbotInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                const aiResponse = getAIResponse(message);
                addMessage('ai', aiResponse);
            }, 500);
        }
    }

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });
});
