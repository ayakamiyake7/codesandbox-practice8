import "./styles.css";
import { UserCard } from "./components/UserCard";
import axios from "axios";
import { User } from "./types/api/user";
import { UserProfile } from "./types/UserProfile";
import { useState } from "react";

const user = {
  id: 1,
  name: "Ayaka",
  email: "aaa@aaa.com",
  address: "London"
};

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onClickFetchUser = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.street}, ${user.address.suite}, ${user.address.city}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchUser}>Fetch</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>Data Fetch Failed. </p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
