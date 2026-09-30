import React, { useState } from "react";
import "./Portfolio.css";

const CURRENT_YEAR = new Date().getFullYear();

const Portfolio = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm Aritra's portfolio assistant. Ask me anything about Aritra.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: message },
      {
        sender: "bot",
        text: "Thanks for your message! You can contact Aritra directly through the Contact Me button.",
      },
    ]);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const contactMe = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=aritra.bhattacharya.se@gmail.com",
      "_blank",
    );
  };

  return (
    <div className="portfolio">
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo">
          AB<span>.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="nav-contact" onClick={contactMe}>
          Let's Talk <span>↗</span>
        </button>
      </header>

      {/* HERO */}
      <main id="home" className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot"></span>
            AVAILABLE FOR OPPORTUNITIES
          </p>

          <h1>
            Hi, I'm <span>Aritra</span>
            <br />
            Bhattacharya.
          </h1>

          <p className="hero-description">
            A passionate BCA student from Techno India University, interested in
            technology, software development and building meaningful digital
            experiences.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={contactMe}>
              Contact Me <span>↗</span>
            </button>

            <a href="#about" className="secondary-btn">
              Explore Portfolio ↓
            </a>
          </div>

          <div className="quick-info">
            <div>
              <span>BASED IN</span>
              <strong>West Bengal, India</strong>
            </div>

            <div>
              <span>DEGREE</span>
              <strong>BCA</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong>Student</strong>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>

          <div className="profile-card">
            <div className="profile-top">
              <span>PORTFOLIO</span>
              <span>01 / 01</span>
            </div>

            <div className="profile-initial">AB</div>

            <div className="profile-bottom">
              <div>
                <small>CREATIVE</small>
                <strong>DEVELOPER</strong>
              </div>
              <div className="arrow-circle">↗</div>
            </div>
          </div>
        </div>
      </main>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="section-label">
          <span>01</span>
          ABOUT ME
        </div>

        <div className="about-grid">
          <div>
            <h2>
              Building my path
              <br />
              <span>through technology.</span>
            </h2>
          </div>

          <div className="about-text">
            <p>
              I'm <strong>Aritra Bhattacharya</strong>, currently pursuing
              Bachelor of Computer Applications (BCA) from Techno India
              University.
            </p>

            <p>
              I enjoy learning about software, web technologies and
              problem-solving. I'm continuously working on improving my
              technical knowledge and creating projects that turn ideas into
              practical digital experiences.
            </p>

            <div className="personal-details">
              <div>
                <span>NAME</span>
                <strong>Aritra Bhattacharya</strong>
              </div>

              <div>
                <span>PHONE</span>
                <strong>+91 62916 61554</strong>
              </div>

              <div>
                <span>EMAIL</span>
                <strong>aritra.bhattacharya.se@gmail.com</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section education-section">
        <div className="section-label">
          <span>02</span>
          EDUCATION
        </div>

        <div className="education-list">
          <div className="education-card">
            <div className="education-number">01</div>

            <div className="education-content">
              <span>UNDERGRADUATE</span>
              <h3>Bachelor of Computer Applications</h3>
              <p>Techno India University</p>
              <small>Currently Pursuing</small>
            </div>

            <div className="education-arrow">↗</div>
          </div>

          <div className="education-card">
            <div className="education-number">02</div>

            <div className="education-content">
              <span>HIGHER SECONDARY</span>
              <h3>Higher Secondary Education</h3>
              <p>West Bengal Board</p>
              <small>Completed</small>
            </div>

            <div className="education-arrow">↗</div>
          </div>
        </div>
      </section>

      {/* CHAT */}
      <section className="section chat-section">
        <div className="section-label">
          <span>03</span>
          QUICK CHAT
        </div>

        <div className="chat-wrapper">
          <div className="chat-intro">
            <span className="chat-icon">✦</span>
            <h2>
              Have a question?
              <br />
              <span>Let's chat.</span>
            </h2>

            <p>
              Ask something about my education, interests or how to get in
              touch.
            </p>
          </div>

          <div className="chat-box">
            <div className="chat-header">
              <div>
                <span className="online-dot"></span>
                Aritra's Assistant
              </div>

              <span>ONLINE</span>
            </div>

            <div className="chat-messages">
              {messages.map((item, index) => (
                <div key={index} className={`message ${item.sender}`}>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button onClick={sendMessage}>↑</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <span className="contact-small">LET'S CONNECT</span>

          <h2>
            Let's build
            <br />
            something <span>great.</span>
          </h2>

          <p>
            Whether you want to discuss an opportunity, a project, or simply
            connect, feel free to reach out.
          </p>

          <button className="contact-large-btn" onClick={contactMe}>
            <span>Send me an email</span>
            <strong>↗</strong>
          </button>

          <div className="contact-details">
            <a href="mailto:aritra.bhattacharya.se@gmail.com">
              aritra.bhattacharya.se@gmail.com
            </a>

            <a href="tel:+916291661554">+91 62916 61554</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          AB<span>.</span>
        </div>

        <p>© {CURRENT_YEAR} Aritra Bhattacharya. All rights reserved.</p>

        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
};

export default Portfolio;
