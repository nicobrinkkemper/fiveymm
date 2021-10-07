import { isSnap } from "environment";
import { useParams } from "react-router";
import YouTube from "react-youtube";
export const weekTrailers = [
  "b26QvbP4MUI",
  "-f83uRDCZpA",
  "ouKbaTu5YKc",
  "13Sb6V8ydPM",
  "G4mhHeXk3k0",
  "lANqCC2xPoo",
  "rvBtTv9aeo0",
  "oR_7lE_Zx2c"
];

const WeekTrailer = () => {
    const { batchNumber } = useParams<{ batchNumber: string }>();
    const weekTrailer = weekTrailers[Number(batchNumber) - 1];
    if(!weekTrailer) return <p style={{fontSize:'1em',width: '100%'}}>Video coming soon!</p>;
    if (isSnap) {
      return (
        <div className="youtubeFlexDisable">
          <iframe
            frameBorder="0"
            allowFullScreen={true}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${weekTrailer}?modestbranding=1&amp;rel=0&amp;loop=1&amp;listType=playlist&amp;enablejsapi=1&amp;widgetid=1`}
            id="widget2"
          ></iframe>
        </div>
      );
    }
    return (
      <div className="youtubeFlexDisable">
        <YouTube
          containerClassName="youtubeContainer"
          videoId={weekTrailer || "iY6Qj6L_oF0"}
          opts={{
            playerVars: {
              origin: "https://6ymm.warp.world/",
              modestbranding: 1,
              rel: 0,
              loop: 1,
              listType: "playlist",
            },
          }}
        />
      </div>
    );
  };

  export {WeekTrailer}