import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-400
      "
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          bg-white
          border
          rounded-xl
          pl-11
          pr-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
};

export default SearchBar;
