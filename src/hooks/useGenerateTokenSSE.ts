import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface AssistantData {
  name: string;
  description: string;
  tokenSymbol: string;
}

interface MidjourneyProgressData {
  uri: string;
  progress: string;
}

export function useGenerateTokenSSE(topicName: string) {
  const [firstAssistantData, setFirstAssistantData] =
    useState<AssistantData | null>(null);
  const [secondAssistantData, setSecondAssistantData] = useState<string | null>(
    null
  );
  const [finalAssistantData, setFinalAssistantData] = useState<string | null>(
    null
  );
  const [midjourneyProgress, setMidjourneyProgress] = useState<string>("");
  const [midjourneyImageUrl, setMidjourneyImageUrl] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (!topicName) return;

    const fetchData = async () => {
      try {
        toast.loading("Generating token...");
        setIsPending(true);
        setFirstAssistantData(null);
        setSecondAssistantData(null);
        setFinalAssistantData(null);
        setMidjourneyProgress("");
        setMidjourneyImageUrl("");

        const response = await fetch("http://localhost:3000/generateToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topicName }),
        });

        if (!response.ok || !response.body) {
          const errorText = await response.text();
          throw new Error(errorText || "Network response was not ok.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let receivedText = "";
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            receivedText += decoder.decode(value, { stream: !done });
            let lines = receivedText.split("\n\n");
            receivedText = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const dataLine = line.substring(6);
                const parsedData = JSON.parse(dataLine);

                if (parsedData.firstAssistantResponse) {
                  setFirstAssistantData(parsedData.firstAssistantResponse);
                } else if (parsedData.imagePromptCreatorResponse) {
                  setSecondAssistantData(parsedData.imagePromptCreatorResponse);
                } else if (parsedData.finalAssistantResponse) {
                  setFinalAssistantData(parsedData.finalAssistantResponse);
                } else if (parsedData.midjourneyProgress) {
                  const { uri, progress } = parsedData.midjourneyProgress;
                  setMidjourneyProgress(progress);
                  if (uri) {
                    setMidjourneyImageUrl(uri);
                  }
                } else if (parsedData.midjourneyResult) {
                  const { uri } = parsedData.midjourneyResult;
                  setMidjourneyImageUrl(uri);
                  setMidjourneyProgress("Done");
                }
              } else if (line.startsWith("event: end")) {
                toast.dismiss();
                toast.success("All data received");
                setIsPending(false);
              } else if (line.startsWith("event: error")) {
                const dataLine = line
                  .split("\n")
                  .find((l) => l.startsWith("data: "));
                if (dataLine) {
                  const errorData = JSON.parse(dataLine.substring(6));
                  toast.dismiss();
                  toast.error(errorData.error);
                }
                setIsPending(false);
              }
            }
          }
        }
      } catch (error: any) {
        console.error(error);
        toast.dismiss();
        toast.error("An error occurred");
        setIsPending(false);
      }
    };

    fetchData();
  }, [topicName]);

  return {
    firstAssistantData,
    secondAssistantData,
    finalAssistantData,
    midjourneyProgress,
    midjourneyImageUrl,
    isPending,
  };
}
