import ChatWidget from './chatbot/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Chatbot Widget Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Click the chat icon in the bottom-right corner to start chatting!
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome</h2>
          <p className="text-gray-700">
            This is a demo page to showcase the chatbot widget. The floating
            chat icon is positioned at the bottom-right corner of the screen.
          </p>
        </div>
      </div>
      <ChatWidget />
    </div>
  )
}

export default App

