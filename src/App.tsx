import SortContextProvider from "./contexts/SortContextProvider";
import FilterContextProvider from "./contexts/FilterContextProvider";
import FiltersBar from "./components/FiltersBar";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomTableCell from "./components/CustomTableCell";
import CustomTableBody from "./components/CustomTableBody";
import WeatherContextProvider from "./contexts/WeatherContextProvider";

function App() {
  return (
    <div
      style={{
        alignItems: "center",
        width: "100%",
        height: window.innerHeight * 0.8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <WeatherContextProvider>
        <SortContextProvider>
          <FilterContextProvider>
            <FiltersBar />
            <TableContainer
              component={Paper}
              style={{
                alignSelf: "center",
                width: "70%",
                marginLeft: "20px",
              }}
            >
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <CustomTableCell
                      name="Country"
                      sortBy="city"
                      isButtoned={true}
                    />
                    <CustomTableCell
                      name="Weather"
                      sortBy=""
                      isButtoned={false}
                    />
                    <CustomTableCell
                      name="Temperature"
                      sortBy="temp"
                      isButtoned={true}
                    />
                    <CustomTableCell
                      name="Perceived"
                      sortBy="tempP"
                      isButtoned={true}
                    />
                    <CustomTableCell
                      name="Wind speed"
                      sortBy="wind"
                      isButtoned={true}
                    />
                    <CustomTableCell
                      name="Delete"
                      sortBy=""
                      isButtoned={false}
                    />
                  </TableRow>
                </TableHead>
                <CustomTableBody />
              </Table>
            </TableContainer>
          </FilterContextProvider>
        </SortContextProvider>
      </WeatherContextProvider>
    </div>
  );
}

export default App;
