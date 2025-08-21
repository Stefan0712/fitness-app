 ---

# EasyFit (Work in Progress and Open to Name Suggestions)

Welcome to **EasyFit**! 🚀
This is a **React-based web application** designed to help users manage their fitness goals, track workouts, and monitor progress—all in one place. The app is currently a **work in progress**, but the goal is to create a simple, effective, and **free-to-use** alternative to the complicated and expensive fitness apps on the market.

---
## 📖 Table of Contents
- [Purpose](#-purpose)
- [About the App](#️-about-the-app)
- [Features](#-features)
- [What Can the App Do](#-what-can-the-app-do)
- [Workouts](#-manage-workouts)
- [Exercises](#-manage-exercises)
- [Goals](#-goals)
- [Logs](#-logs)
- [Complete Workouts](#-complete-workouts)
- [Other Screenshots](#-other-screenshots)
- [Filter and Search](#-filter-and-search)
- [Upcoming Features](#-upcoming-features)
- [Known Issues](#-known-issues)
- [To-Do List](#-to-do-list)
- [Latest Updates](#latest-updates)
- [How to Run the App](#-how-to-run-the-app)
- [Contributing](#-contributing)
- [Feedback](#-feedback)

## 🎯 Purpose

This app is designed to:

* Showcase my **web development skills** in React
* Provide a **personal fitness tracking tool** for myself and anyone else who wants to use it
* Serve as a **free** alternative to paid fitness apps

---

## ℹ️ About the App

EasyFit is your best option at keeping track of your fitness progress, be it activities, nutrition, or goals. With a simple interface that gives you the freedom to customize your experience, you can choose to keep either a detailed or minimal record of your progress. Say goodbye to wasting time logging your breakfast, figuring out how the app works, or being hit in the face all the time with prompts asking you to buy a subscription or to pay once to get rid of ads.

### Technologies Used

* **React** – The core library for building the app's user interface
* **React Router** – Enables seamless navigation between pages and sections
* **Redux** – Manages the application's state efficiently, ensuring a predictable data flow
* **Redux Persist** – Preserves the state across browser sessions for a better user experience
* **IndexedDB** – Used for saving all items locally
* **UUID** and **bson-objectid** – Generates unique identifiers for app components like goals, exercises, and logs
* **Axios** - Handling API requests
* **NoSleepJs** - For the Keep Screen Awake feature
* **TypeScript** - For keeping the code clean and safe

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

Please keep in mind that the app is still work in progress. That said, some features may still change, contain bugs, or be non-functional, but I will update this ReadME as often as possible.

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

Workouts are split into **phases** (with “Warm-up” and “Workout” being the default phases) to allow users to build full sessions. Users can add/edit/remove phases (with at least one required). Exercises are added to phases, with a dropdown to choose number of sets (1–10). Each exercise can be added multiple times to the same phase and workout.

The **View Workout** page resembles the View Exercise page, with exercises grouped by phase. Workouts are saved and cached like exercises, follow the same rules for editing/deleting, and can be exported/imported via JSON.

When a workout is created, a **copy of all exercises** is saved into the workout instead of IDs to prevent accidental breaking due to external changes. An update button allows syncing to the latest versions if desired.

---

## 🎯 Goals

Another core functionality of this app is the ability to **easily track goals**. The system is simple and doesn’t require much input, making it fast and effective.

Goals can be created from:
`Menu > Goals > New Goal`

Each goal requires a name, a color (default: white), and an icon (default: dumbbell). There are three types of goals, each with a different way of tracking progress:

* **Target goals** where you set a target and a unit. This type of goal supports multiple logs and it tracks progress by summing up the value of each log. You can also have up to 5 default values for easier logging (e.g. steps, distance, sleep, etc.)
* **Number goals** where you have a value and a unit. It accepts only one log per day and tracks progress by comparing the value to the past days (e.g. weight)
* **Boolean goals** where you can answer only with Yes or No. It also accepts only one log per day like the number goals (e.g. keeping track if you smoked today)

Goals appear on the **Home page**, with different visuals depending on type. The *target goal* will have your current progress out of the target value and a progress bar. The *number goal* displays today’s logged value (if available), and an arrow showing whether it's higher, lower, or the same as the previous one. And the *boolean goal* will have three icons representing the last three days. If you logged "Yes" there will be a checkmark, "No" will have an "X", and there will be a "-" if there is no goal. 

For those goals with only one log per day, there will be a prompt if the user tries to log another one for the same day, telling them that the other log will be replaced by the new log if they continue, avoiding having multiple ones.

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
* **Activity Plans** – Schedule weekly activities
* **Online Exercise & Workout Database**
* **Sharing** – Share your plans via link or in-app
* **Social** – Forum, guides, and shared resources

---

## 🐞 Known Issues

* Component layout issues on smaller screens
* Completing the last field of a set when doing a workout will show that it is completed for a moment and then revert back and only working when completing the second time

---

## 📋 To-Do List

These are just some of the current tasks I'm working on. Larger or less urgent tasks are not included here. 
**HP = High Priority | MP = Medium Priority | LP = Low Priority | QOL = Quality of Life**

* ~~\[HP] Require name when creating exercises/workouts~~
* ~~\[QOL] Fix menu not closing when clicking outside~~
* \[QOL] Improve quick menu behavior
* ~~\[QOL] Add default goal values (e.g. 100ml, 250ml)~~
* \[QOL] Add default exercise fields (e.g. reps, duration)
* ~~\[MP] Style Hide Menu for Home modules~~
* \[LP] Enable dashboard reorder
* \[MP] Full app backup/export
* \[MP] Redesign Create Exercise layout
* ~~\[MP] Improve Log Exercise UX~~
* \[QOL] Add Help page
* \[MP] Sync items with API
* \[MP] Finish Light Theme
* \[HP] Sync local and online accounts:
  1. Prompt user if there's a conflict
  2. Allow side-by-side comparison
  3. Let users merge or keep data separate
  4. Auto backup local exercises/workouts to the API
* \[MP] Rework View Log screens in Activity page
* \[MP] Rework Default Fields page
* \[MP] Rework Equipments page
* \[MP] Rework Tags page
* \[HP] Add blurred background to menus, submenus, and other components to help keep a hierarchy of elements when multiple of them are open at the same time
* \[MP] Create settings for hiding/showing nutrition and activity modules in dashboard
* \[MP] Create a dedicated page for food related features (food logs, meal planning, etc), and activity related features (activity, exercises, and workout logs, workout plants, etc)
* \[LP] Convert all SVGs to jsx components to make easier to change their colors and other properties
* \[MP] Rework Library
* \[MP] Rework View Workout
* \[MP] Rework View Exercise

---

## Latest Updates

### 18 August 2025
* Created separate library screens for workouts and exercises
* Added a Library Menu that shows up when the user taps on the Library button from the nagivation, allowing the user to go to "My Workouts", "My Exercises", or "Explore"
* Created a View Exercise and View Workout screens instead of the separate page used for viewing them.
* Minor fixes:
  - Fixed Unit button showing on top of other components
  - Fixed View Workout and View Exercises not behaving correctly when the content was overflowing
  - Fixed duration and rest not being converted correctly when going to the edit page
  - Fixed View Exercise and View Workout not closing after deleting 
  - Fixed Create Workout and Create Exercise having elements overflow on smaller screen instead of becoming scrollable
  - Fixed exercises and workouts from their libraries not being scrollable when there were multiple of them
  - Fixed Edit Exercise page having the wrong title and button text
  - Fixed added Values from Create Exercise having a small container making them scrollable even though there being enough space for them to show multiple items at once
* Gallery:
<p align="center">
  <img src="https://i.imgur.com/ekSg2Cg.png" alt="Screenshot 4" width="25%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/gBcw00l.png" alt="Screenshot 5" width="25%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/8MYhNyb.png" alt="Screenshot 6" width="25%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/o6fyN20.png" alt="Screenshot 6" width="25%" />
</p>

### 03 August 2025
* Created a new tsconfig and global.d.ts and fixed all important typescript errors.
* Fixed multiple small issues found during the purse of typescript errors. Created new interfaces and updated old ones.
* Updated the Fields page with a new pop-up form for new custom fields and a simpler list of existing fields. Updated the userSlide to handle custom fields. Created an updateCustomFields reducer to handle creating, editing, and deleting of custom fields.
* Added some checks before accessing fieldData in the New Custom Field form preventing it crashing.
* Updated FieldsScreen to take default fields from the redux store and added useSelectors in components where FieldsScreen is used.
* Updated Activity Log component:
  * Changed the title from Log Exercise to Log Activity to be more general
  * Removed Sets input since it can be added as a custom field or value and it is not used by all activities
  * Moved Activity Name, Duration, and Time on the same row making the component more compact
  * Added custom fields right before Recorded values to allow used to quickly add custom fields
  * Changed the max height of FieldsScreen and changed display from flex to grid for more control
* Created a new View Activity Log component
* Added transparent background for Activity and Food log components to prevent users from clicking outside elements by accident
* Updated Create Goal component with the new pop-up for adding custom values and the Pin to dashboard dropdown
* Created a larger version of Goal trackers found in the Dashboard page for each type of goal showing the past 5 days, including the current day:
  * Target Goals will have a progress circle for each day with either a checkmark inside if the target was met or just the percentage if not
  * Number Goals will have a vertical bar showing how big is that value compared to the biggest one recorded in those past 5 days
  * Boolean Goals will have the same icons as the Small Goal except that now there are 5 of them and it shows the date
  * Updated the 'Pin to dashboard?' dropdown from Create Goal and Edit Goal to let the user pick between hiding the goal or showing the large version or the small version
  * Updated the dashboard page to show the correct goal module size
* Gallery:
<p align="center">
  <img src="https://i.imgur.com/MupJ8Qi.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/okKFaEh.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/ArNdGAh.png" alt="Screenshot 6" width="30%" />
</p>




### 26 July 2025
* Converted all icons from the Icon List available when creating goals from .svg to .jsx components that accepts props such as fill color, width, height, etc.
* Updated the icons.js from an array of just SVGs to objects containing an id, a name, and the SVG component.
* Updated Goal list, Goals page, View Goal, Edit Goal, Create Goal, Dashboard Goal Module to use the new icon format.
* Added more comments to help others understand the code
* Improved the Goal Module from the Dashboard (picture 1):
  - Removed everything related to "edit-mode" that was used when editing the Dashboard layout. 
  - Changed the text and icon color based on the goal color.
  - Changed the background color of the progress bar to the app background color.
  - Added a hide button to quickly hide it from the dashboard.
  - Increased the border-radius to match the other modules from the Dashboard
* Improved Target Log Form component (picture 2 and 3):
  - Added a dropdown to change if the goal is shown on the dashboard or not
  - Removed the old edit of custom values, where the user had to click on them to change them from p elements to text inputs and then save them, to a better and cleaner way.
  - Created a new small form for new Custom Values. If the user clicks on an already created custom value, this form will open with that value already in the text input that will allow to update it.
  - Made the icon inside the progress bar smaller and moved the progress percentage inside the circle, right under the icon. Added goal's color to the current goal progress value.
  - Switched the position of the bottom buttons (close and log) to make it easier to press Log and harder to press Close by accident. Decreased the height from 50px to 40px to match the other inputs.
* Smaller UI improvements:
  - Moved the Explore more and New Workout buttons outside the container with all the workouts and exercises, making them visible at all time.
  - Added a small padding to the left of custom value in Target Goal form
  - Added a small one line text with the current app version and the date of the update to help keep track of which version is live
* Gallery:
<p align="center">
  <img src="https://i.imgur.com/EWE9779.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/mDOpmsA.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/kMcfNZz.png" alt="Screenshot 6" width="30%" />
</p>



### 19 July 2025

* Fixed set timer not starting automatically when switching a new set and not stopping when the set was completed
* Removed the auto-advance to the next exercise feature for now and the auto-finish workout in case the user might want to add new exercises or sets
* Added a progress circle and the goal icon to the Target Goal screen
* Added a preview of the current progress for each Goal in the Goals page. The target goal has a progress bar, while the other two have a text with today's logged value (e.g. "500 ml water recorded at 12:30")
* Added a Reset button to View Log which will delete all logs for that Goal from the current day. 
* Created a function inside db.js to remove all logs for a certain goal and another one for removing all logs of a certain goal for a specified date
* Created separate Log Goal Form components for each type of goal
* Added Equipment and Tags for Activity logs
* Added custom default values for Target Goals
* Small UI improvements: 
  - A back button from View Goal 
  - Quick menu will close if you click outside the three button on the bottom right
  - Closing a Goal Log form will also close the quick menu
  - Added stylings to the small menu used for hiding Nutrition and Activity modules
  - Improved the layout of Activity Log by using the same three button layout for tags, target muscles, and equipment used in Create Workout
  - In the Target Goal Log: Moved Name right before Description, placed Value input on the same line as default values, removed labels, placed Date and Time on the same row, changed component height to auto
* Code improvements:
  - Removed unused components and files
  - Replaced old instances of "unit" when it was just a string with the next "unit" object
  - Added fallbacks for not existing units in Activity page
  - Removed some unused imports
  - Added a check to make sure that name is at least three characters long when creating an exercise or a workout
* Discovered bugs:
  - Completing the last field of a set when doing a workout will show that it is completed for a moment and then revert back and only working when completing the second time.
* Gallery: 
<p align="center">
  <img src="https://i.imgur.com/VrHPYXF.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/N6LbmEA.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/BbDlf8s.png" alt="Screenshot 6" width="30%" />
</p>





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
