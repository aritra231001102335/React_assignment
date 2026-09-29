# React Assignments

Seven independent React + Vite projects. Install Node.js LTS first, then use Node.js/npm from PowerShell or the VS Code terminal. VS Code and a modern browser are recommended.

## Run a project

Open this workspace in VS Code. For the assignment you want to run, change into its folder, install its packages, and start Vite:

```powershell
cd Assignment_1_Portfolio
npm install
npm run dev
```

Replace the folder name with any of the other six project names below. Open the local URL printed by Vite. Stop it with `Ctrl+C` before starting another project.

## Projects

1. `Assignment_1_Portfolio` — responsive portfolio with header, navigation, about, education, skills, contact, and footer components.
2. `Assignment_2_Student_Props` — reusable `StudentList` and `StudentCard` components receive data through props and sort by CGPA.
3. `Assignment_3_Employee_Directory` — add, edit, delete, search, count, and department filtering for complete employee records.
4. `Assignment_4_Weather_API` — city weather lookup, loading/error states, temperature, humidity, wind, icon, sunrise, and sunset.
5. `Assignment_5_Shopping_Cart` — Context + `useReducer` cart, quantities, coupon, 18% GST, and total.
6. `Assignment_6_Task_Manager` — React Router dashboard, create/view/update/complete/delete flows, priority/category/status filters, dynamic task URLs, and a basic session-protected route.
7. `Assignment_7_Authentication` — Assignment 6's protected task routes combined with required username/password validation, password-strength feedback, remember-device storage, simulated token, and logout.

Assignments 6 and 7 include `react-router-dom` in their package dependencies. Run `npm install` inside each project before `npm run dev`.

## Weather API key (Assignment 4)

Create a file named `.env` inside `Assignment_4_Weather_API` by copying `.env.example`, then set your own OpenWeatherMap API key:

```env
VITE_OPENWEATHER_API_KEY=your_key_here
```

Restart the Vite server after changing `.env`. Do not commit or share your real key. Without a key, the weather app shows sample conditions and explains the setup requirement.

## Demo login (Assignment 7)

- Username: `admin`
- Password: `Admin@123`

This client-only token is simulated for coursework. It is not production authentication and must not protect real data.

The profile, institution, employee/student names, and sample records are demonstration content; personalize them to match your actual assignment submission.
