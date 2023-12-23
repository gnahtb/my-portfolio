import "./App.css";
import React, { useEffect, useState } from "react";

import { Button, Card, Container, Nav, NavLink, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ScrollSpy from "react-ui-scrollspy";

library.add(fas, fab);

function App() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    fetch("/assets/info.json")
      .then((res) => res.json())
      .then((json) => setInfo(json));
  }, []);
  return (
    <Container fluid="xxl" className="App my-4">
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
            <div className="mb-4">
              <h4>Contacts</h4>
              <div className="dropdown-divider"></div>
              <div className="d-flex flex-wrap">
                {info.contacts?.map(function (contact, index) {
                  return (
                    <Button
                      href={contact.url}
                      size="sm"
                      key={index}
                      className="me-1 mb-1"
                    >
                      <FontAwesomeIcon className="me-1" icon={contact.icon} />
                      <span>{contact.title}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <ScrollSpy scrollThrottle={10}>
            <Card id="posts" className="mb-4">
              <Card.Body>
                <Card.Title>Posts</Card.Title>
                <div>Stay tuned!</div>
              </Card.Body>
            </Card>
            <Card id="exp" className="mb-4">
              <Card.Body>
                <Card.Title>Experiences</Card.Title>
                <div className="d-flex flex-column gap-2">
                  {info.experiences?.map(function (experience, index) {
                    return (
                      <div className="sep-list" key={index}>
                        <div className="mb-1">
                          <div className="fw-semibold">{experience.title}</div>
                          <div>{experience.org}</div>
                          <div className="text-muted">
                            {experience.from} - {experience.to}
                          </div>
                          <div className="text-muted">
                            {experience.location}
                          </div>
                        </div>
                        <div>{experience.description}</div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
            <Card id="pub" className="mb-4">
              <Card.Body>
                <Card.Title>Publications</Card.Title>
                <div className="d-flex flex-column gap-2">
                  {info.publications?.map(function (publication, index) {
                    return (
                      <div className="sep-list" key={index}>
                        <div className="mb-1">
                          <div className="fw-semibold">{publication.title}</div>
                          <div className="text-muted">{publication.author}</div>
                        </div>
                        <div>{publication.description}</div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
            <Card id="edu" className="mb-4">
              <Card.Body>
                <Card.Title>Education</Card.Title>
                <div className="d-flex flex-column gap-2">
                  {info.educations?.map(function (education, index) {
                    return (
                      <div className="sep-list" key={index}>
                        <div className="mb-1">
                          <div className="fw-semibold">{education.org}</div>
                          <div>{education.degree}</div>
                          <div className="text-muted">
                            {education.from} - {education.to}
                          </div>
                        </div>
                        <div>{education.description}</div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
            <Card id="dnld" className="mb-4">
              <Card.Body>
                <Card.Title>Downloadables</Card.Title>
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
          </ScrollSpy>
        </div>
        <div className="col-md-2 d-md-block d-none">
          <div className="sticky-md-top">
            <Nav
              id="toc"
              className="flex-column text-secondary d-none d-md-block"
            >
              <NavLink data-to-scrollspy-id="posts" href="#posts">
                Posts
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
            </Nav>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
