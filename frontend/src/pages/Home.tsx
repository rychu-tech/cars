import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="my-4">
        <h1 className="text-3xl font-bold text-center">Welcome to the Car Management System</h1>
        <p className="text-center mt-2 text-gray-700">This project is my basic portfolio project for full stack positions. Please note, that this is still a work in progress as I develop it in my free time.</p>
      </header>
      
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          The Car Management System is designed to help car dealership manage their car inventory with ease. 
          This system allows users to add, edit, view and delete car records, as well as generate reports in Excel format.
        </p>
      </section>
      
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside">
          <li>Add new car records with detailed information.</li>
          <li>Edit existing car records to keep information up to date.</li>
          <li>View detailed information about each car.</li>
          <li>Soft delete cars that are no longer in the inventory.</li>
          <li>Restore deleted cars if needed.</li>
          <li>Generate and download car inventory reports in Excel format.</li>
          <li>Track car modification history. (In Progress)</li>
          <li>View car statistics in dashboard page. (To Do)</li>
          <li>Manage dealer users and add roles. (To Do)</li>
        </ul>
        Additional suggestions are welcome :)
      </section>
      
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
        <p>
          This project leverages the following technologies:
        </p>
        <ul className="list-disc list-inside">
          <li>React: For building the user interface.</li>
          <li>Redux: For state management.</li>
          <li>Redux Toolkit: For simplifying Redux setup and usage.</li>
          <li>Material-UI: For stylish and responsive UI components.</li>
          <li>React-Toastify: For displaying notifications.</li>
          <li>Axios: For making HTTP requests.</li>
          <li>FileSaver.js: For saving files on the client-side.</li>
          <li>Spring Boot: For building the backend application.</li>
          <li>Spring Data JPA: For data persistence.</li>
          <li>PostgreSQL: As the database.</li>
          <li>Apache POI: For generating Excel reports.</li>
          <li>Spring Security: For securing the application.</li>
          <li>Java JWT: For handling JSON Web Tokens.</li>
          <li>Java Dotenv: For managing environment variables.</li>
        </ul>
      </section>
      
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
        <p>
          Wanna run this project locally? Follow instructions on 
          <a href="https://github.com/rychu-tech/cars" className="text-blue-500 underline ml-1" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>
      </section>
      
      <footer className="my-8 text-center">
        <p>&copy; 2024 Ryszard Dotka</p>
      </footer>
    </div>
  );
}

export default Home;
