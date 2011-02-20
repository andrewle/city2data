# City2Data Application

* Pull down the SBCFireDispatch twitter stream
  * Parse it and stuff it into a db
  * Get Geocoder data from the address (need longitude and latitude data)
* Expose a simeple HTTP read-only api that we can call from JS to populate
  * API should return all unqiue emergency types
* Google Maps
  * Take the location data from the twitter stream
  * Plot markers on the map of SB
  * Clicking on the markers will bring details about the emergency in popup
  * Filter marks based on emergency type with a UI checkbox
