# Fitness App (Work in Progress and open to name suggestions)  

Welcome to the **Fitness App**! 🚀  
This is a **React-based web application** designed to help users manage their fitness goals, track workouts, and monitor progress—all in one place. The app is currently a **work in progress**, but the goal is to create a simple, effective, and **free-to-use** alternative to the complicated and expensive fitness apps on the market.  

---

## 🎯 Purpose  
This app is designed to:  
- Showcase my **web development skills** in React and Redux.  
- Provide a **personal fitness tracking tool** for myself and anyone else who wants to use it.  
- Serve as a **free, open-source** alternative to paid fitness apps.  

---
## ℹ️ About the app

This fitness app is a React-based web application designed with modern web development tools and practices. It demonstrates the use of various libraries and frameworks to build a robust, scalable, and user-friendly application.

### Technologies Used
***React***: The core library for building the app's user interface.
***React Router***: Enables seamless navigation between pages and sections.
***Redux***: Manages the application's state efficiently, ensuring a predictable data flow.
***Redux Persist***: Preserves the state across browser sessions for a better user experience.
***IndexedDB***: Used for saving all items locally.
***UUID***: Generates unique identifiers for app components like goals, exercises, and logs.

## ✨ Features (Planned and Current)  

### ✅ Current Features   
- **Goal Tracking**: Track your fitness goals with an intuitive and clean interface.  
- **Activity Logs**: View your daily progress and logged exercises and workouts.
- **Nutrition Logs**: Log and manage your food and water intake.
- **Fast to use**: Forget about having to fill 10s of fields for just one log. Beside the name, everything else is optional (in most cases).
- **Works offline**: (STILL WORKING ON IT) Everything is saved locally so you won't need a constant internet connection to use it.
- **Free**: All the important features are free to use*
- **Perfectly Balanced**: It is neither too simple or too complicated. You can create custom equipment, fields, or tags, or just use the default ones.

## What can the app do

This is a pretty detailed summary of what the app can and can't do at the moment

### Manage exercises

Exercises can be viewed, created, edited, or deleted. There are only one required field, the name of the exercise, with the rest of them being optional or having a default items. This gives to the user the option to keep their entires either simple and clear, or more detailed. For creating an exercise, the following inputs can be specified:
- Name of the exercise
- Description
- Refference URL in care the user wants to have a link to a tutorial
- Difficulty
- Privacy of the exercise
- Notes regarding the exercise
- Duration in seconds, minutes, or hours, with the default being minutes
- Rest time between sets in seconds, minutes, hours, with the default being seconds
- Fields, containing a name, a target value, and a unit
- Tags, containing a name and a color
- Equipment used with that exercise
- Target muscle groups worked by it
- Instructions
All exercises can be found inside the Library page, and are saved locally using IndexedDB (idb). They can be exported into a JSON file as a back-up or if the user wants to migrate its exercises, and new exercises can be imported if they match the correct format. The Explore page is similar to the library page, except that it is fetching public exercises from my fitness API, either a fresh and updated list, or a cached one if there is any cached exercise.
The View exercise screen shows all details about a certain exercise and allows the user to either delete or edit the exercise, only if they are viewing the local version of the exericise or if they are the author of the online one.

### Manage Workouts

Similar to exercises, creating the workout allows the user to use either just a name, or a more detailed set of inputs depending of the complexity wanted. There are the following inputs:
- Name of the workout
- Description
- Duration in minutes
- Difficulty of the workout
- Reference URL
- Notes
- Tags
- Equipment
- Targeted muscles
- Phases
The workout will be split in phases, with two of them by default ("Warm-up" and "Workout"). I decided to go with this approach to allow users create a full workout easily. Usualy a workout will have a warm-up, workout, and cool-down period, so I found it useful to allow them to have multiple phases. The user can create, edit, or remove phases as needed, but at least one is required. When an exercise is added to the phase, a dropdown for the number of set for that exercise is visible. For now it is limited to a minimum of 1 set and a maximum of 10 sets, since I found it unusual to have more than 10 sets of an exercise and to keep it safe.
The View Workout page is very similar to the View Exercise page, except that instead of having instructions, there is a list of exercises, grouped by phases. Same goes for the Explore workouts and Workouts Library. Workouts are saved and cached the same as exercises, have the same authorization for modifying the workout, and can be exported/imported easily in a JSON file. When a workout is created, a copy of all exercises are saved into the workout object instead of ids to make sure unintentional edits of exercises will break them. There will be an update button so that the user can still get the updated version if it wants that.

