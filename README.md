 ---

# EasyFit - Fitness and Nutrition tracker

This is a **React-based web application** designed to help users manage their fitness goals, track workouts, and monitor progress, all in one place. The app is currently a **work in progress**, but the goal is to create a simple, effective, and a good alternative to the complicated and expensive fitness apps on the market.

---
### 🛠️ Technologies Used

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-333?style=flat&logo=typescript&logoColor=3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-333?style=flat&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/React_Router-333?style=flat&logo=reactrouter&logoColor=CA4245" alt="React Router" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-333?style=flat&logo=tailwind-css&logoColor=38B2AC" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Redux-333?style=flat&logo=redux&logoColor=764ABC" alt="Redux" />
  <img src="https://img.shields.io/badge/Redux_Persist-333?style=flat&logo=redux&logoColor=764ABC" alt="Redux Persist" />
  <img src="https://img.shields.io/badge/IndexedDB-333?style=flat&logo=databricks&logoColor=FF3621" alt="IndexedDB" />
  <img src="https://img.shields.io/badge/Axios-333?style=flat&logo=axios&logoColor=5A29E4" alt="Axios" />
  <img src="https://img.shields.io/badge/UUID_&_BSON-333?style=flat&logo=json&logoColor=white" alt="UUID & BSON" />
  <img src="https://img.shields.io/badge/Recharts-333?style=flat&logo=react&logoColor=22B5BF" alt="Recharts" />
  <img src="https://img.shields.io/badge/NoSleep.js-333?style=flat&logo=javascript&logoColor=F7DF1E" alt="NoSleep.js" />
</p>


---

## ✨ Features

### ✅ Current Features

* **Goal Tracking** – Track your fitness goals with an intuitive and clean interface
* **Activity Logs** – View your daily progress and logged exercises and workouts
* **Nutrition Logs** – Log and manage your food and water intake
* **Food Logs** - Track quantity, meal type, and important macros
* **Exercises Library** - Manage a local library of exercises
* **Workouts Library** - Use your exercises to create all kinds of workouts
* **Pre-made Exercises and Workouts** - Use the pre-made list of exercises and workouts already available through the API (API availability is limited for now since I host it on my pc)
* **A simple and useful Dashboard** - Stay updated on your progress with a simple dashboard with only the info you need

---

## 📋 What Can the App Do

Please keep in mind that the app is still work in progress. That said, some features may still change, contain bugs, or be non-functional

### Manage Exercises

Exercises can be viewed, created, edited, or deleted. There is only one required field: the name of the exercise. The rest are optional or have default values. This gives the user the option to keep their entries either simple and clear, or more detailed. When creating an exercise, the following inputs can be specified:

* Name of the exercise
* Description
* Reference URL in case the user wants to have a link to a tutorial
* Difficulty
* Privacy of the exercise
* Notes regarding the exercise
* Duration in seconds, minutes, or hours (default is minutes)
* Rest time between sets in seconds, minutes, or hours (default is seconds)
* Fields: name, target value, and unit
* Tags: name and color
* Equipment used with the exercise
* Target muscle groups worked by it
* Instructions

All exercises can be found inside the **Library** page and are saved locally using IndexedDB (idb). They can be exported into a JSON file as a backup or for migration, and new exercises can be imported if they match the correct format. 

The **Explore** page is similar to the Library page, except that it fetches public exercises from my fitness API, either fresh or cached. For now the API is up only periodically for developing and testing, so it might not be available at all times. For testing purposes, I will soon include a JSON file with some exercises and workouts.

The **View Exercise** screen shows all details about an exercise and allows the user to delete or edit it, but only if they are viewing the local version or are the author of the online one.

### Manage Workouts

Similar to exercises, creating a workout allows the user to use either just a name or a more detailed set of inputs depending on the desired complexity. Inputs include:

* Name
* Description
* Duration (in minutes)
* Difficulty
* Reference URL
* Notes
* Tags
* Equipment
* Targeted muscles
* Phases

---

## 🎯 Goals

Another core functionality of this app is the ability to **easily track goals**. The system is simple and doesn’t require much input, making it fast and effective.

Each goal requires a name, a color (default: white), and an icon (default: dumbbell). There are three types of goals, each with a different way of tracking progress:

* **Target goals** where you set a target and a unit. This type of goal supports multiple logs and it tracks progress by summing up the value of each log. You can also have up to 5 default values for easier logging (e.g. steps, distance, sleep, etc.)
* **Number goals** where you have a value and a unit. It accepts only one log per day and tracks progress by comparing the value to the past days (e.g. weight)
* **Boolean goals** where you can answer only with Yes or No. It also accepts only one log per day like the number goals (e.g. keeping track if you smoked today)

