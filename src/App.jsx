import axios from "axios";
import { Formik } from "formik";
import React from "react";

const API_URL = "http://localhost:5000/api/users";

const App = () => {
  const handleLogin = async (values) => {
    const { email, password } = values;
    console.log(email, password);

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response;
      console.log("data:", data);
    } catch (error) {
      if (error.response) {
        // The server responded with a status other than 2xx
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
      } else {
        // Network error or request not sent
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div>
      {/* login form */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
