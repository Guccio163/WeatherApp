import TableBody from "@mui/material/TableBody";
import { useContext } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { SortContext } from "../contexts/SortContextProvider";
import { FilterDataContext } from "../contexts/FilterContextProvider";
import { Weather, WeatherContext } from "../contexts/WeatherContextProvider";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CustomTableBody() {
  const { sortParam, sortDirection } = useContext(SortContext);
  const { filteredData } = useContext(FilterDataContext);
  const { deleteCity } = useContext(WeatherContext);

  const getCompareValue = (w: Weather) => {
    if (sortParam == "temp") {
      return w.temp;
    } else if (sortParam == "tempP") {
      return w.temp;
    } else if (sortParam == "wind") {
      return w.wind;
    }
    return w.city;
  };

  const sortFunction = (n1: Weather, n2: Weather) => {
    if (getCompareValue(n1) > getCompareValue(n2)) {
      return sortDirection * 1;
    } else if (getCompareValue(n1) < getCompareValue(n2)) {
      return sortDirection * -1;
    } else {
      return 0;
    }
  };

  return (
    <>
      <TableBody>
        {filteredData.sort(sortFunction).map((row, index) => (
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            key={index}
          >
            <TableCell component="th" scope="row">
              {row.city}
            </TableCell>
            <TableCell align="right">
              <img
                src={`http://openweathermap.org/img/w/${row.weatherIcon}.png`}
              />
            </TableCell>
            <TableCell align="right">{row.temp} °C</TableCell>
            <TableCell align="right">{row.tempP} °C</TableCell>
            <TableCell align="right">{row.wind} m/s</TableCell>
            <TableCell align="right">
              <Button
                onClick={() => {
                  deleteCity(row.city);
                }}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
