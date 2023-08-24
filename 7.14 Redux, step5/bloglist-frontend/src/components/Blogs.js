import { useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => a.likes - b.likes),
  );

  return (
    <>
      <div>
        <BlogForm />
      </div>
      <br />
      <div>
        {blogs?.map((blog) => (
          <div key={blog.id}>
            <Blog blog={blog} user={user?.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
