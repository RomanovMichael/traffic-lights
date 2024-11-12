import mapboxgl from 'mapbox-gl'

export const initializeMap = (container, options) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN

  const map = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    attributionControl: false,
    ...options
  })

  const navControl = new mapboxgl.NavigationControl()
  map.addControl(navControl, 'top-right')

  return map
}
