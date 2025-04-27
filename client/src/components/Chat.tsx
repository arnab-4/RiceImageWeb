import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  prediction: string | null;
  confidence: number | null;
}

const Chat: React.FC<ChatProps> = ({ prediction, confidence }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Initialize once
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Gemini API key is not set in environment variables');
  }
  const genAI = useMemo(() => new GoogleGenerativeAI(apiKey), [apiKey]);

  // 2. Pick gemini-2.0-flash
  const model = useMemo(
    () => genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }),
    [genAI]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  const generateContext = () => {
    if (prediction && confidence) {
      return `The image has been classified as ${prediction} rice with ${(confidence * 100).toFixed(2)}% confidence. `;
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const context = generateContext();
      const prompt = `${context}Act as a rice expert. ${userMessage}`;

      // 3. Start a one-off chat (no prior history)
      const chatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1024,
        },
      });

      // 4. Send the user’s prompt
      const result = await chatSession.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto mt-8"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Chat with Rice Expert AI
      </h3>

      <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
        {messages.map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 ${
              message.role === 'assistant' ? 'bg-gray-50' : ''
            } p-3 rounded-lg`}
          >
            {message.role === 'assistant' ? (
              <Bot className="w-6 h-6 text-green-500 mt-1" />
            ) : (
              <User className="w-6 h-6 text-blue-500 mt-1" />
            )}
            <div className="flex-1 prose prose-sm max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500 p-3"
          >
            <Bot className="w-6 h-6 text-green-500" />
            <span>Thinking...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about rice varieties, cooking tips, or nutritional information..."
          className="w-full p-4 pr-12 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg ${
            input.trim() && !isLoading
              ? 'text-green-500 hover:bg-green-50'
              : 'text-gray-400'
          } transition-all`}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
};

export default Chat;
