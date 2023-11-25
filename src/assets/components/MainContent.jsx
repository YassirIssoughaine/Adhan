import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Divider, Stack } from "@mui/material";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/ar-ma";

moment.locale("ar");

export default function MainContent() {
  //city change
  const handleCityChange = (event) => {
    const cityObject = availableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setCity(cityObject);
  };
  const [city, setCity] = useState({
    displayName: "مراكش",
    apiName: "Marrakech",
    key: "Marrakech",
  });
  //States
  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=MA&city=${city.apiName}`
    );
    setTimings(response.data.data.timings);
  };

  const updateDate = () => {
    const t = moment();
    setTodayDate(t.format("LLLL"));
  };

  useEffect(() => {
    getTimings();
    updateDate();
    const intervalId = setInterval(updateDate, 1000); 
    return () => clearInterval(intervalId);
  }, [city]);

  const [timings, setTimings] = useState("");

  const [todayDate, setTodayDate] = useState("");

  const availableCities = [
    {
      displayName: "مراكش",
      apiName: "Marrakech",
      key: "Marrakech",
    },
    {
      displayName: "الرباط",
      apiName: "Rabat",
      key: "Rabat",
    },
    {
      displayName: "الدار البيضاء",
      apiName: "Casablanca",
      key: "Casablanca",
    },
  ];
  return (
    <>
      {/* Header Start */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{todayDate}</h2>
            <h1>{city.displayName}</h1>
          </div>
        </Grid>
      </Grid>
      {/* Header End */}
      <Divider />
      {/* Prayers Cards Start */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "20px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="https://images.pexels.com/photos/3624566/pexels-photo-3624566.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          image="https://images.pexels.com/photos/7529416/pexels-photo-7529416.jpeg"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="https://images.pexels.com/photos/2475722/pexels-photo-2475722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="https://images.pexels.com/photos/87500/pexels-photo-87500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="https://images.pexels.com/photos/2325271/pexels-photo-2325271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Stack>
      {/* Prayers Cards End */}
      {/* Select City Start */}
      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            {/* <span style={{ color: "black" }}>المدينة</span> */}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city.apiName}
            onChange={handleCityChange}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.key}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
