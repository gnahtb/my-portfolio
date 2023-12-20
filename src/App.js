import "./App.css";
import React, { useEffect, useState } from "react";

import { Button, Card, Container, NavLink, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ScrollSpy from "react-ui-scrollspy";

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
        <div className="col-md-2 mb-4">
          <div className="sticky-md-top">
            <div>
              <p className="col-md-8 col-6">
              <Image src={info.pfp} thumbnail alt="me"></Image>
              </p>
              <h1>{info.name}</h1>
              <p>{info.about}</p>
            </div>
            <div
              id="toc"
              className="flex-column text-secondary d-none d-md-block"
            >
              <NavLink data-to-scrollspy-id="posts" href="#posts">
                Posts
              </NavLink>
              <NavLink data-to-scrollspy-id="cont" href="#cont">
                Contacts
              </NavLink>
              <NavLink data-to-scrollspy-id="exp" href="#exp">
                Experiences
              </NavLink>
              <NavLink data-to-scrollspy-id="pub" href="#pub">
                Publications
              </NavLink>
              <NavLink data-to-scrollspy-id="edu" href="#edu">
                Education
              </NavLink>
              <NavLink data-to-scrollspy-id="dnld" href="#dnld">
                Downloadables
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <ScrollSpy scrollThrottle={10}>
            <div id="posts" className="mb-4">
              <h2>Posts</h2>
              <Card>
                <Card.Body>Stay tuned!</Card.Body>
              </Card>
            </div>
            <div id="cont" className="mb-4">
              <h2>Contacts</h2>
              <Card>
                <Card.Body className="d-flex gap-1">
                  {info.contacts?.map(function (contact, index) {
                    return (
                      <Button href={contact.url} size="sm" key={index}>
                        <FontAwesomeIcon className="me-1" icon={contact.icon} />
                        <span>{contact.title}</span>
                      </Button>
                    );
                  })}
                </Card.Body>
              </Card>
            </div>
            <div id="exp" className="mb-4">
              <h2>Experiences</h2>
              <div className="d-flex flex-column gap-2">
                {info.experiences?.map(function (experience, index) {
                  return (
                    <Card className="mb-2" key={index}>
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
            <div id="pub" className="mb-4">
              <h2>Publications</h2>
              <div className="d-flex flex-column gap-2">
                {info.publications?.map(function (publication, index) {
                  return (
                    <Card key={index}>
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
            <div id="edu" className="mb-4">
              <h2>Education</h2>
              <div className="d-flex flex-column gap-2">
                {info.educations?.map(function (education, index) {
                  return (
                    <Card key={index}>
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
            <div id="dnld" className="mb-4">
              <h2>Downloadables</h2>
              <Card>
                <Card.Body>
                  <div className="d-flex flex-column">
                    {info.downloadables?.map(function (downloadable, index) {
                      return (
                        <div key={index}>
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
          </ScrollSpy>
        </div>
      </div>
    </Container>
  );
}

export default App;
