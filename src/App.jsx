import axios from "axios";
import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

const API_URL = "https://testing-api-mys0.onrender.com/api/users";

const App = () => {
  const [cookie, setCookie] = React.useState(null);

  const handleLogin = async (values) => {
    const { email, password } = values;
    console.log("Login attempt with:", email, password);

    // Store the token in a cookie if login is successful
      // Cookies.set("token", "response.data.token");
      // setCookie("response.data.token"); // Update state to display the token
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Response data:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setCookie(null); // Clear token from the state as well
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setCookie(token);
  }, []); // Only run on initial render to check for an existing token

  return (
    <div>
      <h1>{cookie ? `Logged in with token: ${cookie}` : "Not logged in"}</h1>
      {cookie && <button onClick={handleLogout}>Logout</button>}
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
            <button type="submit">Login</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
