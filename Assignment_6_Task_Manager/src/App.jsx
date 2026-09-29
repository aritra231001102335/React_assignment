import { useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";

const SESSION_KEY = "assignment6.user";
const seedTasks = [
  {
    id: "T-104",
    title: "Submit research proposal",
    description:
      "Share the revised outline with the faculty advisor and attach the literature review.",
    priority: "High",
    category: "Academic",
    raised: "2026-09-26T09:30",
    due: "2026-10-02",
    status: "Pending",
  },
  {
    id: "T-103",
    title: "Book annual health check",
    description: "Choose an afternoon appointment near campus.",
    priority: "Low",
    category: "Personal",
    raised: "2026-09-25T14:15",
    due: "2026-10-08",
    status: "Raised",
  },
  {
    id: "T-102",
    title: "Prepare lab presentation",
    description: "Collect the latest results and finish the slide deck.",
    priority: "Medium",
    category: "Academic",
    raised: "2026-09-24T11:00",
    due: "2026-10-01",
    status: "Pending",
  },
  {
    id: "T-101",
    title: "Renew library books",
    description: "Extend the loan for two books from the reading list.",
    priority: "Low",
    category: "Personal",
    raised: "2026-09-22T16:40",
    due: "2026-09-27",
    status: "Closed",
  },
];
const emptyTask = {
  title: "",
  description: "",
  priority: "Medium",
  category: "Academic",
  due: "",
  status: "Raised",
};

function Guard({ allowed, children }) {
  return allowed ? children : <Navigate to="/sign-in" replace />;
}

function SideNav({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <Link className="task-brand" to="/">
        DAYMARK<span>.</span>
      </Link>
      <p className="nav-label">WORKSPACE</p>
      <nav>
        <Link to="/">Overview</Link>
        <Link to="/tasks">All tasks</Link>
        <Link to="/tasks/new">Add task</Link>
        <Link to="/completed">Completed</Link>
      </nav>
      <div className="sidebar-bottom">
        <p className="nav-label">SESSION</p>
        <span className="user-badge">{user[0].toUpperCase()}</span>
        <div className="user-info">
          <strong>{user}</strong>
          <small>Student workspace</small>
        </div>
        <button
          type="button"
          className="logout-button"
          title="Sign out"
          aria-label="Sign out"
          onClick={onLogout}
        >
          ↗
        </button>
      </div>
    </aside>
  );
}

function TaskRow({ task }) {
  return (
    <Link className="task-row" to={`/tasks/${task.id}`}>
      <span className={`priority-mark ${task.priority.toLowerCase()}`} />
      <div className="task-name">
        <strong>{task.title}</strong>
        <span>
          {task.id} · {task.category}
        </span>
      </div>
      <span className={`status-pill ${task.status.toLowerCase()}`}>
        {task.status}
      </span>
      <span className="due-date">{task.due}</span>
      <span className="row-arrow">↗</span>
    </Link>
  );
}

function Dashboard({ tasks }) {
  const open = tasks.filter((task) => task.status !== "Closed");
  return (
    <>
      <header className="view-header">
        <div>
          <p className="eyebrow">MONDAY, SEPTEMBER 29, 2026</p>
          <h1>Good morning.</h1>
        </div>
        <Link className="primary-button" to="/tasks/new">
          + <span>New task</span>
        </Link>
      </header>
      <section className="summary-grid">
        <div>
          <span>OPEN TASKS</span>
          <strong>{open.length.toString().padStart(2, "0")}</strong>
        </div>
        <div>
          <span>DUE THIS WEEK</span>
          <strong>
            {open
              .filter((task) => task.due <= "2026-10-04")
              .length.toString()
              .padStart(2, "0")}
          </strong>
        </div>
        <div>
          <span>COMPLETED</span>
          <strong>
            {tasks
              .filter((task) => task.status === "Closed")
              .length.toString()
              .padStart(2, "0")}
          </strong>
        </div>
      </section>
      <section className="task-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR WORK, IN VIEW</p>
            <h2>Recent tasks</h2>
          </div>
          <Link to="/tasks">View all ↗</Link>
        </div>
        <div className="task-list">
          {open.slice(0, 4).map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </section>
      <section className="focus-note">
        <span>THIS WEEK</span>
        <p>
          Small steps add up.
          <br />
          <strong>Keep a little momentum.</strong>
        </p>
        <span>29 SEP — 04 OCT</span>
      </section>
    </>
  );
}

function TaskList({ tasks, completed = false }) {
  const [priority, setPriority] = useState("All priorities");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const visible = tasks.filter(
    (task) =>
      (completed ? task.status === "Closed" : true) &&
      (priority === "All priorities" || task.priority === priority) &&
      (category === "All categories" || task.category === category) &&
      (status === "All statuses" || task.status === status),
  );
  return (
    <>
      <header className="view-header">
        <div>
          <p className="eyebrow">WORKSPACE / TASKS</p>
          <h1>{completed ? "Completed" : "All tasks"}</h1>
        </div>
        <Link className="primary-button" to="/tasks/new">
          + <span>New task</span>
        </Link>
      </header>
      <div className="task-filters">
        <label>
          Priority
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            {["All priorities", "High", "Medium", "Low"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {["All categories", "Academic", "Personal"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {["All statuses", "Raised", "Pending", "Closed"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <span>{visible.length} tasks</span>
      </div>
      <div className="task-list">
        {visible.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
        {visible.length === 0 && (
          <p className="empty-state">No tasks match these filters.</p>
        )}
      </div>
    </>
  );
}

function TaskForm({ existing, onSave }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(existing ? { ...existing } : emptyTask);
  function submit(event) {
    event.preventDefault();
    const task = existing
      ? { ...form, id: existing.id, raised: existing.raised }
      : {
          ...form,
          id: `T-${Date.now().toString().slice(-5)}`,
          raised: new Date().toISOString().slice(0, 16),
        };
    onSave(task);
    navigate(existing ? `/tasks/${task.id}` : "/tasks");
  }
  return (
    <>
      <header className="view-header">
        <div>
          <p className="eyebrow">WORKSPACE / TASKS</p>
          <h1>{existing ? "Update task" : "New task"}</h1>
        </div>
        <Link to={existing ? `/tasks/${existing.id}` : "/tasks"}>Cancel</Link>
      </header>
      <form className="task-form" onSubmit={submit}>
        <label>
          Task header
          <input
            required
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            placeholder="What needs doing?"
          />
        </label>
        <label>
          Task description
          <textarea
            rows="4"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            placeholder="Add a few details"
          />
        </label>
        <div className="form-pair">
          <label>
            Priority
            <select
              value={form.priority}
              onChange={(event) =>
                setForm({ ...form, priority: event.target.value })
              }
            >
              {["High", "Medium", "Low"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value })
              }
            >
              {["Academic", "Personal"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-pair">
          <label>
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value })
              }
            >
              {["Raised", "Pending", "Closed"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Due date
            <input
              type="date"
              required
              value={form.due}
              onChange={(event) =>
                setForm({ ...form, due: event.target.value })
              }
            />
          </label>
        </div>
        <button className="primary-button" type="submit">
          {existing ? "Save task" : "Create task"} ↗
        </button>
      </form>
    </>
  );
}

function TaskDetail({ tasks, onStatus, onDelete }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((item) => item.id === taskId);
  if (!task)
    return (
      <section className="empty-state">
        <h1>Task not found</h1>
        <Link to="/tasks">Back to tasks</Link>
      </section>
    );
  function deleteTask() {
    if (window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
      onDelete(task.id);
      navigate("/tasks");
    }
  }
  return (
    <>
      <header className="view-header">
        <div>
          <p className="eyebrow">WORKSPACE / {task.id}</p>
          <h1>Task details</h1>
        </div>
        <Link to="/tasks">← All tasks</Link>
      </header>
      <article className="detail-panel">
        <span className={`status-pill ${task.status.toLowerCase()}`}>
          {task.status}
        </span>
        <h2>{task.title}</h2>
        <p>{task.description || "No description provided."}</p>
        <dl>
          <div>
            <dt>Priority</dt>
            <dd>{task.priority}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{task.category}</dd>
          </div>
          <div>
            <dt>Raised date &amp; time</dt>
            <dd>{new Date(task.raised).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Due date</dt>
            <dd>{task.due}</dd>
          </div>
        </dl>
        <div className="detail-actions">
          <Link className="primary-button" to={`/tasks/${task.id}/edit`}>
            Edit task ↗
          </Link>
          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              onStatus(task.id, task.status === "Closed" ? "Pending" : "Closed")
            }
          >
            {task.status === "Closed" ? "Reopen task" : "Mark complete"}
          </button>
          <button
            className="delete-task-button"
            type="button"
            onClick={deleteTask}
          >
            Delete task
          </button>
        </div>
      </article>
    </>
  );
}

function SignIn({ onLogin }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  function submit(event) {
    event.preventDefault();
    onLogin(name.trim());
    navigate("/", { replace: true });
  }
  return (
    <main className="signin">
      <Link className="task-brand" to="/">
        DAYMARK<span>.</span>
      </Link>
      <p className="eyebrow">STUDENT WORKSPACE</p>
      <h1>
        Make room
        <br />
        <em>for the work.</em>
      </h1>
      <p>Enter a name to open this basic protected coursework demo.</p>
      <form onSubmit={submit}>
        <label>
          Your name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Aritra"
          />
        </label>
        <button className="primary-button" type="submit">
          Continue to workspace ↗
        </button>
      </form>
    </main>
  );
}

function Workspace() {
  const [tasks, setTasks] = useState(seedTasks);
  const [user, setUser] = useState(
    () => sessionStorage.getItem(SESSION_KEY) || "",
  );
  function login(name) {
    sessionStorage.setItem(SESSION_KEY, name);
    setUser(name);
  }
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setUser("");
  }
  function saveTask(task) {
    setTasks((current) =>
      current.some((item) => item.id === task.id)
        ? current.map((item) => (item.id === task.id ? task : item))
        : [task, ...current],
    );
  }
  function changeStatus(id, status) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  }
  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }
  return (
    <div className={`task-app ${user ? "" : "signed-out"}`}>
      {user && <SideNav user={user} onLogout={logout} />}
      <main className="workspace-content">
        <Routes>
          <Route
            path="/sign-in"
            element={
              user ? <Navigate to="/" replace /> : <SignIn onLogin={login} />
            }
          />
          <Route
            path="/"
            element={
              <Guard allowed={Boolean(user)}>
                <Dashboard tasks={tasks} />
              </Guard>
            }
          />
          <Route
            path="/tasks"
            element={
              <Guard allowed={Boolean(user)}>
                <TaskList tasks={tasks} />
              </Guard>
            }
          />
          <Route
            path="/completed"
            element={
              <Guard allowed={Boolean(user)}>
                <TaskList tasks={tasks} completed />
              </Guard>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <Guard allowed={Boolean(user)}>
                <TaskForm onSave={saveTask} />
              </Guard>
            }
          />
          <Route
            path="/tasks/:taskId/edit"
            element={
              <Guard allowed={Boolean(user)}>
                <EditTask tasks={tasks} onSave={saveTask} />
              </Guard>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              <Guard allowed={Boolean(user)}>
                <TaskDetail
                  tasks={tasks}
                  onStatus={changeStatus}
                  onDelete={deleteTask}
                />
              </Guard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function EditTask({ tasks, onSave }) {
  const { taskId } = useParams();
  const task = tasks.find((item) => item.id === taskId);
  return task ? (
    <TaskForm key={task.id} existing={task} onSave={onSave} />
  ) : (
    <Navigate to="/tasks" replace />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Workspace />
    </BrowserRouter>
  );
}
