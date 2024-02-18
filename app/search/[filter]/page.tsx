import AISuggestion from "@/components/AISuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    filter: string;
  };
};

async function SearchPage({ params: { filter } }: Props) {
  if (!filter) notFound();

  const decodedFilter = decodeURI(filter);

  const movies = await getSearchedMovies(decodedFilter);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">
          Results for {decodedFilter}
        </h1>

        {/* AI Suggestion */}
        <AISuggestion userInput={decodedFilter} />

        <MoviesCarousel title="Movies" movies={movies} isVertical={true} />
        <MoviesCarousel
          title="You may also like"
          movies={popularMovies}
          isVertical={false}
        />
      </div>
    </div>
  );
}

export default SearchPage;
