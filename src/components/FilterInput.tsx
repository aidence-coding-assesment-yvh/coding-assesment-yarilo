import "./FilterInput.css";

type FilterInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterInput = ({ onChange }: FilterInputProps) => (
  <div className="filter-input">
    <label htmlFor="filter">Filter users</label>
    <input
      type="search"
      id="filter-user"
      name="fiilter-user"
      placeholder="Type name or email..."
      onChange={onChange}
    />
  </div>
);

export default FilterInput;
