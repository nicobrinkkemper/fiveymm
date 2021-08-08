import React from "react";
import CountDown, { CountdownRenderProps } from "react-countdown";
import "./Teaser.css";
import YouTube from "react-youtube";
import { startDate } from "levelData";
import { Link } from "react-router-dom";
const trailerYtId = "5hKTIAXIqn4";
const Completionist = () => {
  return (
    <span style={{ display: "flex", margin: "1rem 0", color: "#000" }}>
      <Link to="/" style={{ color: "#000" }}>
        Refresh this page!
      </Link>
    </span>
  );
};

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed
}: CountdownRenderProps) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <>
        <p className="countdown">
          <strong>
            {days}
            {"\u00A0"}days{"\u00A0"}
          </strong>
          <strong>
            {hours}
            {"\u00A0"}hours{"\u00A0"}
          </strong>
          <strong>
            {minutes}
            {"\u00A0"}minutes{"\u00A0"}
          </strong>
          <strong>
            {seconds}
            {"\u00A0"}seconds{"\u00A0"}
          </strong>
        </p>
      </>
    );
  }
};

const Teaser = () => {
  return (
    <div className="Teaser">
      <div className="youtubeWrapper">
        <YouTube containerClassName="youtubeContainer" videoId={trailerYtId} />
      </div>
      <CountDown
        date={startDate.getTime()}
        renderer={renderer}
        daysInHours={true}
      />
      <div className="copy">
        <p>
          The event will start on{" "}
          {startDate.toLocaleString("en-us", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
          .
        </p>
        <p>Stay tuned for more details!</p>
      </div>
    </div>
  );
};

export { Teaser };
export default Teaser;
