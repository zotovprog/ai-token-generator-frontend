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

export default function IndexPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [topicName, setTopicName] = useState("");

  const {
    firstAssistantData,
    secondAssistantData,
    finalAssistantData,
    midjourneyProgress,
    midjourneyImageUrl,
    isPending,
  } = useGenerateTokenSSE(topicName);

  const updateTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenInput(e.target.value);
  };

  const onGenerateHandler = () => {
    setTopicName(tokenInput);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optionally show a toast notification
    });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center py-12 gap-6">
        <h1 className="text-4xl">AI Token Generator</h1>
        <div className="flex gap-2 items-center w-full">
          <Input
            label="Type topic, keywords or description"
            value={tokenInput}
            onChange={updateTokenInput}
          />
          <Button
            color="primary"
            disabled={isPending || tokenInput === ""}
            onClick={onGenerateHandler}
          >
            Generate
          </Button>
        </div>
        <section className="flex flex-col gap-5">
          {firstAssistantData && (
            <TokenCreatorAssistanceResponse
              data={firstAssistantData}
              copyToClipboard={copyToClipboard}
            />
          )}

          {secondAssistantData && (
            <ImagePromptCreatorAssistanceResponse
              title="AI Token Logo Prompt Creator Response"
              response={secondAssistantData}
            />
          )}

          {finalAssistantData && (
            <ImagePromptCreatorAssistanceResponse
              title="AI Token Logo Prompt Verificator Response"
              response={finalAssistantData}
            />
          )}

          {midjourneyProgress && (
            <MidjourneyProgress
              progress={midjourneyProgress}
              imageUrl={midjourneyImageUrl}
            />
          )}

          {isPending && <Spinner />}
        </section>
      </section>
    </DefaultLayout>
  );
}
