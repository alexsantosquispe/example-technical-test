import { SORT_BY, type SortBy, type User } from "../types";

interface UserListProps {
  users: User[];
  showColors: boolean;
  onDeleteUser: (userId: string) => void;
  currentSortBy: SortBy;
  handleOnChangeSort: (sortByValue: SortBy) => void;
}

export const UsersList = ({
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
          <tr key={user.email}>
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
