import { useMemo, useState } from "react";
import "./App.css";

const starterEmployees = [
  {
    id: 1,
    employeeId: "EMP-1042",
    name: "Ananya Bose",
    department: "Design",
    gender: "Female",
    phone: "98765 43210",
    localAddress: "Salt Lake, Kolkata",
    permanentAddress: "Burdwan, West Bengal",
  },
  {
    id: 2,
    employeeId: "EMP-1043",
    name: "Rohan Das",
    department: "Engineering",
    gender: "Male",
    phone: "98765 12340",
    localAddress: "New Town, Kolkata",
    permanentAddress: "Siliguri, West Bengal",
  },
  {
    id: 3,
    employeeId: "EMP-1044",
    name: "Farah Khan",
    department: "People",
    gender: "Female",
    phone: "98300 11223",
    localAddress: "Park Street, Kolkata",
    permanentAddress: "Howrah, West Bengal",
  },
];
const emptyForm = {
  employeeId: "",
  name: "",
  department: "Engineering",
  gender: "Female",
  phone: "",
  localAddress: "",
  permanentAddress: "",
};
const employeeFields = [
  ["name", "Full name"],
  ["employeeId", "Employee ID"],
  ["phone", "Phone number"],
  ["localAddress", "Local address"],
  ["permanentAddress", "Permanent address"],
];

function EmployeeForm({ value, onChange, onSubmit, onCancel, editing }) {
  return (
    <form className="employee-form" onSubmit={onSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">PEOPLE OPERATIONS</p>
          <h2>{editing ? "Edit employee" : "Add a teammate"}</h2>
        </div>
        {editing && (
          <button type="button" className="quiet-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
      <div className="form-grid">
        {employeeFields.map(([key, label]) => (
          <label
            className={key.includes("Address") ? "wide-field" : ""}
            key={key}
          >
            {label}
            <input
              required={key === "name" || key === "employeeId"}
              value={value[key]}
              onChange={(event) =>
                onChange({ ...value, [key]: event.target.value })
              }
            />
          </label>
        ))}
        <label>
          Department
          <select
            value={value.department}
            onChange={(event) =>
              onChange({ ...value, department: event.target.value })
            }
          >
            {["Engineering", "Design", "People", "Sales", "Operations"].map(
              (item) => (
                <option key={item}>{item}</option>
              ),
            )}
          </select>
        </label>
        <label>
          Gender
          <select
            value={value.gender}
            onChange={(event) =>
              onChange({ ...value, gender: event.target.value })
            }
          >
            {["Female", "Male", "Non-binary", "Prefer not to say"].map(
              (item) => (
                <option key={item}>{item}</option>
              ),
            )}
          </select>
        </label>
      </div>
      <button className="primary-button" type="submit">
        {editing ? "Save changes" : "Add employee"} <span>↗</span>
      </button>
    </form>
  );
}

function EmployeeRow({ employee, onEdit, onDelete }) {
  return (
    <article className="employee-row">
      <div className="avatar">
        {employee.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>
      <div className="employee-main">
        <h3>{employee.name}</h3>
        <p>
          {employee.employeeId} · {employee.department}
        </p>
      </div>
      <div className="employee-contact">
        <span>{employee.phone || "No phone listed"}</span>
        <small>{employee.gender}</small>
        <small>Local: {employee.localAddress || "Not listed"}</small>
        <small>Permanent: {employee.permanentAddress || "Not listed"}</small>
      </div>
      <div className="row-actions">
        <button
          type="button"
          aria-label={`Edit ${employee.name}`}
          title="Edit employee"
          onClick={() => onEdit(employee)}
        >
          Edit
        </button>
        <button
          type="button"
          className="delete-button"
          aria-label={`Delete ${employee.name}`}
          title="Delete employee"
          onClick={() => onDelete(employee.id)}
        >
          ×
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [employees, setEmployees] = useState(starterEmployees);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const departments = [
    "All departments",
    ...new Set(employees.map((employee) => employee.department)),
  ];
  const visibleEmployees = useMemo(
    () =>
      employees.filter(
        (employee) =>
          (department === "All departments" ||
            employee.department === department) &&
          `${employee.name} ${employee.employeeId} ${employee.department} ${employee.phone} ${employee.localAddress} ${employee.permanentAddress}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [employees, department, search],
  );

  function saveEmployee(event) {
    event.preventDefault();
    if (editingId)
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId ? { ...form, id: editingId } : employee,
        ),
      );
    else setEmployees((current) => [{ ...form, id: Date.now() }, ...current]);
    setForm(emptyForm);
    setEditingId(null);
  }
  function editEmployee(employee) {
    setForm({
      employeeId: employee.employeeId,
      name: employee.name,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress,
    });
    setEditingId(employee.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function cancelEdit() {
    setForm(emptyForm);
    setEditingId(null);
  }
  function deleteEmployee(id) {
    setEmployees((current) => current.filter((employee) => employee.id !== id));
  }

  return (
    <main className="directory-app">
      <header className="topbar">
        <a className="brand" href="#directory">
          Northstar <span>People</span>
        </a>
        <span>EMPLOYEE DIRECTORY</span>
        <span className="date-mark">Q3 · 2026</span>
      </header>
      <section className="page-intro" id="directory">
        <div>
          <p className="eyebrow">PEOPLE OPERATIONS / TEAM ROSTER</p>
          <h1>
            People make
            <br />
            <em>the place.</em>
          </h1>
        </div>
        <div className="employee-count">
          <strong>{employees.length.toString().padStart(2, "0")}</strong>
          <span>TEAM MEMBERS</span>
        </div>
      </section>
      <section className="directory-layout">
        <EmployeeForm
          value={form}
          onChange={setForm}
          onSubmit={saveEmployee}
          onCancel={cancelEdit}
          editing={Boolean(editingId)}
        />
        <div className="roster">
          <div className="roster-heading">
            <div>
              <p className="eyebrow">DIRECTORY</p>
              <h2>All colleagues</h2>
            </div>
            <span>{visibleEmployees.length} results</span>
          </div>
          <div className="filters">
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search employees"
                placeholder="Search name, ID, phone, or address"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <select
              aria-label="Filter by department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="employee-list">
            {visibleEmployees.map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onEdit={editEmployee}
                onDelete={deleteEmployee}
              />
            ))}
            {visibleEmployees.length === 0 && (
              <p className="empty-state">No employees match these filters.</p>
            )}
          </div>
        </div>
      </section>
      <footer className="app-footer">
        <span>NORTHSTAR · INTERNAL DIRECTORY</span>
        <span>Local demo data only</span>
      </footer>
    </main>
  );
}
