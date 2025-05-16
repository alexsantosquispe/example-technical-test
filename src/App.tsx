import { useMemo, useState, type ChangeEvent } from "react";
import "./App.css";
import { SORT_BY, type SortBy, type User } from "./types";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";

function App() {
  const { users, isLoading, fetchNextPage, hasNextPage, refetch } = useUsers();

  const [showColors, setShowColors] = useState(false);
  const [sortBy, setSortby] = useState<SortBy>(SORT_BY.NONE);
  const [filterByCountry, setFilterByCountry] = useState("");

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
    //TODO: Implement logic to delete a user.
    // const filteredUsers = users.filter((user) => userId !== user.email);
    // setUsers(filteredUsers);
  };

  const resetInitialState = () => {
    refetch();
  };

  const onFilterByCountry = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterByCountry(value.toLowerCase());
  };

  const handleOnChangeSort = (sortByValue: SortBy) => {
    setSortby(sortByValue);
  };

  return (
    <div>
      <header>
        <h1>Technical Test</h1>
        <div className="header-content">
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
        </div>
      </header>
      <main>
        {!isLoading && users.length && (
          <UsersList
            users={sortedUsersByValue}
            showColors={showColors}
            onDeleteUser={deleteUser}
            currentSortBy={sortBy}
            handleOnChangeSort={handleOnChangeSort}
          />
        )}

        {isLoading && <span>Cargando usuarios...</span>}

        {!isLoading && users.length === 0 && <span>No hay usuarios</span>}

        {hasNextPage && (
          <button
            className="loadButton"
            onClick={() => {
              fetchNextPage();
            }}
          >
            Cargar más usuarios
          </button>
        )}
        {!hasNextPage && <span>No hay mas resultados</span>}
      </main>
    </div>
  );
}

export default App;
