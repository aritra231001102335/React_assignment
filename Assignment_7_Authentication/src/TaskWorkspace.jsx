import { useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./TaskWorkspace.css";

const seedTasks = [
  {
    id: "T-204",
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
    id: "T-203",
    title: "Book annual health check",
    description: "Choose an afternoon appointment near campus.",
    priority: "Low",
    category: "Personal",
    raised: "2026-09-25T14:15",
    due: "2026-10-08",
    status: "Raised",
  },
  {
    id: "T-202",
    title: "Prepare lab presentation",
    description: "Collect the latest results and finish the slide deck.",
    priority: "Medium",
    category: "Academic",
    raised: "2026-09-24T11:00",
    due: "2026-10-01",
    status: "Pending",
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

function TaskNavigation({ username, onLogout }) {
  return (
    <aside className="secure-sidebar">
      <Link className="secure-mark" to="/dashboard">
        NORTHSTAR<span>.</span>
      </Link>
      <p>YOUR WORKSPACE</p>
      <nav>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/tasks">All tasks</Link>
        <Link to="/dashboard/tasks/new">Add task</Link>
        <Link to="/dashboard/completed">Completed</Link>
      </nav>
      <div className="secure-account">
        <span>{username[0].toUpperCase()}</span>
        <div>
          <strong>{username}</strong>
          <small>Protected session</small>
        </div>
        <button
          type="button"
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
    <Link className="secure-task-row" to={`/dashboard/tasks/${task.id}`}>
      <span className={`secure-priority ${task.priority.toLowerCase()}`} />
      <div>
        <strong>{task.title}</strong>
        <small>
          {task.id} · {task.category}
        </small>
      </div>
      <span className={`secure-status ${task.status.toLowerCase()}`}>
        {task.status}
      </span>
      <span className="secure-due">{task.due}</span>
      <span className="secure-arrow">↗</span>
    </Link>
  );
}
function Overview({ tasks, session }) {
  const open = tasks.filter((task) => task.status !== "Closed");
  return (
    <>
      <header className="secure-page-heading">
        <div>
          <p>AUTHENTICATED WORKSPACE / 29 SEP 2026</p>
          <h1>
            Welcome, <em>{session.username}.</em>
          </h1>
        </div>
        <Link className="secure-primary" to="/dashboard/tasks/new">
          + New task
        </Link>
      </header>
      <section className="secure-stats">
        <div>
          <span>OPEN TASKS</span>
          <strong>{open.length.toString().padStart(2, "0")}</strong>
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
        <div>
          <span>SESSION</span>
          <strong>ACTIVE</strong>
        </div>
      </section>
      <section className="secure-task-section">
        <header>
          <div>
            <p>KEEP YOUR NEXT STEPS CLOSE</p>
            <h2>Recent tasks</h2>
          </div>
          <Link to="/dashboard/tasks">All tasks ↗</Link>
        </header>
        <div className="secure-task-list">
          {open.slice(0, 4).map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </section>
      <section className="secure-token">
        <span>SIMULATED JWT · CLASSROOM DEMO</span>
        <code>{session.token}</code>
        <small>
          Client-side token simulation only. Not production authentication.
        </small>
      </section>
    </>
  );
}
function TaskListPage({ tasks, completed = false }) {
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
      <header className="secure-page-heading">
        <div>
          <p>PROTECTED WORKSPACE / TASKS</p>
          <h1>{completed ? "Completed" : "All tasks"}</h1>
        </div>
        <Link className="secure-primary" to="/dashboard/tasks/new">
          + New task
        </Link>
      </header>
      <div className="secure-filters">
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
      <div className="secure-task-list">
        {visible.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
        {visible.length === 0 && (
          <p className="secure-empty">No tasks match these filters.</p>
        )}
      </div>
    </>
  );
}
function TaskEditor({ existing, onSave }) {
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
    navigate(existing ? `/dashboard/tasks/${task.id}` : "/dashboard/tasks");
  }
  return (
    <>
      <header className="secure-page-heading">
        <div>
          <p>PROTECTED WORKSPACE / TASKS</p>
          <h1>{existing ? "Update task" : "New task"}</h1>
        </div>
        <Link
          to={existing ? `/dashboard/tasks/${existing.id}` : "/dashboard/tasks"}
        >
          Cancel
        </Link>
      </header>
      <form className="secure-task-form" onSubmit={submit}>
        <label>
          Task header
          <input
            required
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
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
          />
        </label>
        <div>
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
        <div>
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
        <button className="secure-primary" type="submit">
          {existing ? "Save task" : "Create task"} ↗
        </button>
      </form>
    </>
  );
}
function TaskDetailPage({ tasks, onSave, onDelete }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((item) => item.id === taskId);
  if (!task)
    return (
      <p className="secure-empty">
        Task not found. <Link to="/dashboard/tasks">Back to tasks</Link>
      </p>
    );
  function remove() {
    if (window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
      onDelete(task.id);
      navigate("/dashboard/tasks");
    }
  }
  return (
    <>
      <header className="secure-page-heading">
        <div>
          <p>PROTECTED WORKSPACE / {task.id}</p>
          <h1>Task details</h1>
        </div>
        <Link to="/dashboard/tasks">← All tasks</Link>
      </header>
      <article className="secure-detail">
        <span className={`secure-status ${task.status.toLowerCase()}`}>
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
        <div className="secure-actions">
          <Link
            className="secure-primary"
            to={`/dashboard/tasks/${task.id}/edit`}
          >
            Edit task ↗
          </Link>
          <button
            type="button"
            onClick={() =>
              onSave({
                ...task,
                status: task.status === "Closed" ? "Pending" : "Closed",
              })
            }
          >
            {task.status === "Closed" ? "Reopen task" : "Mark complete"}
          </button>
          <button className="secure-delete" type="button" onClick={remove}>
            Delete task
          </button>
        </div>
      </article>
    </>
  );
}
function EditorRoute({ tasks, onSave }) {
  const { taskId } = useParams();
  const task = tasks.find((item) => item.id === taskId);
  return task ? (
    <TaskEditor key={task.id} existing={task} onSave={onSave} />
  ) : (
    <Navigate to="/dashboard/tasks" replace />
  );
}
export default function TaskWorkspace({ session, onLogout }) {
  const [tasks, setTasks] = useState(seedTasks);
  function saveTask(task) {
    setTasks((current) =>
      current.some((item) => item.id === task.id)
        ? current.map((item) => (item.id === task.id ? task : item))
        : [task, ...current],
    );
  }
  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }
  return (
    <div className="secure-workspace">
      <TaskNavigation username={session.username} onLogout={onLogout} />
      <main className="secure-content">
        <Routes>
          <Route index element={<Overview tasks={tasks} session={session} />} />
          <Route path="tasks" element={<TaskListPage tasks={tasks} />} />
          <Route
            path="completed"
            element={<TaskListPage tasks={tasks} completed />}
          />
          <Route path="tasks/new" element={<TaskEditor onSave={saveTask} />} />
          <Route
            path="tasks/:taskId/edit"
            element={<EditorRoute tasks={tasks} onSave={saveTask} />}
          />
          <Route
            path="tasks/:taskId"
            element={
              <TaskDetailPage
                tasks={tasks}
                onSave={saveTask}
                onDelete={deleteTask}
              />
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
