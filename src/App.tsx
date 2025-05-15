import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import "./App.css";
import { SORT_BY, type SortBy, type User, type UsersResponse } from "./types";

interface UserListProps {
  users: User[];
  showColors: boolean;
  onDeleteUser: (userId: string) => void;
  currentSortBy: SortBy;
  handleOnChangeSort: (sortByValue: SortBy) => void;
}

const UsersList = ({
  users,
  showColors,
  onDeleteUser,
  currentSortBy,
  handleOnChangeSort
}: UserListProps) => {
  const handleSortByValue = (columnValue: SortBy) => () => {
    const sortByValue =
      currentSortBy === columnValue ? SORT_BY.NONE : columnValue;
    handleOnChangeSort(sortByValue);
  };

  return (
    <table width={"100%"}>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            className="pointer"
            onClick={handleSortByValue(SORT_BY.FIRST_NAME)}
          >
            Nombre
          </th>
          <th
            className="pointer"
            onClick={handleSortByValue(SORT_BY.LAST_NAME)}
          >
            Apellido
          </th>
          <th className="pointer" onClick={handleSortByValue(SORT_BY.COUNTRY)}>
            Pais
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? "table--showColors" : ""}>
        {users.map((user) => (
          <tr key={user.login.uuid}>
            <td>
              <img src={user.picture.thumbnail} alt={user.name.first} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => onDeleteUser(user.login.uuid)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortBy, setSortby] = useState<SortBy>(SORT_BY.NONE);
  const [filterByCountry, setFilterByCountry] = useState("");
  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors((prev) => !prev);
  };

  const toggleSortbyCountry = () => {
    setSortby((prevValue) =>
      prevValue === SORT_BY.NONE ? SORT_BY.COUNTRY : SORT_BY.NONE
    );
  };

  const filteredUsers = useMemo(() => {
    return filterByCountry
      ? users.filter((user) =>
          user.location.country.toLocaleLowerCase().includes(filterByCountry)
        )
      : users;
  }, [filterByCountry, users]);

  const sortedUsersByValue = useMemo(() => {
    if (sortBy === SORT_BY.NONE) return filteredUsers;

    const sortByProps = {
      [SORT_BY.FIRST_NAME]: (user: User) => user.name.first,
      [SORT_BY.LAST_NAME]: (user: User) => user.name.last,
      [SORT_BY.COUNTRY]: (user: User) => user.location.country
    };

    return [...filteredUsers].sort((a, b) => {
      const valueA = sortByProps[sortBy](a);
      const valueB = sortByProps[sortBy](b);
      return valueA.localeCompare(valueB);
    });
  }, [sortBy, filteredUsers]);

  const deleteUser = (userId: string) => {
    const filteredUsers = users.filter((user) => userId !== user.login.uuid);
    setUsers(filteredUsers);
  };

  const resetInitialState = () => {
    setUsers(originalUsers.current);
  };

  const onFilterByCountry = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterByCountry(value.toLowerCase());
  };

  const handleOnChangeSort = (sortByValue: SortBy) => {
    setSortby(sortByValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const data: UsersResponse = await response.json();
      originalUsers.current = data.results;
      setUsers(data.results);
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <header>
        <button onClick={toggleColors}>Colorear Files</button>
        <button onClick={toggleSortbyCountry}>
          {sortBy === SORT_BY.COUNTRY
            ? "No ordenar por País"
            : "Ordenar por País"}
        </button>
        <button onClick={resetInitialState}>Restaurar estado inicial</button>
        <input
          type="text"
          placeholder="Filtrar por país"
          onChange={onFilterByCountry}
        />
      </header>
      <main>
        <UsersList
          users={sortedUsersByValue}
          showColors={showColors}
          onDeleteUser={deleteUser}
          currentSortBy={sortBy}
          handleOnChangeSort={handleOnChangeSort}
        />
      </main>
    </div>
  );
}

export default App;
