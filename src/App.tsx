import "./styles.css";
import { UserCard } from "./components/UserCard";
import { UseAllUsers } from "./hooks/UseAllUsers";

export default function App() {
  const { getUsers, userProfiles, loading, error } = UseAllUsers();

  const onClickFetchUser = () => getUsers();
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
