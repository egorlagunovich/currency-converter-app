import React from "react";

export default function CurrencyRow(props) {
  return (
    <div className="flex flex-row items-center justify-center mb-7 rounded-xl md:text-lg text-md">
      <div>
        <input
          type="number"
          className="p-2 border-none focus:outline-none  rounded-l-xl"
          min="0"
          value={props.amount}
          onChange={props.onChangeAmount}
        />
      </div>
      <div>
        <select
          className="block w-full p-2 dark:bg-gray-700 dark:text-white 
          rounded-r-xl
          focus:outline-none"
          value={props.selectedCurrency}
          onChange={props.onChangeCurrency}
        >
          {props.currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
