import { AlbumStats, ArtistStats, StatsParams } from "~/services/lastfm";
import download from "../helpers/download";
import { Entry } from "./Entry";
import { useState } from "react";

export function StatsGrid({
  list,
  size,
}: {
  list?: Array<ArtistStats | AlbumStats>;
  size?: StatsParams["limit"];
}) {
  const [wait, setWaiting] = useState(false);

  if (!list) return <div>Nothing to show</div>;
  const nColumns = Math.sqrt(Number(size));

  const setAsDownloading = () => {
    setWaiting(true);
    setTimeout(() => setWaiting(false), 5000);
  };

  return (
    <>
      <div className="center">
        <button
          style={{ margin: "10px" }}
          disabled={wait}
          onClick={() => {
            setAsDownloading();
            download({ elementId: "result-grid", filename: "stats" });
          }}
        >
          {wait ? "Wait for Download" : "Download Image"}
        </button>
      </div>
      <div className="scrollable-area">
        <div
          id="result-grid"
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${nColumns}, 1fr)`,
            width: `${nColumns * 300}px`,
            height: `${nColumns * 300}px`,
          }}
        >
          {list.map((element, n) => (
            <Entry key={n} content={element} />
          ))}
        </div>
      </div>
    </>
  );
}
