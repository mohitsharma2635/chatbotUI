
import { useState } from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { processUserQuery } from './api'

/**
 * ChatWindow component - main chat interface
 */
const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (text) => {
    // Add user message
    const userMessage = {
      sender: 'user',
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Show typing indicator
    setIsTyping(true)

    try {
      // Process user query and call appropriate FHIR API
      const botResponse = await processUserQuery(text)

      // Add bot response
      const botMessage = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      // Handle error
      const errorMessage = {
        sender: 'bot',
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      // Hide typing indicator
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat Support</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded p-1 transition-colors"
          aria-label="Close chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Message List */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  )
}

export default ChatWindow

