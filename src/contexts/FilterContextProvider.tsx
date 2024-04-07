import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Weather, WeatherContext } from "./WeatherContextProvider";

export const FilterDataContext = createContext({
  filteredData: [
    {
      id: "2074307",
      city: "Krakow",
      weatherIcon: "icon",
      temp: 1,
      tempP: 1,
      wind: 1,
    },
  ],
  filterCity: ["string", "string"],
  setFilterCity: (value: React.SetStateAction<string[]>) => console.log(value),
  filterTemp: [0, 20],
  setFilterTemp: (value: React.SetStateAction<number[]>) => console.log(value),
});

export default function FilterDataContextProvider({
  children,
}: PropsWithChildren) {
  const { weather } = useContext(WeatherContext);
  const [filterCity, setFilterCity] = useState(["A", "Ż"]);
  const [filterTemp, setFilterTemp] = useState([-50, 50]);

  function getUpper(value: string) {
    if (value != undefined) {
      return value.toUpperCase();
    } else {
      return "";
    }
  }

  const filteredData: Weather[] = weather
    .filter(
      (w: Weather) =>
        getUpper(w.city[0]) >= getUpper(filterCity[0]) &&
        getUpper(w.city[0]) <= getUpper(filterCity[1])
    )
    .filter((w: Weather) => w.temp >= filterTemp[0] && w.temp <= filterTemp[1]);

  return (
    <FilterDataContext.Provider
      value={{
        filteredData: filteredData,
        filterCity: filterCity,
        setFilterCity: setFilterCity,
        filterTemp: filterTemp,
        setFilterTemp: setFilterTemp,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
}
