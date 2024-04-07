import { PropsWithChildren, createContext, useState } from "react";

export type Weather = {
  id: string;
  city: string;
  weatherIcon: string;
  temp: number;
  tempP: number;
  wind: number;
};

export default function PatientsContextProvider({
  children,
}: PropsWithChildren) {
  const [data, setData] = useState<Weather[]>([]);
  const [refrshTkn, setTkn] = useState("undone");
  const apiKey = import.meta.env.VITE_APIKEY;


  async function addCity(cityId: string) {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        let newWeather: Weather = {
          id: jsonData["sys"]["id"],
          city: jsonData["name"],
          weatherIcon: jsonData["weather"]["0"]["icon"],
          temp: Math.round(parseFloat(jsonData["main"]["temp"]) - 273.15),
          tempP: Math.round(parseFloat(jsonData["main"]["feels_like"]) - 273.15),
          wind: Math.round(parseFloat(jsonData["wind"]["speed"])),
        };
        if (!data.some((obj) => obj.id === newWeather.id)) {
          setData((data) => [...data, newWeather]);
        }
      });
  }

  function deleteCity(name: string){
    setData((data)=>(data.filter(item=>item.city != name)))
  }

  return (
    <WeatherContext.Provider
      value={{
        weather: data,
        tkn: refrshTkn,
        setTkn: setTkn,
        addCity: addCity,
        deleteCity: deleteCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const WeatherContext = createContext({
  weather: [
    {
      id: "2074307",
      city: "Krakow",
      weatherIcon: "icon",
      temp: 1,
      tempP: 1,
      wind: 1,
    },
    {
      id: "2074307",
      city: "Krakow",
      weatherIcon: "icon",
      temp: 1,
      tempP: 1,
      wind: 1,
    },
  ],
  tkn: "",
  setTkn: (value: React.SetStateAction<string>) => console.log(value),
  addCity: (value: string) => console.log(value),
  deleteCity: (value: string) => console.log(value)
});
