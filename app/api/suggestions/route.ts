export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userInput = searchParams.get("userInput");

  const res = await fetch(
    `https://streaming-clone-uddip.azurewebsites.net/api/getaisuggestion?userInput=${userInput}`,
    {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  const message = await res.text();

  return Response.json({ message });
}
