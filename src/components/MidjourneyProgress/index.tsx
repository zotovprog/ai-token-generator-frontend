import React from "react";

interface Props {
  progress: string;
  imageUrl: string;
}

export const MidjourneyProgress: React.FC<Props> = ({ progress, imageUrl }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">
        Midjourney Generation Progress: {progress}
      </h2>
      {imageUrl && <img src={imageUrl} alt="Midjourney" />}
    </div>
  );
};
