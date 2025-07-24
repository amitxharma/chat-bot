import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "./ChatMessage.css";

interface ChatMessageProps {
  isUser: boolean;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isUser, message }) => {
  return (
    <div
      className={`message-wrapper ${
        isUser ? "user-message" : "assistant-message"
      }`}
    >
      <div className="message-container">
        <div className="message-avatar">
          {isUser ? (
            <div className="user-avatar">U</div>
          ) : (
            <div className="assistant-avatar">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          )}
        </div>
        <div className="message-content">
          <div className="message-text">
            {isUser ? (
              message
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: ({ className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return (
                      <code
                        className={match ? "code-block" : "inline-code"}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }: any) => (
                    <pre className="code-block">{children}</pre>
                  ),
                  p: ({ children }) => (
                    <p className="markdown-paragraph">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="markdown-h1">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="markdown-h2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="markdown-h3">{children}</h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="markdown-list">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="markdown-ordered-list">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="markdown-list-item">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="markdown-blockquote">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="markdown-bold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="markdown-italic">{children}</em>
                  ),
                }}
              >
                {message}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
