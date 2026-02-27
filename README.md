# Lock In 

Won second place at the West University of Timişoara (UVT) prototype fair.

Tourists of Timișoara, have you ever had the burden of carrying your bags around with you when you arrive in the city until you can check in to your hotel/airbnb? Well this is the solution for you!

## Project Description
Lock In is a full-stack mobile application designed to manage a conceptual locker storage network in Timişoara. The project aims to provide tourists with an accessible way to store their belongings while exploring the city. 

The application was built using a Java + Spring Boot backend with a React Native frontend. It includes custom visual elements, designed to create a cosy and welcoming user experience.

## Functionalities
* **Interactive Map:** Enables users to browse locker locations within Timişoara and view real-time availability updates.
* **Locker Reservation:** Allows users to select and reserve specific lockers through the mobile app.
* **User Account Management:** Provides a secure system for tourists to create accounts and manage their profiles.
* **Admin Panel:** A dedicated interface for admins to manage the locker network and reservations.
* **Secure Backend Operations:** Utilizes a REST API with Spring Boot and JPA to handle authentication and secure database communication.
* **Data Persistence:** Uses a PostgreSQL database for data storage.

## Technical Stack
* **Languages:** Java, SQL, JavaScript.
* **Frameworks:** Spring Boot, React Native, Expo, JPA.
* **Database:** PostgreSQL.
* **Design:** UI/UX Design, Pixel Art.

## Installation and Setup
To download and continue the development of the application, follow these steps:

### 1. Cloning the Repository
Clone the project to your local machine using the following link:
`https://github.com/ilincabitir/Lock-In`

### 2. Frontend Configuration
* Navigate to the frontend folder in your terminal.
* Install Expo CLI: `npm install -g expo-cli`
* Install project dependencies: `npm install`

### 3. Database Setup
* Open pgAdmin 4 and create a new database named `lock_in`.
* Restore the database using the `database_setup.sql` file provided in the repository.

### 4. Starting the Application
* **Backend:** Start the backend by running the main class in your Java IDE.
* **Emulator:** Launch the Android emulator from Android Studio.
* **Mobile App:** Start React Native by running `npx expo start` in your terminal.
* **Execution:** Press `a` in the terminal to open the app on the Android emulator.
