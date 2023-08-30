import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkDownProps {
  content: string;
}

export const MarkDown = ({ content }: MarkDownProps) => {
  return <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />;
};
