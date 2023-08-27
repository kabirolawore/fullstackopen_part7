import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => a.likes - b.likes),
  );
  // console.log(blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    border: "solid",
    borderWidth: 1,
    color: "green",
    marginBottom: 5,
  };

  return (
    <>
      <div>
        <BlogForm />
      </div>
      <br />
      <div>
        {blogs?.map((blog) => (
          <div style={blogStyle} className=".pl-5" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
