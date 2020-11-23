import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { CountryCovid } from "./@types/covid";

import { Cards, CountryPicker, CasesMap } from "./components";
import { Country } from "./@types/country";
import { CasesType } from "./helpers/map_circles";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [mapCountries, setMapCountries] = useState<Country[]>([]);
  const [casesType, setCasesType] = useState(CasesType.cases);

  useEffect(() => {
    axios.get<CountryCovid[]>("countries").then((res) => {
      console.log("---Countries", res.data);
      setCountriesList(res.data.map((c) => c.country));
      setMapCountries(
        res.data.map<Country>((d) => ({
          name: d.country,
          cases: d.cases,
          recovered: d.recovered,
          deaths: d.deaths,
          lat: d.countryInfo.lat,
          lon: d.countryInfo.long,
          flag: d.countryInfo.flag,
        }))
      );
    });
  }, []);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<CountryCovid | undefined>();
  const classes = useStyles();
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await axios.get<CountryCovid>(
          selectedCountry?.name ? `countries/${selectedCountry.name}` : "all"
        );
        console.log("-----FETCH ", res);
        if (res.data) {
          setError("");
          setData(res.data);
        } else {
          setError(`Ooops! Something went wrong ${res.statusText}`);
        }
      } catch (e) {
        console.error(e);
        setError(`${e}`);
      }
      setLoading(false);
    }
    fetch();
  }, [selectedCountry]);

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : error || !data ? (
        <MuiAlert severity="error" elevation={6} variant="filled">
          {error || "Ooops No Data Found"}
        </MuiAlert>
      ) : null}
      {data ? (
        <Fragment>
          <div className={classes.header}>
            <h1>COVID-19 Tracker</h1>
            <CountryPicker
              selected={selectedCountry?.name ?? "global"}
              countries={countriesList}
              onChange={(v: string) => {
                const index = mapCountries.findIndex((c) => c.name === v);
                setSelectedCountry(() =>
                  index === -1 ? undefined : mapCountries[index]
                );
              }}
            />
          </div>
          <Cards
            data={data}
            casesType={casesType}
            onTypeChange={(v) => setCasesType(v)}
          />
          <CasesMap
            mapCountries={mapCountries}
            center={[selectedCountry?.lat ?? 0, selectedCountry?.lon ?? 0]}
            zoom={selectedCountry?.name ? 4 : 3}
            casesType={casesType}
          />
        </Fragment>
      ) : null}
    </div>
  );
}
