import { useOpportunityStore } from '@/entities/opportunity'
import { Button } from '@/shared'
import 'leaflet/dist/leaflet.css'
import { Building2, ChevronRight } from 'lucide-react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export const MapView = () => {
  const opportunities = useOpportunityStore((state) => state.opportunities)

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="h-150 w-full relative overflow-hidden border-2 border-slate-200 shadow-sm rounded-2xl">
        <MapContainer
          center={[55.75, 37.61]}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {opportunities.map((job) => (
            <Marker key={job.id} position={[parseFloat(job.latitude), parseFloat(job.longitude)]}>
              <Popup maxWidth={320} minWidth={300} className="custom-popup">
                <div className="flex flex-col overflow-hidden font-sans">
                  <div className="p-4">
                    <h4 className="font-bold text-base text-slate-900 leading-tight mb-1">
                      {job.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.company_name}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{job.tags.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">
                        Зарплата
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        {job.salary_min.toLocaleString()}&#8381;+
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:bg-blue-100 h-8 px-3 text-xs gap-1"
                    >
                      Подробнее <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
