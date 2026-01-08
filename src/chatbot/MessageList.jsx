import { useEffect, useRef } from 'react'

/**
 * MessageList component - renders messages and handles auto-scroll
 */
const MessageList = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p>Start a conversation by sending a message!</p>
        </div>
      )}
      
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.text}
            </p>
            <p
              className={`text-xs mt-1 ${
                message.sender === 'user'
                  ? 'text-blue-100'
                  : 'text-gray-500'
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start animate-fade-in">
          <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
            <div className="flex items-center gap-1">
              <span className="text-sm">Bot is typing</span>
              <div className="flex gap-1 ml-2">
                <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList

