import React from "react";

interface Props {
  title: string;
  response: string;
}

export const ImagePromptCreatorAssistanceResponse: React.FC<Props> = ({
  title,
  response,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{response}</p>
    </div>
  );
};