Goals appear on the **Home page**, with different visuals depending on type. The *target goal* will have your current progress out of the target value and a progress bar. The *number goal* displays today’s logged value (if available), and an arrow showing whether it's higher, lower, or the same as the previous one. And the *boolean goal* will have three icons representing the last three days. If you logged "Yes" there will be a checkmark, "No" will have an "X", and there will be a "-" if there is no goal. 

![Goals](https://i.imgur.com/MV4nLAB.png)

All goals are listed in `Menu > Goals`. You can also go to see a log page by clicking on it on the *Home page*. Clicking a goal opens its dedicated page, with a preview, summary of the last 3 days, and today’s logs. The goal can also be edited or deleted there.

<p align="center">
  <img src="https://i.imgur.com/sw56al7.png" alt="Screenshot 1" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/3A8qmwz.png" alt="Screenshot 2" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/TBhhyQb.png" alt="Screenshot 3" width="30%" />
</p>

---

## 📘 Logs

The app supports 3 types of logs, accessible via the big orange “+” button:

### 🥗 Food Logs

Used to track meals, snacks, or drinks. Fields include:

* Name
* Quantity & unit
* Food type
* Time
* Macros (calories, protein, carbs, fats, sugar, sodium)
* Notes

For now those values are only used for the **Nutrition Module** on the dashboard page with plans to have more stats and graphs. The Food Log screen includes the form and a toggle to view today’s history.

### 🏃 Activity Logs

For logging physical activities other than already created exercises and workouts. Fields include:

* Name
* Time
* Duration
* Sets
* Target muscles
* Tags
* Equipment Used
* Custom fields (e.g. Distance, Weight, Reps, etc)

### 🎯 Goal Logs

As mentioned earlier, there are 3 goal types. For single-value goals, the previous value is overridden with confirmation. After logging, the user is redirected to view the log.

All logs appear in the **Activity** page and can be browsed by day. Insights and summaries are planned for future updates.

---

## 🏋️ Complete Workouts

To help users track progress while exercising, there's a **Workout page** with:

* Timer
* Progress bar
* Add set button
* List of exercises
* Set completion UI with checkboxes, skip button, and timer

Each interaction triggers a **snapshot** to prevent progress loss. If the user leaves the screen, a **resume prompt** appears on the home screen. This feature also works for single exercises.

<p align="center">
  <img src="https://i.imgur.com/3b83lwW.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/97F7hve.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/QHbeIB3.png" alt="Screenshot 6" width="30%" />
</p>

---

## 🧩 Other Screenshots

Tags, equipment, and muscles can be added using “item pickers.” These allow searching existing items or creating new ones directly.

<p align="center">
  <img src="https://i.imgur.com/in8hPaq.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/QePwq0u.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/mAZ4oNG.png" alt="Screenshot 6" width="30%" />
</p>

Pickers are also available for:

* **Colors** – Default list + color input
* **Icons** – Manually added icons (more planned)
* **Units** – Predefined or custom units with name + short name

<p align="center">
  <img src="https://i.imgur.com/yejnWmI.png" alt="Screenshot 4" width="20%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/ndy01qR.png" alt="Screenshot 5" width="20%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/KpvG5x4.png" alt="Screenshot 6" width="20%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/6zP02m2.png" alt="Screenshot 7" width="20%" />
</p>

---

## 🔎 Filter and Search

Filter workouts and exercises using search, difficulty, tags, muscles, equipment, and duration.

---

## 🔜 Upcoming Features

* **Food Database** – Pre-filled database for common foods
* **Meal Plans** – Importable meal schedules with logging support
* **Workout Plans** – Schedule weekly activities
* **Online Exercise & Workout Database**
* **Sharing** – Share your plans via link or in-app
* **Social** – Forum, guides, and shared resources

## 🚀 How to Run the App

### Live version

A live version can be accessed here [EasyFit Live Preview](https://stefan0712.github.io/fitness-app/). It can be run in the browser, but for the best experience I recommend installing it locally or using the fullscreen mode.

### Local version
*If you’re using a large screen, please use Developer Tools to simulate a mobile device.* There is **no desktop mode** for this app for now so it will not work and looks as expected.

**Prerequisites**
* Node.js
* npm installed

**Clone the Repository**
```bash
git clone https://github.com/Stefan0712/fitness-app.git
cd fitness-tracker
```
**Install Dependencies**
```bash
npm install
```
**Run the Development Server**
```bash
npm run dev
```
**Open in Browser**
```bash
http://localhost:3006
```

---

## 🤝 Contributing

Contributions are welcome!

* Fork this repository
* Create a new branch
* Submit a pull request

---

## 📬 Feedback

Have feedback or ideas?
Open an issue or reach out — let’s make **EasyFit** the best it can be!

---
