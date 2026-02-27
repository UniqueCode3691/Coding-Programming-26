// Chatbot.jsx - AI-powered chatbot component for NearMeer.
// This component provides a chat interface using OpenAI's API.
// It allows users to ask questions and get responses related to local businesses and recommendations.

import { useState } from "react";
import OpenAI from "openai";

// Initialize OpenAI client with API key from environment variables.
// Allows browser usage for client-side requests.
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Function to get user coordinates.
// Returns a promise that resolves to lat/lng or unknown if failed.
export const getCoords = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
};

// Get user coordinates, default to unknown if failed.
const userCoords = await getCoords().catch(() => ({ lat: "unknown", lng: "unknown" }));

// Main Chatbot component.
// Manages chat state, sends messages to OpenAI, and renders the chat UI.
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending a message.
  // Adds user message, sends to OpenAI, adds bot response.
  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = { text: inputValue, sender: "user" };
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        // Prepare conversation history for OpenAI.
        const conversation = messages.concat(userMessage).map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));

        // System prompt to guide the AI's responses.
        const systemPrompt = {
          role: "system",
          content: "You are NearMeer AI, a helpful chatbot for the NearMeer platform. NearMeer is an intuitive neighborhood exploration platform designed to connect users with the heartbeat of their local community. By leveraging real-time geolocation and the OpenStreetMap Overpass API, the app provides a curated directory of restaurants, nightlife, shopping, and active-life spots tailored to the user's immediate vicinity. With a focus on visual authenticity, NearMeer utilizes dynamic, category-specific imagery and integrated Google Maps navigation to ensure every discovery is both reliable and engaging. Built with a modern tech stack featuring React, Tailwind CSS, and Supabase, it offers a seamless, secure, and aesthetic experience—complete with advanced filtering and smart search—to help anyone find exactly what they’re looking for, right around the corner. NearMeer helps users find local businesses, services, and recommendations. Provide suggestions for businesses, locations, or related advice based on user queries. Keep responses friendly, concise, and relevant to local discovery. The user's location is " + userCoords.lat + ", " + userCoords.lng + ". Use this information to provide location-specific recommendations when appropriate."
        };

        // Call OpenAI API for chat completion.
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [systemPrompt, ...conversation],
          max_tokens: 150,
        });

        const botText = response.choices[0].message.content;
        const botMessage = { text: botText, sender: "bot" };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error("AI API error");
        const errorMessage = { text: "Sorry, I'm having trouble responding right now. Please try again.", sender: "bot" };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    // Fixed position chat widget.
    <div className="fixed right-5 bottom-5 z-50">
      {open && (
        // Chat window when open.
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col transform transition-all duration-300 ease-in-out">
          {/* Chat header with close button. */}
          <div className="bg-gradient-to-r from-olivegreen to-olivedarkgreen text-white p-4 font-semibold rounded-t-lg flex justify-between items-center">
            NearMeer AI
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-olivetan text-xl"
            >
              ×
            </button>
          </div>

          {/* Messages container. */}
          <div className="flex-1 p-4 overflow-y-auto bg-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg mb-2 max-w-48 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-olivegreen text-white ml-auto"
                    : "bg-olivetan text-olivedarkgreen"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {/* Loading indicator. */}
            {isLoading && (
              <div className="bg-white text-olivedarkgreen p-3 rounded-lg mb-2 max-w-48 shadow-sm">
                Typing...
              </div>
            )}
          </div>

          {/* Input area. */}
          <div className="p-4 border-t border-gray-200 flex">
            <input
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 outline-none focus:ring-2 focus:ring-olivegreen"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <button
              className="bg-olivegreen text-white px-4 py-2 rounded-r-lg hover:bg-olivedarkgreen transition-colors"
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chat toggle button. */}
      <button
        className="w-14 h-14 bg-gradient-to-r from-olivegreen to-olivedarkgreen text-white rounded-full shadow-lg hover:from-olivedarkgreen hover:to-oliveleather transition-all duration-300 cursor-pointer flex items-center justify-center text-2xl animate-pulse"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>
    </div>
  );
}
