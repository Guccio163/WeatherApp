import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContextProvider";
import { Button } from "@mui/material";

export default function LoadHardcodedButton() {
  const { addCity } = useContext(WeatherContext);
  const hardCodedCities = ["3094802", "1689969", "1850147"];

  return (
    <Button
      onClick={() =>
        hardCodedCities.forEach((city) => {
          addCity(city);
        })
      }
      variant="contained"
      size="small"
    >
      Add hardcoded cities
    </Button>
  );
}
