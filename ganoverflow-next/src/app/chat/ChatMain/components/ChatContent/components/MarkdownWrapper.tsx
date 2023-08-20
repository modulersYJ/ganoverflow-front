import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownWrapper = ({ children }: any) => {
  const codeComponent = ({
    node,
    inline,
    className,
    children,
    ...props
  }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : null;

    if (!inline) {
      return (
        <SyntaxHighlighter
          style={
            gruvboxDark as {
              [key: string]: React.CSSProperties;
            }
          }
          language={language || "javascript"}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    } else {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="overflow-auto max-w-full rounded-md">
      <ReactMarkdown
        components={{
          p({ node, children }: { children: React.ReactNode; node: any }) {
            return <p className="answer-p !text-left ml-1">{children}</p>;
          },
          ol({ node, children }: { children: React.ReactNode; node: any }) {
            return (
              <ol className="answer-ol font-bold mb-2 ml-1">{children}</ol>
            );
          },
          li({ node, children }: { children: React.ReactNode; node: any }) {
            return <li className="answer-li text-left">{children}</li>;
          },
          code: codeComponent,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownWrapper;
