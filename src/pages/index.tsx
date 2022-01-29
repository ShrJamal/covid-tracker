import React from 'react'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { Alert, LinearProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { CountryCovid } from '../@types/covid'

import { Cards, CountryPicker, CasesMap } from '../components'
import { Country } from '../@types/country'
import { CasesType } from '../helpers/map_circles'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country>()
  const [countriesList, setCountriesList] = useState<string[]>([])
  const [mapCountries, setMapCountries] = useState<Country[]>([])
  const [casesType, setCasesType] = useState(CasesType.cases)

  useEffect(() => {
    axios.get<CountryCovid[]>('countries').then((res) => {
      setCountriesList(res.data.map((c) => c.country))
      setMapCountries(
        res.data.map<Country>((d) => ({
          name: d.country,
          cases: d.cases,
          recovered: d.recovered,
          deaths: d.deaths,
          lat: d.countryInfo.lat,
          lon: d.countryInfo.long,
          flag: d.countryInfo.flag,
        })),
      )
    })
  }, [])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<CountryCovid | undefined>()
  const classes = useStyles()
  useEffect(() => {
    async function fetch() {
      setLoading(true)
      try {
        const res = await axios.get<CountryCovid>(
          selectedCountry?.name ? `countries/${selectedCountry.name}` : 'all',
        )
        if (res.data) {
          setError('')
          setData(res.data)
        } else {
          setError(`Ooops! Something went wrong ${res.statusText}`)
        }
      } catch (e) {
        console.error(e)
        setError(`${e}`)
      }
      setLoading(false)
    }
    fetch()
  }, [selectedCountry])

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : error || !data ? (
        <Alert severity="error" elevation={6} variant="filled">
          {error || 'Ooops No Data Found'}
        </Alert>
      ) : null}
      {data ? (
        <Fragment>
          <div className={classes.header}>
            <h1>COVID-19 Tracker</h1>
            <CountryPicker
              selected={selectedCountry?.name ?? 'global'}
              countries={countriesList}
              onChange={(v: string) => {
                const index = mapCountries.findIndex((c) => c.name === v)
                setSelectedCountry(() =>
                  index === -1 ? undefined : mapCountries[index],
                )
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
  )
}
