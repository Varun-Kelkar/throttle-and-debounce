import { useEffect, useState, useRef } from "react";
import { debounce } from "./utilities/debounce";
import { throttle } from "./utilities/throttle";
import "./index.css";
import "./App.css";
export default function App() {
  const [users, setUsers] = useState([]);
  const [usersClone, setUsersClone] = useState([]);

  const newUserRef = useRef("");
  const loadUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonResponse = await response.json();
      setUsers(jsonResponse);
      setUsersClone(jsonResponse);
    } catch (error) {
      console.error("Error Description -> ", error);
    }
  };

  const createNewUser = async (username) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          body: JSON.stringify({
            name: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const jsonResponse = await response.json();
      users.push(jsonResponse);
      setUsers([...users]);
      setUsersClone(users);
    } catch (error) {
      console.error("Error Description -> ", error);
    }
  };

  const debouncedSearch = debounce((event) => {
    if (!event.target.value) {
      setUsers(usersClone);
      return;
    }
    const searchResults = users.filter((user) =>
      user.name.includes(event.target.value)
    );
    if (searchResults.length > 0) {
      setUsers(searchResults);
    }
  }, 1000);

  const throttledAddUser = throttle(() => {
    createNewUser(newUserRef.current.value);
    newUserRef.current.value = "";
  }, 3000);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="app">
      <h1>Debounce & Throttle</h1>

      <div className="input-group">
        <input
          className="input search-input"
          type="search"
          onInput={debouncedSearch}
          placeholder="Start typing to see results..."
        />
      </div>

      <div className="results">
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={`${user.id}-${index}`}>{user.name}</li>
          ))}
        </ul>
      </div>

      <div className="input-group">
        <input
          className="input"
          type="text"
          ref={newUserRef}
          placeholder="Enter name..."
        />
        <button className="btn" onClick={throttledAddUser}>
          Add
        </button>
      </div>
    </div>
  );
}
