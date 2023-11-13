export const SearchBar = ({ filter: { name, number }, onSearch }) => {
  return (
    <div>
      <input type="text" value={name} onChange={onSearch} />
    </div>
  );
};
