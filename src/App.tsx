import "./App.css";
import React from "react";
import About from "About";
import Teaser from "Teaser";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams
} from "react-router-dom";
import { Logo } from "Logo";
import { Button } from "Button";
import { importMDX } from "mdx.macro";
import { releaseDays, startDate } from "useLevelData";
import YouTube from "react-youtube";
import { Credits } from "Credits";
import { Level } from "Level";
import Batches from "Batches";
import Batch from "Batch";
import { weekTrailers } from "weekTrailers";
import { Seo } from "Seo";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "./constants";
import NotFound from "NotFound";
import formatDate from "formatBatchName";

const Welcome = importMDX.sync("./data/Welcome.mdx");

const BackButton = () => {
  const { batchNumber, order } =
    useParams<{ batchNumber: string; order: string }>();
  if (releaseDays[0].getTime() > Date.now())
    return (
      <Button
        icon="arrow-left-inverted"
        iconPosition="left"
        to={`/`}
        inverted={true}
      >
        Back to Teaser
      </Button>
    );

  if (typeof batchNumber === "string" && typeof order === "string")
    return (
      <Button
        icon="arrow-left-inverted"
        iconPosition="left"
        to={`/levels/${batchNumber}`}
        inverted={true}
      >
        Back to{" "}
        {formatDate(releaseDays[Number(batchNumber) - 1])}
      </Button>
    );
  else if (typeof batchNumber === "string")
    return (
      <Button
        icon="arrow-left-inverted"
        iconPosition="left"
        to="/levels"
        inverted={true}
      >
        Back to Weeks
      </Button>
    );
  return (
    <Button
      icon="arrow-left-inverted"
      iconPosition="left"
      to="/"
      inverted={true}
    >
      Back to Welcome
    </Button>
  );
};

const WeekTrailer = () => {
  const { batchNumber } = useParams<{ batchNumber: string }>();
  const weekTrailer = weekTrailers[Number(batchNumber) - 1];
  return (
    <div className="youtubeFlexDisable">
        <YouTube
          containerClassName="youtubeContainer"
          videoId={weekTrailer || "iY6Qj6L_oF0"}
          opts={{
            playerVars: {
              modestbranding: 1,
              rel: 0,
              loop: 1,
              listType: "playlist"
            }
          }}
        />
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const showAbout = location.hash === "#!/about";
  const creditRoute = (
    <Route path="/credits">
      <header className="App-header">
        <div className="toolbar big">
          <Logo logo="logo_without_card" />
          <Button inverted={true} icon={"info-inverted"} to="#!/about">
            About
          </Button>
        </div>
        <BackButton />
      </header>
      <article className="App-body">
        <Credits />
      </article>
    </Route>
  );
  const routes =
    startDate.getTime() >= Date.now() ? (
      <Switch>
        {creditRoute}
        <Route path="/">
          <header className="App-header">
            <div className="toolbar small">
              <Logo small logo="logo_without_card" />
              <Button inverted={true} icon={"info-inverted"} to="#!/about">
                About
              </Button>
            </div>
          </header>
          <article className="App-body">
            <Teaser />
          </article>
          <Seo
            description={`${DEFAULT_DESCRIPTION}. We will start ${startDate.toDateString()}`}
            title={`${DEFAULT_TITLE} | We are getting ready`}
          />
        </Route>
      </Switch>
    ) : (
      <Switch>
        <Route path="/level/:batchNumber/:order" exact={true}>
          <header className="App-header">
            <div className="toolbar small">
              <Logo small logo="logo_without_card" />
              <Button inverted={true} icon={"info-inverted"} to="#!/about">
                About
              </Button>
            </div>
            <BackButton />
          </header>
          <article className="App-body">
            <Level />
          </article>
        </Route>
        <Route path="/levels/:batchNumber" exact={true}>
          <header className="App-header">
            <div className="toolbar small">
              <Logo small logo="logo_without_card" />
              <Button inverted={true} icon={"info-inverted"} to="#!/about">
                About
              </Button>
            </div>
            <WeekTrailer />
            <BackButton />
          </header>
          <article className="App-body">
            <Batch />
          </article>
        </Route>
        <Route path="/levels" exact={true}>
          <header className="App-header">
            <div className="toolbar big">
              <Logo logo="logo_without_card" />
              <Button inverted={true} icon={"info-inverted"} to="#!/about">
                About
              </Button>
            </div>
            <BackButton />
          </header>
          <article className="App-body">
            <Batches />
          </article>
        </Route>
        {creditRoute}
        <Route path="/" exact={true}>
          <header className="App-header">
            <div className="toolbar big">
              <Logo />
              <Button inverted={true} icon={"info-inverted"} to="#!/about">
                About
              </Button>
            </div>
          </header>
          <article className="App-body">
            <Welcome />
            <Seo title={`${DEFAULT_TITLE} | ${DEFAULT_DESCRIPTION}`} />
          </article>
        </Route>
        <Route path="*">
          <header className="App-header">
            <div className="toolbar big">
              <Logo />
            </div>
          </header>
          <article className="App-body">
            <NotFound />
          </article>
        </Route>
      </Switch>
    );
  return (
      <div
        className="App"
        style={showAbout ? { overflowY: "hidden", maxHeight: "100vh" } : {}}
      >
        <div className="ie-fixMinHeight">
          {routes}
          <About />
          <footer className="App-footer">
            <a
              href="https://discord.gg/yqdgu2Z"
              rel="noopener noreferrer"
              target="_BLANK"
            >
              Discord
            </a>
            <a
              href="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
              rel="noopener noreferrer"
              target="_BLANK"
            >
              Youtube
            </a>
            <Link to="/credits">Credits</Link>
          </footer>
        </div>
      </div>
  );
};

export default App;

export { App };
