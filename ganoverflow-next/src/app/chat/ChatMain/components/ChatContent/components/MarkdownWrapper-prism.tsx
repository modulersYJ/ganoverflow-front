// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import { Highlight } from "prism-react-renderer";

// const MarkdownWrapperPrism = ({ children }: any) => {
//   const codeComponent = ({ inline, className, children, ...props }: any) => {
//     const match = /language-(\w+)/.exec(className || "");
//     const language = match ? match[1] : null;

//     if (!inline) {
//       return (
//         <Highlight
//           code={String(children).replace(/\n$/, "")}
//           language={language || "javascript"}
//         >
//           {({ className, style, tokens, getLineProps, getTokenProps }) => (
//             <pre className={className} style={style}>
//               {tokens.map((line, i) => (
//                 <div {...getLineProps({ line, key: i })}>
//                   {line.map((token, key) => (
//                     <span {...getTokenProps({ token, key })} />
//                   ))}
//                 </div>
//               ))}
//             </pre>
//           )}
//         </Highlight>
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
//           p: ({ node, children }) => (
//             <p className="answer-p !text-left ml-1 font-light">{children}</p>
//           ),
//           ol: ({ node, children }) => (
//             <ol className="answer-ol mb-2 gap-4 flex flex-col">{children}</ol>
//           ),
//           li: ({ node, children }) => (
//             <li className="answer-li text-left">{children}</li>
//           ),
//           strong: ({ node, children }) => (
//             <strong className="answer-strong text-secondary">{children}</strong>
//           ),
//           code: codeComponent,
//         }}
//       >
//         {transformStringToMarkdown(children)}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default MarkdownWrapperPrism;

// const transformStringToMarkdown = (text: string) => {
//   const transformed = text.replace(/(\d\.) ([^:]+):/g, "$1 **$2**:");
//   return transformed;
// };
