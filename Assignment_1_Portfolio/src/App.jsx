import "./App.css";

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home">
        AM<span>.</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="header-link" href="mailto:hello@example.com">
        Let's talk <span>↗</span>
      </a>
    </header>
  );
}

function About() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">PORTFOLIO · 2026</p>
        <h1>
          Curious mind.
          <br />
          <em>Thoughtful work.</em>
        </h1>
        <p className="intro">
          Hi, I'm Aritra, a student exploring the space between useful
          technology and considered design.
        </p>
        <a className="text-link" href="#about">
          A little about me <span>↓</span>
        </a>
      </div>
      <div className="portrait-wrap">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"
          alt="Portrait of a student"
        />
        <span className="portrait-caption">KOLKATA, INDIA · 22°34'N</span>
        <span className="portrait-index">01 / 04</span>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section section-grid" id="about">
      <p className="section-label">01 / ABOUT</p>
      <div>
        <h2>
          Learning by making,
          <br />
          one question at a time.
        </h2>
        <p>
          I enjoy turning complex ideas into clear, human experiences. Right now
          I'm building a strong foundation in web development, collaborating on
          small projects, and staying curious about what comes next.
        </p>
        <p>
          Outside the browser, you'll find me sketching interfaces, reading, or
          finding a new place for chai.
        </p>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education-section section-grid" id="education">
      <p className="section-label">02 / EDUCATION</p>
      <div>
        <h2>Where I'm learning</h2>
        <div className="education-row">
          <span>2023 — 2027</span>
          <div>
            <h3>Bachelor of Technology</h3>
            <p>Computer Science & Engineering · University of Calcutta</p>
          </div>
          <span className="row-arrow">↗</span>
        </div>
        <div className="education-row">
          <span>2021 — 2023</span>
          <div>
            <h3>Higher Secondary</h3>
            <p>Science · West Bengal Council of Higher Secondary Education</p>
          </div>
          <span className="row-arrow">↗</span>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    "React",
    "JavaScript",
    "HTML & CSS",
    "Git",
    "Figma",
    "Problem solving",
  ];
  return (
    <section className="skills-section section-grid" id="skills">
      <p className="section-label">03 / SKILLS</p>
      <div>
        <h2>Tools I reach for</h2>
        <ul className="skill-list">
          {skills.map((skill, index) => (
            <li key={skill}>
              <span>0{index + 1}</span>
              {skill}
              <span>↗</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section section-grid" id="contact">
      <p className="section-label">04 / CONTACT</p>
      <div>
        <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
        <h2>
          Let's make something
          <br />
          <em>worthwhile.</em>
        </h2>
        <a className="contact-button" href="mailto:hello@example.com">
          hello@example.com <span>↗</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Aritra M.</span>
      <span>Made with curiosity in Kolkata</span>
      <a href="#home">Back to top ↑</a>
    </footer>
  );
}

export default function App() {
  return (
    <main className="portfolio">
      <Header />
      <About />
      <AboutSection />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
