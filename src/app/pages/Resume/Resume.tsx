"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, User, Bot } from "lucide-react";
import { consumeEventStream } from "rwsdk/client";
import PrimaryLayout from "@/app/layouts/primary-layout";
import { sendMessage } from "./functions";
import { RequestInfo } from "rwsdk/worker";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isStreaming?: boolean;
}

const suggestedQuestions = [
  "What programming languages do you know?",
  "Tell me about your work experience",
  "What are your key skills?",
  "What projects have you worked on?",
  "What's your educational background?",
  "What technologies do you specialize in?",
];

export const Resume = ({ ctx }: RequestInfo) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you learn about David's background and experience. Feel free to ask me anything about his resume!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Create initial bot message for streaming
    const botMessageId = (Date.now() + 1).toString();
    const initialBotMessage: Message = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, initialBotMessage]);
    setStreamingMessageId(botMessageId);

    try {
      const stream = await sendMessage(text.trim());

      stream.pipeTo(
        consumeEventStream({
          onChunk: (event) => {
            if (event.data === "[DONE]") {
              setIsLoading(false);
              setStreamingMessageId(null);
              // Mark message as no longer streaming
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMessageId ? { ...msg, isStreaming: false } : msg
                )
              );
              return;
            }

            try {
              const parsedData = JSON.parse(event.data);
              const responseText = parsedData.response || "";

              // Update the streaming message
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMessageId
                    ? { ...msg, text: msg.text + responseText }
                    : msg
                )
              );
            } catch (error) {
              console.error("Error parsing stream data:", error);
            }
          },
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
      setStreamingMessageId(null);

      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <PrimaryLayout slug={ctx.slug} hits={ctx.hits}> 
      <h1 className="text-2xl text-center">Resume</h1>
      <div className="mt-5 max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-pink-500" />
            <h4 className="font-mono text-sm font-medium text-gray-800 dark:text-gray-200">
              Resume Assistant
            </h4>
            <div className="ml-auto flex items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  isLoading ? "bg-yellow-400" : "bg-green-400"
                }`}
              ></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isLoading ? "Thinking..." : "Online"}
              </span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg font-mono text-sm ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">
                  {message.text}
                  {message.isStreaming && (
                    <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse">
                      |
                    </span>
                  )}
                </p>
                <div
                  className={`text-xs mt-1 opacity-70 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
          <p className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-2">
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                disabled={isLoading}
                className="px-3 py-1 text-xs font-mono bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about David's experience..."
              className="flex-1 px-3 py-2 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </PrimaryLayout>
  );
}
