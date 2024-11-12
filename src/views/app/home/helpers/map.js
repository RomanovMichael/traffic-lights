import mapboxgl from 'mapbox-gl'

export const initializeMap = (container, options) => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tYW5vdjEiLCJhIjoiY2xqbjJtNWMyMWMzZzNxazJjemh5bmxreiJ9.l3GIkp0IhuNqHbmwN3W-zw'

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