## Goals

Another core functionailty of this app is the abiltiy to easily track goals. The system is simple and doesn't require much input, making it quick and easy to use, removing the need to complete tens of fields for just one entry. Goals can be created from Menu > Goals > New Goal. All goals must have a name, a color (white by default), and an icon (a dumbbell by default). There are three ways that a goal can be tracked:
- By setting a target value (great for goals with multiple logs, like steps, sleep, running distance, etc)
- By logging one value per day (great for tracking progress like weight)
- Or by answering with Yes or No (like tracking if you consumed alcohol, did proper warm-up, etc)
Goals are by default shown on the Home page and there is a different visual representation for each type of them. For goals with only one value per day, the app will ask the user if they want to override the previous answer if they try to log again, making sure there aren't multiple values.
![Goals](https://i.imgur.com/MV4nLAB.png);

All goals can be found in Menu > Goals in a simple list, and each of it can be clicked to see a page dedicated to each goal. On that page there will be a preview of the goal, a summary of the last three days, and today's logs, where the goal can also be edited or deleted.
<p align="center">
  <img src="https://i.imgur.com/sw56al7.png" alt="Screenshot 1" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/3A8qmwz.png" alt="Screenshot 2" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/TBhhyQb.png" alt="Screenshot 3" width="30%" />
</p>

### Logs
Logs are another core functionality of the app. The user can create a log by pressing the big orange Plus button from the nav where it will be prompted with three types of logs:

#### Food logs
As the name suggests, it is meant to be used for all kind of foods and drink, for those who want to track daily nutrition.
This types of logs contains a name, quantity, unit, type of the food, time, macros (calories, protein, carbs, fats, sugar, sodium) and notes. Those logs are used the nutrition module from the Home/Dashboar screen and will be used for more tracking in the future. The Food Log screen has the Log form and a toggle to see a history of today's logs, where the log can be viewed with all its values.

#### Activity Log
If the user wants to log some kind of activity that is not an exercise or a workout, then it can use this log by specifying the name of the activity, the time of it, duration, sets, target muscles, and fields, where the user can create as many custom fields as it wants. I've given more freedom here since who knows what the user might want to log. I plan on allowing the user to also add tags and equipment and simplify the screen more.

#### Goal Log

As explained earlier, there are three different ways to track a goal. The Target goal accepts multiple logs in a day, with the other two accepting only one, overriding the old one with the new one if the user wants to (they are prompted if they want to). After logging, the user is redirected to the page for viewing that log.

All logs can also be seen in the Activity page, where past days can also be seen. In the future there will be some useful insights and summaries based on all logs. For now only a list of the logs and the logs itself can be seen.

## Complete Workouts

To make tracking workouts easier, I created a Workout page which allows the user to record workout progress while doing the workout. I tried to keep the UI as simple as possible while keeping useful stuff visible or with easy access. On the screen there will be a timer, a progress bar, buttons to add new sets to the current exercise and a button to see the list of exercises from that workout. In the center is the list of sets for that exercise. There will be dinamically rendered multiple sections based on the number of sets. Each section/set will have the number of the set and a checkbox at the top, followed by the exercise fields, which can be completed with a custom value, or automatically set to the target value by checking the box, and at the bottom are two buttons, one for skipping the set, and one for starting/pausing the set timer. The timer is meant to track how much time is spent on a set and it will start automatically (in a future update). If all fields of a set are completed, the next set is selected automatically. Same happens if the skip button is pressed. If there are no more sets in the current exercise, it will go to the next exercise, until the workout is done. When no more sets/exercises remains, the workout will end.
To make sure the user won't lose progress accidentally, a snapshot is taken at each interaction (skipping, changing a value, etc). In case the user moves to another screen, a prompt will be shown on the home screen to resume the workout or delete the snapshot. The same features are used with individual exercises.

<p align="center">
  <img src="https://i.imgur.com/3b83lwW.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/97F7hve.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/QHbeIB3.png" alt="Screenshot 6" width="30%" />
</p>

## Other Screenshots
<p align="center">
  <img src="https://i.imgur.com/in8hPaq.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/QePwq0u.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/mAZ4oNG.png" alt="Screenshot 6" width="30%" />
</p>
<p align="center">
  <img src="https://i.imgur.com/yejnWmI.png" alt="Screenshot 4" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/ndy01qR.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/KpvG5x4.png" alt="Screenshot 5" width="30%" style="margin-right: 10px;" />
  <img src="https://i.imgur.com/6zP02m2.png" alt="Screenshot 6" width="30%" />
</p>
### Filter and Search workouts and exercises
Filter workouts and exercises by a search query, or by having multiple filters, such as Order, Difficulty, tags, targeted muscles, equipment used, and the maximum duration of them.

### 🔜 Upcoming Features
- **Food Databse**: A default database of most common foods to make logging and planning meals easier
- **Meal Plans**: Allow the users to import Meal Plans created through the API Portal. Keep track of meals and log them easily
- **Activity Plans**: Just like Meal Plans, the user will be able to plan a week worth of activites and track them easy
- **Online Database of Exercises/Workouts**: An online database of handpicked workouts and exercises for all types of goals
- **Share Workouts and Exercises**: An option to let you share your workouts and exercises with a simple link or through the app
- **Social**: A forum, curated and user-made guides, and public workout and meal plans to allow users to cooperate and grow together

---

### Known issues
- Some menus/screens are not closing when clicking outside of them or when changing the screen from the nav menu
- No errors shown when creating an exercise/workout with no name
- Some text is not displaying on one line for goals and logs
- Some units are not showing correctly as text because I am in the process of changing them from simple strings to objects
- Some position issues for smaller components

### TO-DO
HP - High Priority | MP - Medium Priority | LP - Low Priority | QOL - Quality of Life
- [MP] Fix issues caused by updating units from strings to objects
- [HP] Make name a requirement in creating exercises and workouts
- [QOL] Fix Menu not closing when clicking outside of it or on another nav button
- [QOL] Close the quick menu when clicking outside the small zone with the three log buttons
- [QOL] Add default values for goals (ex: have default values of 100ml, 250ml, 500ml as quick add buttons when logging water)
- [QOL] Add default fields for exercises (avoid having to create common fields such as "Repetitions" or "Duration" for multiple exercises)
- [MP] Fix Hide menu for Home modules not being styled
- [LP] Allow reorder when editing the dashboard
- [MP] Add a Full app back-up to save all data created by the used in one file
- [MP] Update Create Exercise to use a layout similar to Create Workout
- [MP] Update Log Exercise to include tags and equipment, while simplyfing the interface
- [QOL] Make a Help page with a manual, contact info, etc
- [MP] Add buttons to sync certain items with the API
- [MP] Finish Light Theme
- [HP] Make sure the local account can be synced with the API one:
  1.  Add a prompt to inform the user that there are conflicts with the API account and the local account that is shown only if the user already has an API account.
  2.  Let the user decide which version of the data to keep for individual choices by comparing each value and letting the user pick which one to keep
  3.  Give the user the option to keep its libraries separate (the local one being available only local, while the online one being available only one) or to import all online exercises and workouts to the offline library (or even give them a list to pick which one to import)
  4.  Make a function that will automatically back-up local exercises and workouts to the online account while keeping them separate from the workouts/exercises created by the user through the API Portal

This app is a work in progress and is built to showcase modern web development practices while serving as a functional fitness tracker. The project is open-source and welcomes contributions to enhance its features and functionality.

## 🚀 How to Run the App  

For now, the app is still not ready. As soon as it gets to a state where it can be used, I will update this section

## 🤝 Contributing

Contributions are welcome! If you have suggestions, ideas, or bug fixes, feel free to:

Fork this repository.
Create a new branch.
Submit a pull request. 

## 📜 License

This project is licensed under the MIT License, which means you’re free to use, modify, and distribute it as long as you provide attribution.

## 📬 Feedback

If you have feedback or feature requests, please open an issue or reach out directly. Let’s make this app the best it can be!


