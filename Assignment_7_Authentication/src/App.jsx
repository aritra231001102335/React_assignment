import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import TaskWorkspace from "./TaskWorkspace";
import "./App.css";

const TOKEN_KEY = "assignment7.demoToken";
function makeToken(username) {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({ sub: username, exp: Date.now() + 3600000 }),
  );
  return `${header}.${payload}.SIMULATED_SIGNATURE`;
}
function readSession() {
  try {
    const stored =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    const session = JSON.parse(stored);
    const payload = JSON.parse(atob(session.token.split(".")[1]));
    if (payload.exp <= Date.now()) {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    return null;
  }
}
function AuthPage({ onAuthenticate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const strength =
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
      ? 3
      : password.length >= 8
        ? 2
        : password.length > 0
          ? 1
          : 0;
  const navigate = useNavigate();
  function submit(event) {
    event.preventDefault();
    if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(username))
      return setError(
        "Username is required and must be 3–24 valid characters.",
      );
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password))
      return setError(
        "Password is required and needs 8 characters, an uppercase letter, a number, and a symbol.",
      );
    if (username !== "admin" || password !== "Admin@123")
      return setError(
        "Demo sign-in did not match. Use the classroom credentials below.",
      );
    const session = { username, token: makeToken(username) };
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, JSON.stringify(session));
    (remember ? sessionStorage : localStorage).removeItem(TOKEN_KEY);
    onAuthenticate(session);
    navigate("/dashboard", { replace: true });
  }
  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <a className="brand" href="/">
          NORTHSTAR<span> / ACCESS</span>
        </a>
        <div className="visual-copy">
          <p className="eyebrow">A STUDENT WORKSPACE</p>
          <h1>
            Good work
            <br />
            needs a little
            <br />
            <em>room to grow.</em>
          </h1>
          <p>
            One secure place for the projects and plans you are moving forward.
          </p>
        </div>
        <div className="visual-foot">
          <span>DEMO ENVIRONMENT</span>
          <span>01 — 02</span>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-form-wrap">
          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign in</h2>
          <p className="form-intro">
            Sign in to manage your protected tasks and dashboard.
          </p>
          <form onSubmit={submit} noValidate>
            <label>
              Username
              <input
                autoComplete="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                placeholder="Your username"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Your password"
              />
              <span className={`strength strength-${strength}`}>
                <i />
                <i />
                <i />
                {
                  ["", "Getting started", "Good strength", "Strong password"][
                    strength
                  ]
                }
              </span>
            </label>
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />{" "}
              Remember this device
            </label>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
            <button className="submit-button" type="submit">
              Sign in <span>↗</span>
            </button>
          </form>
          <div className="demo-credentials">
            <span>CLASSROOM DEMO</span>
            <p>
              admin <span>/</span> Admin@123
            </p>
          </div>
          <p className="security-note">
            This assignment simulates a JWT in browser storage and protects the
            task routes. It is for learning only, not production authentication.
          </p>
        </div>
      </section>
    </main>
  );
}
function AuthApp() {
  const [session, setSession] = useState(readSession);
  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setSession(null);
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          session ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthPage onAuthenticate={setSession} />
          )
        }
      />
      <Route
        path="/dashboard/*"
        element={
          session ? (
            <TaskWorkspace session={session} onLogout={logout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AuthApp />
    </BrowserRouter>
  );
}
