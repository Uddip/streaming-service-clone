import MoviesCarousel from "@/components/MoviesCarousel";
import OpenAIAzureSuggestion from "@/components/OpenAIAzureSuggestion";
import { getDiscoverMovies } from "@/lib/getMovies";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  const movies = await getDiscoverMovies(id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 xl:mt-24">
        <h1 className="text-6xl font-bold px-10">Results for {genre}</h1>
        {/* Azure OPENAI service suggestion */}
        <OpenAIAzureSuggestion userInput={genre} />

        <MoviesCarousel title="Genre" movies={movies} isVertical={true} />
      </div>
    </div>
  );
}

export default GenrePage;
