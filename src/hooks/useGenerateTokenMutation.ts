import { useMutation } from "@tanstack/react-query";

const useGenerateTokenMutation = () => {
  const mutationFn = async (value: string) => {
    const res = await fetch("http://localhost:3000/generateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topicName: value }),
    });

    return await res.json();
  };

  const mutation = useMutation({
    mutationFn,
  });

  return useMutation({
    mutationFn,
  });
};

export default useGenerateTokenMutation;
