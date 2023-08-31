// // import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
// // import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // best
// import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

// const MarkdownWrapperSyntax = ({ children }: any) => {
//   const codeComponent = ({
//     node,
//     inline,
//     className,
//     children,
//     ...props
//   }: any) => {
//     const match = /language-(\w+)/.exec(className || "");
//     const language = match ? match[1] : null;

//     if (!inline) {
//       return (
//         <SyntaxHighlighter
//           style={
//             xonokai as {
//               [key: string]: React.CSSProperties;
//             }
//           }
//           language={language || "javascript"}
//           PreTag="div"
//           {...props}
//         >
//           {String(children).replace(/\n$/, "")}
//         </SyntaxHighlighter>
//       );
//     } else {
//       return (
//         <code className={className} {...props}>
//           {children}
//         </code>
//       );
//     }
//   };

//   return (
//     <div className="overflow-auto max-w-full rounded-md">
//       <ReactMarkdown
//         components={{
//           p({ node, children }: { children: React.ReactNode; node: any }) {
//             return (
//               <p className="answer-p !text-left ml-1 font-light">{children}</p>
//             );
//           },
//           ol({ node, children }: { children: React.ReactNode; node: any }) {
//             return (
//               <ol className="answer-ol mb-2 gap-4 flex flex-col">{children}</ol>
//             );
//           },
//           li({ node, children }: { children: React.ReactNode; node: any }) {
//             return <li className="answer-li text-left">{children}</li>;
//           },
//           strong({ node, children }: { children: React.ReactNode; node: any }) {
//             return (
//               <strong className="answer-strong text-secondary">
//                 {children}
//               </strong>
//             );
//           },

//           code: codeComponent,
//         }}
//       >
//         {transformStringToMarkdown(children)}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default MarkdownWrapperSyntax;

// const transformStringToMarkdown = (text: string) => {
//   // 1. 부제목 식별, strong 변환
//   const transformed = text.replace(/(\d\.) ([^:]+):/g, "$1 **$2**:");
//   return transformed;
// };
