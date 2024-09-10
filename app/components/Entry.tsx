import { AlbumStats, ArtistStats, Image } from "~/services/lastfm";

export function Entry({ content }: { content: ArtistStats | AlbumStats }) {
  return (
    <div className="entry">
      <div className="label">
        <div>{(content as AlbumStats).artist?.name}</div>
        <div>{content.name}</div>
      </div>
      <img
        crossOrigin="anonymous"
        src={buildLink(content.image)}
        alt={content.name}
      />
    </div>
  );
}

function buildLink(images: Image[]) {
  const link = getImageInTheBestQuality(images);
  return `/proxy?url=${encodeURIComponent(link)}`;
}

function getImageInTheBestQuality(images: Image[]) {
  const links = images.map((img) => img["#text"]).reverse();
  return links[0] ?? links[1] ?? links[2] ?? links[3] ?? "";
}
