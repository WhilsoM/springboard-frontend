import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface LocationPickerProps {
  latitude: number
  longitude: number
  onChange: (lat: number, lng: number) => void
}

const ClickHandler = ({
  onChange,
  setPosition,
}: {
  onChange: (lat: number, lng: number) => void
  setPosition: (latlng: L.LatLng) => void
}) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}
const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMapEvents({})
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 13, { animate: true })
    }
  }, [lat, lng, map])
  return null
}
export const LocationPicker = ({ latitude, longitude, onChange }: LocationPickerProps) => {
  const [position, setPosition] = useState<L.LatLng | null>(
    latitude && longitude ? new L.LatLng(latitude, longitude) : null,
  )

  useEffect(() => {
    if (latitude && longitude) {
      setPosition(new L.LatLng(latitude, longitude))
    }
  }, [latitude, longitude])

  return (
    <div className="h-62.5 w-full rounded-2xl overflow-hidden border border-slate-200 z-0 relative shadow-inner">
      <MapContainer
        center={[latitude || 55.7558, longitude || 37.6173]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?language=ru`}
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />
        <RecenterMap lat={latitude} lng={longitude} />
        <ClickHandler onChange={onChange} setPosition={setPosition} />
        {position && <Marker position={position} />}
      </MapContainer>
    </div>
  )
}
