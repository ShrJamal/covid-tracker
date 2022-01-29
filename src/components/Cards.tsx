import React from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CountryCovid } from '../@types/covid'
import InfoBox from './InfoBox'
import { CasesType } from '../helpers/map_circles'

const useStyles = makeStyles(() => ({
  root: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  cases: {
    borderBottom: '10px solid rgba(0,0,255,0.5)',
  },
  recovered: {
    borderBottom: '10px solid rgba(0,255,0,0.5)',
  },
  deaths: {
    borderBottom: '10px solid rgba(255,0,0,0.5)',
  },
}))

export default function Cards({
  data,
  casesType,
  onTypeChange,
}: {
  data: CountryCovid
  casesType: CasesType
  onTypeChange: (value: CasesType) => void
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justifyContent="space-between">
        {/* Confirmed */}
        <InfoBox
          gridClass={classes.cases}
          title="New Cases"
          todayCases={data.todayCases}
          total={data.cases}
          isActive={casesType === CasesType.cases}
          onClick={() => onTypeChange(CasesType.cases)}
        />{' '}
        {/* Recovered */}
        <InfoBox
          gridClass={classes.recovered}
          title="Recovered"
          todayCases={data.todayRecovered}
          total={data.recovered}
          isActive={casesType === CasesType.recovered}
          onClick={() => onTypeChange(CasesType.recovered)}
        />{' '}
        {/* Deaths */}
        <InfoBox
          gridClass={classes.deaths}
          title="Deaths"
          todayCases={data.todayDeaths}
          total={data.deaths}
          isActive={casesType === CasesType.deaths}
          onClick={() => onTypeChange(CasesType.deaths)}
        />
      </Grid>
    </div>
  )
}
