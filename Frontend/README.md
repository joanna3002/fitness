AI Fitness Coach

A simple React application that provides an AI Chat Coach, Workout Generator, and Meal Planner — all designed to help users improve their fitness and lifestyle.
This project was created using Create React App.

Features:
🤖 AI Chat Coach

Users can chat with an AI Fitness Coach.

Provides fitness tips, exercise suggestions, and answers fitness questions.

Has gender-based responses (Male / Female toggle).

Simulates typing for a more natural chat experience.

💪 Workout Generator (Merged Inside ChatCoach)

Automatically generates workouts based on user prompts.

No separate page — fully merged into the ChatCoach page.

Hard-coded logic suitable for classroom requirements.

🍽 Meal Planner

Hard-coded sample meals for Breakfast, Lunch, and Dinner.

Clean and simple UI.

Included on the Home page as a preview section.

🌙 Dark Mode (Global)

Entire app styled with a consistent dark theme for modern look & feel.

📂 Project Structure:

src/

 ├── Pages/
 
 │    ├── ChatCoach.jsx       # AI Coach + Workout Generator (merged)
 
 │    ├── MealPlanner.jsx     # Hard-coded meal planner
 
 │    ├── Home.jsx            # Displays meal planner + chatcoach preview
 
 │    └── ThemeContext.jsx    # Dark mode implementation
 
 ├── Layout/
 
 │    └── MainLayout.jsx
 
 ├── Services/
 
 │    └── chatService.js
 
 └── App.js

🛠 Installation & Setup


1️⃣ Clone the Repository
git clone https://github.com/joanna3002/AI-Fitness-Coach.git
cd AI-Fitness-Coach

2️⃣ Install Dependencies
npm install

3️⃣ Start the Development Server
npm start


Now open:

👉 http://localhost:3000

🧪 Available Scripts
npm start

Runs the app in development mode.
Automatically reloads on save.

npm run build

Bundles the app for production into the build/ folder.

npm test

Runs tests in watch mode.

🧩 Tech Stack

React.js (Create React App)

JavaScript ES6

CSS / Inline Styling

Optional: Node.js backend if used for AI response handling

👩‍💻 Author

Joanna (joanna3002)
AI Fitness Coach Frontend Project (2025)
