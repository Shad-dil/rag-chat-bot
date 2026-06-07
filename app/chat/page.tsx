"use client";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";
import { Loader } from "lucide-react";
import React, { Fragment, useState } from "react";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const handleSubmit = (message: PromptInputMessage) => {
    if (!message) return;
    sendMessage({ text: message.text });
    setInput("");
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden flex flex-col">
        <Conversation className="flex-1">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts.map((part, index) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Fragment key={`${message.id}-${index}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <MessageResponse>{part.text}</MessageResponse>
                            </MessageContent>
                          </Message>
                        </Fragment>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {(status === "submitted" || status === "streaming") && (
              <Loader className="h-4 w-4 animate-spin" />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
      <div className="shrink-0 border-t bg-background">
        <div className="max-w-4xl mx-auto p-4">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="mt-0"
              />
            </PromptInputBody>
            <PromptInputTools>
              <PromptInputSubmit />
            </PromptInputTools>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
