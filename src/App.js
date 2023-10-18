import "./App.css";
import { useEffect, useState } from "react";

function detectColorMode() {
  const htmlElement = document.querySelector("html");
  if (htmlElement.getAttribute("data-bs-theme") === "auto") {
    function updateTheme() {
      document
        .querySelector("html")
        .setAttribute(
          "data-bs-theme",
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);
    updateTheme();
  }
}

function App() {
  detectColorMode();
  const [info, setInfo] = useState({});
  useEffect(() => {
    fetch("/assets/info.json")
      .then((res) => res.json())
      .then((json) => setInfo(json));
  }, []);
  return (
    <div className="App container my-4">
      <div className="row flex-column flex-md-row justify-content-center">
        <div className="col-md-3 mb-4">
          <div>
            <img
              className="img-fluid img-thumbnail"
              src="assets/me.png"
              alt="me"
            ></img>
            <h1>{info.name}</h1>
            <p>{info.about}</p>
          </div>
          <div>
            <nav id="toc" data-toggle="toc"></nav>
          </div>
        </div>
        <div className="col-md-6" data-bs-target="#toc">
          <div className="mb-4">
            <h2>Posts</h2>
            <div className="card">
              <div className="card-body">Stay tuned!</div>
            </div>
          </div>
          <div className="mb-4">
            <h2>Contacts</h2>
            <div className="card">
              <div className="card-body">
                {info.contacts?.map(function (contact) {
                  return (
                    <a
                      className="btn btn-sm btn-primary me-1"
                      href={contact.url}
                      role="button"
                    >
                      {contact.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h2>Experiences</h2>
            {info.experiences?.map(function (experience) {
              return (
                <div className="card mb-2">
                  <div className="card-body">
                    <p className="h6">{experience.org}</p>
                    <p className="small text-body-secondary">
                      {experience.title}
                    </p>
                    <span>{experience.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mb-4">
            <h2>Publications</h2>
            {info.publications?.map(function (publication) {
              return (
                <div className="card mb-2">
                  <div className="card-body">
                    <p className="h6">{publication.title}</p>
                    <p className="small text-body-secondary">
                      {publication.author}
                    </p>
                    <span>{publication.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mb-4">
            <h2>Education</h2>
            {info.educations?.map(function (education) {
              return (
                <div className="card mb-2">
                  <div className="card-body">
                    <p className="h6">{education.org}</p>
                    <p className="small text-body-secondary">
                      {education.from} to {education.to}
                    </p>
                    <span>{education.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mb-4">
            <h2>Downloadables</h2>
            <div className="card">
              <div className="card-body">
                {info.downloadables?.map(function (downloadable) {
                  return (
                    <a
                      className="btn btn-primary me-1"
                      href={downloadable.url}
                      role="button"
                    >
                      {downloadable.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
