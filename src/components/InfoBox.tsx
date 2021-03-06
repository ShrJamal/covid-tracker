import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CountUp from 'react-countup'
import numeral from 'numeral'

const useStyles = makeStyles({
  root: {
    marginTop: 12,
  },
  item: {
    margin: '10px',
  },
})

export default function InfoBox({
  gridClass,
  title,
  todayCases: todayCount,
  total,
  isActive,
  onClick,
}: {
  gridClass: string
  title: string
  todayCases: number
  total: number
  isActive: boolean
  onClick: () => void
}) {
  const classes = useStyles()
  return (
    <Grid
      item
      sm={3}
      xs={12}
      component={Card}
      onClick={onClick}
      className={`${classes.item} ${isActive ? gridClass : ''}`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" color="secondary">
          <strong>
            <CountUp
              start={0}
              duration={1}
              separator=","
              prefix="+"
              end={todayCount}
            />
          </strong>
        </Typography>
        <Typography
          color="textSecondary"
          gutterBottom
          style={{ marginTop: '8px' }}
        >
          <strong>{numeral(total).format('0.00a')} Total</strong>
        </Typography>
      </CardContent>
    </Grid>
  )
}
