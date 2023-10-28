import "./App.css";
import React, { useEffect, useState } from "react";

import { Button, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

library.add(fas, fab);

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
    <Container className="App my-4">
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
            <Card>
              <Card.Body>Stay tuned!</Card.Body>
            </Card>
          </div>
          <div className="mb-4">
            <h2>Contacts</h2>
            <Card>
              <Card.Body className="d-flex gap-1">
                {info.contacts?.map(function (contact) {
                  return (
                    <Button href={contact.url} size="sm">
                      <FontAwesomeIcon
                        icon={icon({ name: "github", style: "brands" })}
                      />
                      {contact.title}
                    </Button>
                  );
                })}
              </Card.Body>
            </Card>
          </div>
          <div className="mb-4">
            <h2>Experiences</h2>
            <div className="d-flex flex-column gap-2">
              {info.experiences?.map(function (experience) {
                return (
                  <Card className="mb-2">
                    <Card.Body>
                      <Card.Title>{experience.org}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {experience.title}
                      </Card.Subtitle>
                      <span>{experience.description}</span>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <h2>Publications</h2>
            <div className="d-flex flex-column gap-2">
              {info.publications?.map(function (publication) {
                return (
                  <Card>
                    <Card.Body>
                      <Card.Title>{publication.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {publication.author}
                      </Card.Subtitle>
                      <span>{publication.description}</span>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <h2>Education</h2>
            <div className="d-flex flex-column gap-2">
              {info.educations?.map(function (education) {
                return (
                  <Card>
                    <Card.Body>
                      <Card.Title>{education.org}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {education.from} to {education.to}
                      </Card.Subtitle>
                      <span>{education.description}</span>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <h2>Downloadables</h2>
            <Card>
              <Card.Body>
                <div className="d-flex flex-column">
                  {info.downloadables?.map(function (downloadable) {
                    return (
                      <div>
                        <a href={downloadable.url} className="text-left">
                          <FontAwesomeIcon
                            icon={icon({ name: "download" })}
                            className="me-1"
                          />
                          <span>{downloadable.title}</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
