import { NavLink } from "react-router-dom";
import "./Biography.css";

function Biography(): JSX.Element {
  return (
    <div className="Biography">
      <div id="bioContainer">
        <div id="bioInfo">
          <h1>Who Is Adam Sandler?</h1>
          <p>
            Adam Sandler is one of the most recognizable and successful
            comedians in Hollywood today. He has been in the entertainment
            industry for over three decades, and has amassed a legion of fans
            who have enjoyed his comedic talents in films, television shows, and
            stand-up comedy performances.
          </p>
          <h1>Early Life and Career</h1>
          <p>
            Adam Sandler was born on September 9, 1966, in Brooklyn, New York,
            but grew up in Manchester, New Hampshire. He was raised in a Jewish
            family and attended Manchester Central High School, where he was a
            member of the wrestling team.
          </p>
          <p>
            Sandler developed an early interest in comedy, and began performing
            stand-up comedy in clubs and on college campuses in the late 1980s
            and early 1990s. His comedy style was unique, combining absurdist
            humor with observational comedy, and often included musical
            performances.
          </p>
          <h1>Saturday Night Live</h1>
          <p>
            In 1990, Sandler caught the eye of Saturday Night Live producer
            Lorne Michaels, who offered him a job as a writer and performer on
            the show. Sandler joined the cast of Saturday Night Live in 1990,
            where he quickly became a fan favorite for his quirky characters and
            hilarious skits.
          </p>
        </div>
        <div id="imageMovieContainer">
          <div id="bioImage">
            <img
              className="bioImage"
              src="https://hips.hearstapps.com/hmg-prod/images/adam-sandler-gettyimages-481511486.jpg"
            />
            <img
              className="bioImage"
              src="https://www.narcity.com/media-library/adam-sandler-reveals-what-shooting-billy-madison-in-toronto-looked-like-in-the-90s.png?id=27890321&width=600&height=600&coordinates=42%2C0%2C534%2C0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biography;
