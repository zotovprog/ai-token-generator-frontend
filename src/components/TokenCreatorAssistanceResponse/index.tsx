import React from "react";

interface Props {
  data: {
    name: string;
    description: string;
    tokenSymbol: string;
  };
  copyToClipboard: (text: string) => void;
}

export const TokenCreatorAssistanceResponse: React.FC<Props> = ({
  data,
  copyToClipboard,
}) => {
  return (
    <div>
      <h2>First Assistant Response</h2>
      <div className="token-data-container flex flex-col gap-4 mt-4">
        <button
          className="token-data-item p-4 border rounded-md hover:bg-gray-600 text-left"
          title="Click to copy"
          onClick={() => copyToClipboard(data.name)}
        >
          <h3 className="text-lg font-semibold">Token Name</h3>
          <p>{data.name}</p>
        </button>
        <button
          className="token-data-item p-4 border rounded-md hover:bg-gray-600 text-left"
          title="Click to copy"
          onClick={() => copyToClipboard(data.description)}
        >
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{data.description}</p>
        </button>
        <button
          className="token-data-item p-4 border rounded-md hover:bg-gray-600 text-left"
          title="Click to copy"
          onClick={() => copyToClipboard(data.tokenSymbol)}
        >
          <h3 className="text-lg font-semibold">Token Symbol</h3>
          <p>{data.tokenSymbol}</p>
        </button>
      </div>
    </div>
  );
};
