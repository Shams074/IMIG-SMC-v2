import { XMLParser } from "fast-xml-parser";

const CHANNEL_ID = "UC2NQoAa8oSYeHlWpeJDcSwA";

export interface YoutubeVideo {
  id: string;
  title: string;
  url: string;
  published: string;
  thumbnail: string;
}

export async function getLatestYoutubeVideos(): Promise<YoutubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/@imig-smc/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 86400 } } // refetch once every 24 hours
    );

    if (!res.ok) throw new Error(`YouTube feed fetch failed: ${res.status}`);

    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const data = parser.parse(xml);

    const entries = data?.feed?.entry;
    if (!entries) return [];

    const entryArray = Array.isArray(entries) ? entries : [entries];

    return entryArray.map((entry: any) => ({
      id: entry["yt:videoId"],
      title: entry.title,
      url: entry.link["@_href"],
      published: entry.published,
      thumbnail: entry["media:group"]["media:thumbnail"]["@_url"],
    }));
  } catch (err) {
    console.error("Error fetching YouTube feed:", err);
    return [];
  }
}