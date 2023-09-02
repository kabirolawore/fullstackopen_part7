import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function Users() {
  const users = useSelector((state) => {
    const newState = [...state.blogs].map((val) => val.user);

    const userObj = Object.values(
      newState.reduce((acc, user) => {
        if (!acc[user.username]) {
          acc[user.username] = {
            name: user.name,
            count: 1,
            id: user.id,
          };
        } else {
          acc[user.username].count++;
        }
        return acc;
      }, {}),
    );

    return userObj;
  });

  // console.log("users", users);

  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
