import React from "react";

export default function CurrencyRow() {
  
  return (
      <div className="flex flex-row items-center justify-center mb-7 rounded-xl md:text-lg text-md">
        <div>
          <input
            type="number"
            className="p-2 border-none focus:outline-none  rounded-l-xl"
            min="0"
          />
        </div>
        <div>
          <select
            className="block w-full p-2 dark:bg-gray-700 dark:text-white 
          rounded-r-xl
          focus:outline-none"
          >
            <option selected>Choose a currency</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
  );
}
