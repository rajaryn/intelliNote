// In static/chat.js

document.addEventListener("DOMContentLoaded", () => {
  // --- START: ACCORDION LOGIC ---
  // This makes the "Summary" and "Chat" tabs work like an accordion
  const aiPanel = document.getElementById("ai-panel");
  if (aiPanel) {
    const allDetails = aiPanel.querySelectorAll(":scope > details");

    allDetails.forEach((details) => {
      details.addEventListener("toggle", (e) => {
        // If this tab was just opened...
        if (e.target.hasAttribute("open")) {
          // ...close all *other* tabs.
          allDetails.forEach((d) => {
            if (d !== e.target) {
              d.removeAttribute("open");
            }
          });
        }
      });
    });
  }
  // --- END: ACCORDION LOGIC ---

  // --- START: CHAT LOGIC ---
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  // Exit if the chat elements are not on this page
  if (!chatForm || !chatInput || !chatMessages) {
    return;
  }

  const docId = chatForm.dataset.docId;

  // 1. Listen for the "Send" button click
  chatForm.addEventListener("submit", async (e) => {
    // 2. Stop the page from reloading
    e.preventDefault();

    const message = chatInput.value.trim();
    if (!message) return;

    // 3. Add the user's message to the chat window
    addMessageToChat(message, "user");
    chatInput.value = ""; // Clear the input box

    // 4. Show a "Thinking..." message
    const thinkingMessage = addMessageToChat("Thinking...", "bot");
    thinkingMessage.classList.add("thinking");

    try {
      // 5. Send the message to your Flask backend
      const response = await fetch(`/chat/${docId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Network response was not ok.");
      }

      // 6. Get the JSON response from Flask
      const data = await response.json();

      // 7. Replace "Thinking..." with the real answer
      if (data.reply) {
        thinkingMessage.querySelector("p").textContent = data.reply;
        thinkingMessage.classList.remove("thinking");
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Chat error:", error);
      // Show an error message in the chat
      thinkingMessage.querySelector("p").textContent =
        "Sorry, an error occurred: " + error.message;
      thinkingMessage.classList.remove("thinking");
    }
  });

  // This is a helper function to add a new chat bubble to the screen
  function addMessageToChat(message, sender) {
    const messageElement = document.createElement("article");
    messageElement.classList.add("chat-message", sender);

    const textElement = document.createElement("p");
    textElement.textContent = message;
    messageElement.appendChild(textElement);

    chatMessages.appendChild(messageElement);

    // Scroll to the bottom so the new message is visible
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageElement;
  }
  // --- END: CHAT LOGIC ---
});
