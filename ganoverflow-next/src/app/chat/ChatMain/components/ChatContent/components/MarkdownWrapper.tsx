import React from "react";
import hljs from "highlight.js";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import "highlight.js/styles/an-old-hope.css";
// import "highlight.js/styles/vs2015.css";
import "highlight.js/styles/androidstudio.css";
import "./md-wrapper.css";
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
        <div className="overflow-auto max-w-full rounded-md">
          <pre {...props}>
            <code
              className={`${className} overflow-x-auto`}
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(String(children), {
                  // 문자열로 안전하게 변환
                  language: language || "plaintext",
                }).value,
              }}
            />
          </pre>
        </div>
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
            return (
              <p className="answer-p !text-left ml-1 font-light !leading-5">
                {children}
              </p>
            );
          },
          ol({ node, children }: { children: React.ReactNode; node: any }) {
            return (
              <ol className="answer-ol mb-2 gap-4 flex flex-col">{children}</ol>
            );
          },
          li({ node, children }: { children: React.ReactNode; node: any }) {
            return <li className="answer-li text-left">{children}</li>;
          },
          strong({ node, children }: { children: React.ReactNode; node: any }) {
            return (
              <strong className="answer-strong text-secondary">
                {children}
              </strong>
            );
          },
          code: codeComponent,
        }}
      >
        {transformStringToMarkdown(children)}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownWrapper;

const transformStringToMarkdown = (text: string) => {
  const transformed = text.replace(/(\d\.) ([^:]+):/g, "$1 **$2**:");
  return transformed;
};
