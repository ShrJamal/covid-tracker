import React, { Fragment } from 'react'
import { makeStyles } from '@mui/styles'
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Country } from '../@types/country'
import { CasesType, casesTypeColors } from '../helpers/map_circles'
import numeral from 'numeral'

const useStyles = makeStyles({
  map: {
    height: '500px',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '20px',
    marginTop: '16px',
    boxShadow: '0 0 8px -4px rgba(0, 0, 0,0.5)',
  },
  flag: {
    height: '80px',
    width: '100%',
    backgroundSize: 'contain',
    borderRadius: '8px',
    marginBottom: '4px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  infos: {
    fontSize: '16px',
    marginTop: '4px',
  },
})
export default function CasesMap({
  mapCountries,
  center,
  zoom,
  casesType,
}: {
  mapCountries: Country[]
  center: [number, number]
  zoom: number
  casesType: CasesType
}) {
  const classes = useStyles()
  return (
    <div className={classes.map}>
      <MapContainer key={`${center}`} center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCircles type={casesType} countries={mapCountries} />
      </MapContainer>
    </div>
  )
}

const MapCircles = ({
  type,
  countries,
}: {
  type: CasesType
  countries: Country[]
}) => {
  const classes = useStyles()

  return (
    <Fragment>
      {countries.map((c) => (
        <Circle
          key={c.name + type}
          center={[c.lat ?? 0, c.lon ?? 0]}
          fillOpacity={0.4}
          color={casesTypeColors[type].hex}
          fillColor={casesTypeColors[type].hex}
          radius={Math.sqrt(c[type]) * casesTypeColors[type].muliplier}
        >
          <Popup>
            <div>
              <div
                className={classes.flag}
                style={{ backgroundImage: `url(${c.flag})` }}
              />
              <div className={classes.name}>{c.name}</div>
              <div>Cases: {numeral(c.cases).format('0,0')}</div>
              <div>Recovered: {numeral(c.recovered).format('0,0')}</div>
              <div>Deaths: {numeral(c.deaths).format('0,0')}</div>
            </div>
          </Popup>
        </Circle>
      ))}
    </Fragment>
  )
}
