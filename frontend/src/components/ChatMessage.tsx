import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "./CodeBlock";
import "./ChatMessage.css";

interface ChatMessageProps {
  isUser: boolean;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isUser, message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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
                    const isInline = !className;

                    if (isInline) {
                      return (
                        <code className="inline-code" {...props}>
                          {children}
                        </code>
                      );
                    }

                    return (
                      <code className="code-block" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }: any) => {
                    // Extract the code content and language from the children
                    const codeElement = React.Children.toArray(
                      children
                    )[0] as any;
                    const codeContent = codeElement?.props?.children || "";
                    const className = codeElement?.props?.className || "";
                    const match = /language-(\w+)/.exec(className);
                    const language = match ? match[1] : "";

                    return (
                      <CodeBlock className="code-block" language={language}>
                        {codeContent}
                      </CodeBlock>
                    );
                  },
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
          <div className="message-actions">
            <button
              className={`copy-button ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy message"}
            >
              {copied ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
