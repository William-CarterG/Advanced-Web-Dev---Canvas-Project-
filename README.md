# Advanced Web Development - Evaluations Project
# Overview

We developed a web project for conducting evaluations. To do so, we created three frontend apps:
- A CRUD app for the teachers, to make different type of operations on the evaluations.
- An Mobile app that allows students to answer evaluations from their phones.
- A Dashboard app that showcases statistics about the results of evaluations.

All of them were created using SPA (Single-Page Application) design over a React-Parecl framework. 
For the backend, we created a Django REST Framework back that is shared to all the frontend apps, and that is lcoated in a different remote repository.
## Evaluations

The project allows the creation of evaluations, which are sets of questions (tests) answered by groups of people. Evaluators can create tests and use them with different groups of people. The groups consist of individuals identified by their name, surname, and email address.

When an evaluation is created, each person in the group receives a unique link via email to participate in the evaluation. No login is required for respondents.

## Types of Questions

The application supports various types of questions for the tests:

1. True or False
2. Multiple Choice (2 to 6 options)
3. Semi-open-ended (e.g., choosing a country from a large list of previously defined options)
4. Numeric (decimal support)
5. Matrix (multiple questions sharing the same set of options)

Each question must have a correct answer.

## Question Characteristics

Questions have the following characteristics:

- Difficulty level: low, medium, high
- User-defined tags for categorization (with autocomplete support)

## Implementation

The backend of the application should be implemented by you. You can use your preferred framework. It should follow the REST API architecture and use JSON for data exchange. JSON Web Token (JWT) authentication should be used.

You should create three independent frontend applications using React:

1. CRUD Application: Handles the creation, updating, and deletion of different components. Designed for desktop use.
2. Responder Application: Allows respondents to answer evaluations. Designed for mobile devices.
3. Dashboards Application: Provides visualizations and insights into evaluation states. Accessible only to users with the "Visualizador" role. Designed for both desktop and mobile devices.

All three frontend applications should use Sass and TypeScript. They should be based on the Single-Page Application (SPA) architecture. The backend should be common for all three applications.

For detailed information on each application, please refer to the original PDF document.


## Acknowledgements

This was a project developed by a team of three students as a part of the Advanced Web Development class at Universidad de los Andes. The collaborators are:
- [Camila Pizarro](https://github.com/cppizarro): For the backend development over Django.
- [Javier Muñoz](https://github.com/JaMunioz): Developed the Mobile & Dashboard apps, while also collaborating at times in the CRUD application. 

