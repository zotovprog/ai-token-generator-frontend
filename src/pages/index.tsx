// src/pages/IndexPage.tsx

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";

import DefaultLayout from "@/layouts/default";
import { useGenerateTokenSSE } from "@/hooks/useGenerateTokenSSE";
import { TokenCreatorAssistanceResponse } from "@/components/TokenCreatorAssistanceResponse";
import { ImagePromptCreatorAssistanceResponse } from "@/components/ImagePromptCreatorAssistanceResponse";
import { MidjourneyProgress } from "@/components/MidjourneyProgress";
import toast from "react-hot-toast";

export default function IndexPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [imageStyle, setImageStyle] = useState("");

  const {
    firstAssistantData,
    secondAssistantData,
    midjourneyProgress,
    midjourneyImageUrl,
    isPending,
    fetchData,
  } = useGenerateTokenSSE(tokenInput, imageStyle);

  const updateTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenInput(e.target.value);
  };

  const updateImageStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageStyle(e.target.value);
  };

  const onGenerateHandler = () => {
    fetchData();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center py-12 gap-6">
        <h1 className="text-4xl">AI Token Generator</h1>
        <div className="flex gap-2 items-center w-full">
          <div className="flex w-full flex-col gap-4">
            <Input
              label="Type topic, keywords or description"
              value={tokenInput}
              onChange={updateTokenInput}
            />
            <Input
              label="Describe image style"
              value={imageStyle}
              onChange={updateImageStyle}
            />
          </div>
          <Button
            color="primary"
            disabled={isPending || tokenInput === "" || imageStyle === ""}
            onClick={onGenerateHandler}
          >
            Generate
          </Button>
        </div>
        <section className="flex flex-col gap-5">
          {firstAssistantData && (
            <TokenCreatorAssistanceResponse
              copyToClipboard={copyToClipboard}
              data={firstAssistantData}
            />
          )}

          {secondAssistantData && (
            <ImagePromptCreatorAssistanceResponse
              response={secondAssistantData}
              title="AI Token Logo Prompt Creator Response"
            />
          )}

          {midjourneyProgress && (
            <MidjourneyProgress
              imageUrl={midjourneyImageUrl}
              progress={midjourneyProgress}
            />
          )}

          {isPending && <Spinner />}
        </section>
      </section>
    </DefaultLayout>
  );
}
