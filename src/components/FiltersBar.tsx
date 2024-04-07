import { useContext, useEffect, useState } from "react";
import { FilterDataContext } from "../contexts/FilterContextProvider";
import { Autocomplete, Button, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import LoadHardcodedButton from "./LoadHardcodedButton";
import data from "../assets/mostPopular.json";
import { WeatherContext } from "../contexts/WeatherContextProvider";


export default function FiltersBar() {
  type autoCompleteType = { label: string; id: string };

  const { filterCity, setFilterCity, filterTemp, setFilterTemp } =
    useContext(FilterDataContext);
  const { addCity } = useContext(WeatherContext);
  const [value, setValue] = useState<autoCompleteType>();
  const [cities, setCities] = useState({});

  const handleNameChangeS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCity([event.target.value[0], filterCity[1]]);
  };

  const handleNameChangeE = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCity([filterCity[0], event.target.value[0]]);
  };

  function addAdjusted(values: number[]) {
    setFilterTemp([values[0] - 50, values[1] - 50]);
  }

  function getAdjusted() {
    return [filterTemp[0] + 50, filterTemp[1] + 50];
  }

  const handleAmountChange = (_event: Event, newValue: number | number[]) => {
    addAdjusted(newValue as number[]);
  };

  const prizeMarks = [
    {
      value: 0,
      label: `-50`,
    },
    {
      value: 50,
      label: `0`,
    },
    {
      value: 100,
      label: `50`,
    },
  ];

  function tempText(temp: number) {
    return `${temp - 50} °C`;
  }

  useEffect(() => {
    const example = {
      id: 4960753,
      name: "Chelsea",
      state: "ME",
      country: "US",
      coord: {
        lon: -69.71727,
        lat: 44.250351,
      },
    };
    type dataType = typeof example;
    const myNewData = data.map((item: dataType) => {
      return { label: item.name, id: item.id };
    });
    console.log(myNewData);
    setCities(myNewData);
  }, []);

  useEffect(() => {
    console.log(cities);
  }, [cities]);

  return (
    <div style={{ width: "20%", padding: "20px" }}>
      Filter Cities:
      <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
        <TextField
          id="outlined-basic"
          label="From"
          variant="outlined"
          value={filterCity[0]}
          onChange={handleNameChangeS}
        />
        <TextField
          id="outlined-basic"
          label="To"
          variant="outlined"
          value={filterCity[1]}
          onChange={handleNameChangeE}
        />
      </div>
      Filter Temperatures:
      <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={getAdjusted()}
          onChange={handleAmountChange}
          valueLabelDisplay="auto"
          marks={prizeMarks}
          valueLabelFormat={tempText}
        />
      </div>
      <LoadHardcodedButton />
      {/* Tutaj możnaby też podawać wszystkie dostępne miasta, kwestia optymalizacji które miasta pobierać 
      (pradopodobnie optymalizacja na backendzie, aplikacja frontowa się zacina przy 1.5 mln obiektów);
      wybrałem najczęstsze parę miast żeby pokazać możliwość dodawania  */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={cities as any}
        sx={{ marginTop: 2 }}
        renderInput={(params) => <TextField {...params} label="City" />}
        size="small"
        onChange={(_event, newValue) => {
          setValue(newValue as any);
        }}
        isOptionEqualToValue={(
          option1: autoCompleteType,
          option2: autoCompleteType
        ) => {
          return option1.label == option2.label;
        }}
      />
      <Button
        onClick={() => {
          if (value != undefined) {
            addCity(value.id);
          }
        }}
        variant="contained"
        size="small"
      >
        Add city
      </Button>
    </div>
  );
}
