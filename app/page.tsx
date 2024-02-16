import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getUpcomingMovies,
  getTopRatedMovies,
  getPopularMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main className="">
      {/* Carousel Banner */}
      <CarouselBannerWrapper id="" keywords="" />

      <div className="flex flex-col space-y-2 xl:-mt-48">
        {/* Movies Carousel List */}
        <MoviesCarousel
          movies={upcomingMovies}
          title="Upcoming"
          isVertical={false}
        />
        <MoviesCarousel
          movies={topRatedMovies}
          title="Top Rated"
          isVertical={false}
        />
        <MoviesCarousel
          movies={popularMovies}
          title="Popular"
          isVertical={false}
        />
      </div>
    </main>
  );
}
