import DefaultLayout from "@/layouts/default";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import toast from "react-hot-toast";
import useGenerateTokenMutation from "@/hooks/useGenerateTokenMutation";

export default function IndexPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [tokenData, setTokenData] = useState<any>(null);
  const { mutate: generateToken, isPending } = useGenerateTokenMutation();

  const updateTokenInput = (e: any) => {
    setTokenInput(e.target.value);
  };

  const onGenerateHandler = () => {
    toast.loading("Generating token...");
    generateToken(tokenInput, {
      onSuccess: (data: any) => {
        toast.success("Successfull generate!");
        setTokenData(data);
      },
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center h-full gap-6">
        <h1 className="text-4xl">AI Token Generator</h1>
        <div className="flex gap-2 items-center w-full">
          <Input
            label="Type token topic"
            value={tokenInput}
            onChange={updateTokenInput}
          />
          <Button
            color="primary"
            onClick={onGenerateHandler}
            disabled={isPending || tokenInput === ""}
          >
            Generate
          </Button>
        </div>
        {isPending && <Spinner />}
        {tokenData && !isPending && (
          <div className="token-data-container flex flex-col gap-4 mt-4">
            <div
              className="token-data-item p-4 border rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={() => copyToClipboard(tokenData.name)}
              title="Click to copy"
            >
              <h3 className="text-lg font-semibold">Token Name</h3>
              <p>{tokenData.name}</p>
            </div>
            <div
              className="token-data-item p-4 border rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={() => copyToClipboard(tokenData.description)}
              title="Click to copy"
            >
              <h3 className="text-lg font-semibold">Description</h3>
              <p>{tokenData.description}</p>
            </div>
            <div
              className="token-data-item p-4 border rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={() => copyToClipboard(tokenData.tokenSymbol)}
              title="Click to copy"
            >
              <h3 className="text-lg font-semibold">Token Symbol</h3>
              <p>{tokenData.tokenSymbol}</p>
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
