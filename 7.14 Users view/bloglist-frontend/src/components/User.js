import React from "react";
import { useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";

function User() {
  const id = useParams().id;

  const userBlogs = useSelector((state) => {
    return state.blogs.filter((blogObj) => blogObj.user.id === id);
  });

  console.log("userBlogs", userBlogs[0].id);

  return (
    <div>
      <h2>Arto Hellas</h2>
      <br />
      <h4>added blogs</h4>
      <ul>
        {userBlogs.map((val) => (
          <li key={val.id}>{val.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
