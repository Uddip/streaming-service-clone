"use client";
import useSWR from "swr";

const fetcher = (userInput: string) =>
  fetch("/api/suggestions?userInput=" + userInput).then((res) => res.json());

function AISuggestion({ userInput }: { userInput: string }) {
  const { data, error, isLoading, isValidating } = useSWR(
    "suggestions",
    () => fetcher(userInput),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const generateText = () => {
    if (isLoading || isValidating)
      return (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
          <p className="text-sm text-gray-400">AI Assistant is thinking...</p>
        </>
      );

    if (error) return <>Error...</>;
    if (!data) return <>No data</>;
    console.log(`MESSAGE: ${data.message}`);

    return (
      <>
        <div className="animate-pulse rounded-full bg-gradient-to-t from-white h-10 w-10 border-2 flex-shrink-0 border-white" />

        <div>
          <p className="text-sm text-gray-400">
            AI (Azure Functions) Assistant Suggests:{" "}
          </p>
          <p className="italic text-xl">{data.message}</p>
        </div>
      </>
    );
  };

  return (
    <div className="flex space-x-5 items-center px-10">{generateText()}</div>
  );
}

export default AISuggestion;
