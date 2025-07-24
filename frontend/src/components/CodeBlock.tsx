import React, { useState } from "react";
import "./CodeBlock.css";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  language,
}) => {
  const [codeCopied, setCodeCopied] = useState(false);

  // Utility function to extract text content from React nodes
  const extractTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") {
      return node;
    }
    if (typeof node === "number") {
      return String(node);
    }
    if (React.isValidElement(node)) {
      return extractTextContent(node.props.children);
    }
    if (Array.isArray(node)) {
      return node.map(extractTextContent).join("");
    }
    return "";
  };

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const textContent = extractTextContent(children);
      console.log("Copying code:", textContent); // Debug log

      if (!textContent.trim()) {
        console.warn("No text content found to copy");
        return;
      }

      await navigator.clipboard.writeText(textContent.trim());
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
      // Fallback for older browsers or when clipboard API fails
      try {
        const textArea = document.createElement("textarea");
        textArea.value = extractTextContent(children).trim();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy also failed: ", fallbackErr);
      }
    }
  };

  const isCodeBlock = className?.includes("code-block") || !!language;

  return (
    <div className="code-block-wrapper">
      {isCodeBlock && (
        <div className="code-block-header">
          <span className="code-language">{language || "code"}</span>
          <button
            className={`code-copy-button ${codeCopied ? "copied" : ""}`}
            onClick={handleCopyCode}
            title={codeCopied ? "Copied!" : "Copy code"}
          >
            {codeCopied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            )}
          </button>
        </div>
      )}
      <pre className={className}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
