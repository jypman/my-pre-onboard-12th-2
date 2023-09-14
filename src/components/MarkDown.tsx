import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkDownProps {
  content: string;
}

export const MarkDown = ({ content }: MarkDownProps) => {
  return <ReactMarkdown children={content} />;
};
