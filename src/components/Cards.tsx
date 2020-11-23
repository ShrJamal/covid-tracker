import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { CountryCovid } from "../@types/covid";
import InfoBox from "./InfoBox";

const useStyles = makeStyles({
  root: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  cases: {
    borderBottom: "10px solid rgba(0,0,255,0.5)",
  },
  recovered: {
    borderBottom: "10px solid rgba(0,255,0,0.5)",
  },
  deaths: {
    borderBottom: "10px solid rgba(255,0,0,0.5)",
  },
});

const Cards = (data: CountryCovid) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="space-between">
        {/* Confirmed */}
        <InfoBox
          gridClass={classes.cases}
          title="New Cases"
          todayCases={data.todayCases}
          total={data.cases}
        />{" "}
        {/* Recovered */}
        <InfoBox
          gridClass={classes.recovered}
          title="Recovered"
          todayCases={data.todayRecovered}
          total={data.recovered}
        />{" "}
        {/* Deaths */}
        <InfoBox
          gridClass={classes.deaths}
          title="Deaths"
          todayCases={data.todayDeaths}
          total={data.deaths}
        />
      </Grid>
    </div>
  );
};

export default Cards;
