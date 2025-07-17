 ---

# EasyFit (Work in Progress and Open to Name Suggestions)

Welcome to **EasyFit**! 🚀
This is a **React-based web application** designed to help users manage their fitness goals, track workouts, and monitor progress—all in one place. The app is currently a **work in progress**, but the goal is to create a simple, effective, and **free-to-use** alternative to the complicated and expensive fitness apps on the market.

---

## 🎯 Purpose

This app is designed to:

* Showcase my **web development skills** in React and Redux
* Provide a **personal fitness tracking tool** for myself and anyone else who wants to use it
* Serve as a **free, open-source** alternative to paid fitness apps

---

## ℹ️ About the App

This fitness app is a React-based web application designed with modern web development tools and practices. It demonstrates the use of various libraries and frameworks to build a robust, scalable, and user-friendly application.

### Technologies Used

* **React** – The core library for building the app's user interface
* **React Router** – Enables seamless navigation between pages and sections
* **Redux** – Manages the application's state efficiently, ensuring a predictable data flow
* **Redux Persist** – Preserves the state across browser sessions for a better user experience
* **IndexedDB** – Used for saving all items locally
* **UUID** – Generates unique identifiers for app components like goals, exercises, and logs

---

## ✨ Features (Planned and Current)

### ✅ Current Features

* **Goal Tracking** – Track your fitness goals with an intuitive and clean interface
* **Activity Logs** – View your daily progress and logged exercises and workouts
* **Nutrition Logs** – Log and manage your food and water intake
* **Fast to Use** – Forget about having to fill out dozens of fields for just one log. Besides the name, everything else is optional (in most cases)
* **Works Offline** – (STILL WORKING ON IT) Everything is saved locally so you won't need a constant internet connection to use it
* **Free** – All the important features are free to use\*
* **Perfectly Balanced** – It is neither too simple nor too complicated. You can create custom equipment, fields, or tags, or just use the default ones

---

## 📋 What Can the App Do

This is a pretty detailed summary of what the app can and can't do at the moment.

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

The **Explore** page is similar to the Library page, except that it fetches public exercises from my fitness API, either fresh or cached.

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

Workouts are split into **phases** (default: “Warm-up” and “Workout”) to allow users to build full sessions. Users can add/edit/remove phases (at least one is required). Exercises are added to phases, with a dropdown to choose number of sets (1–10).

The **View Workout** page resembles the View Exercise page, with exercises grouped by phase. Workouts are saved and cached like exercises, follow the same rules for editing/deleting, and can be exported/imported via JSON.

When a workout is created, a **copy of all exercises** is saved into the workout instead of IDs to prevent accidental breaking due to external changes. An update button allows syncing to the latest versions if desired.

---

## 🎯 Goals

Another core functionality of this app is the ability to **easily track goals**. The system is simple and doesn’t require much input, making it fast and effective.

Goals can be created from:
`Menu > Goals > New Goal`

Each goal requires a name, a color (default: white), and an icon (default: dumbbell). There are three ways to track a goal:

* By setting a **target value** (e.g. steps, distance, sleep, etc.)
* By logging **one value per day** (e.g. weight)
* By answering with **Yes or No** (e.g. “Did you stretch today?”)

Goals appear on the **Home page**, with different visuals depending on type. If a daily goal is already logged, the app prompts the user when trying to overwrite it.

![Goals](https://i.imgur.com/MV4nLAB.png)

All goals are listed in `Menu > Goals`. Clicking a goal opens its dedicated page, with a preview, summary of the last 3 days, and today’s logs. The goal can also be edited or deleted there.

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

These are shown in the **Nutrition Module** on the dashboard. The Food Log screen includes the form and a toggle to view today’s history.

### 🏃 Activity Logs

For logging non-exercise physical activities. Fields include:

* Name
* Time
* Duration
* Sets
* Target muscles
* Custom fields

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
* **Activity Plans** – Schedule weekly activities
* **Online Exercise & Workout Database**
* **Sharing** – Share your plans via link or in-app
* **Social** – Forum, guides, and shared resources

---

## 🐞 Known Issues

* Menus not closing when clicking outside
* No error when creating exercises/workouts without a name
* Text wrapping issues in goals/logs
* Some units displayed incorrectly due to migration
* Component layout issues on smaller screens

---

## 📋 To-Do List

**HP = High Priority | MP = Medium Priority | LP = Low Priority | QOL = Quality of Life**

* \[MP] Fix unit migration bugs
* \[HP] Require name when creating exercises/workouts
* \[QOL] Fix menu not closing when clicking outside
* \[QOL] Improve quick menu behavior
* \[QOL] Add default goal values (e.g. 100ml, 250ml)
* \[QOL] Add default exercise fields (e.g. reps, duration)
* \[MP] Style Hide Menu for Home modules
* \[LP] Enable dashboard reorder
* \[MP] Full app backup/export
* \[MP] Redesign Create Exercise layout
* \[MP] Improve Log Exercise UX
* \[QOL] Add Help page
* \[MP] Sync items with API
* \[MP] Finish Light Theme
* \[HP] Sync local and online accounts:

  1. Prompt user if there's a conflict
  2. Allow side-by-side comparison
  3. Let users merge or keep data separate
  4. Auto backup local exercises/workouts to the API

---

## 🚀 How to Run the App

For now, the app is still not ready. Once usable, this section will be updated.

---

## 🤝 Contributing

Contributions are welcome!

* Fork this repository
* Create a new branch
* Submit a pull request

---

## 📜 License

This project is licensed under the **MIT License**, which means you're free to use, modify, and distribute it as long as you provide attribution.

---

## 📬 Feedback

Have feedback or ideas?
Open an issue or reach out — let’s make **EasyFit** the best it can be!

---

Let me know if you want a **shorter version for employers**, or to **add badges, installation steps, or contribution guidelines**!
