import { getLatestYoutubeVideos } from "@/lib/youtube";

export default async function LatestVideos() {
  const videos = await getLatestYoutubeVideos();

  if (videos.length === 0) return null;

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Latest Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.slice(0, 6).map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-3">
              <p className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
                {video.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(video.published).toLocaleDateString()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}