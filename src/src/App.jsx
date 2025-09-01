import { useEffect, useState } from "react";
import "./app.css";

const PROJECTS = [
  { title: "Portfolio", desc: "This site.", stack: ["React","Vite"], code: "#", demo: "#" },
  { title: "Chat UI", desc: "Accessible chat component.", stack: ["React","ARIA"], code: "#", demo: "#" }
];

export default function App() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <header className="site-header">
        <nav className="nav">
          <a className="logo" href="/">YourName</a>
          <div className="spacer" />
          <button className="btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </nav>
        <div className="hero">
          <h1>Hi, I'm <span className="accent">Your Name</span></h1>
          <p className="tagline">I build things for the web.</p>
          <div className="actions">
            <a className="btn" href="#projects">View Projects</a>
            <a className="btn ghost" href="resume.pdf" download>Download CV</a>
          </div>
        </div>
      </header>
      <main>
        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="grid">
            {PROJECTS.map(p => (
              <article key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <p className="stack">{p.stack.join(" · ")}</p>
                <p><a href={p.demo}>Demo</a> · <a href={p.code}>Code</a></p>
              </article>
            ))}
          </div>
        </section>
        <section className="section">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:you@example.com">you@example.com</a></p>
        </section>
      </main>
      <footer className="site-footer">
        <small>&copy; {new Date().getFullYear()} Your Name.</small>
      </footer>
    </>
  );
}