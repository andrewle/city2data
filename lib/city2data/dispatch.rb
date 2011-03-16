class Dispatch < ActiveRecord::Base
  include Geokit::Geocoders

  before_save :geocode

  def self.updates!
    Tweet.find_since_last_status_id(last_status_id).each do |tweet|
      create!(tweet)
    end
  end

  def self.last_status_id
    order('status_id DESC').first.status_id
  end

  def geocode
    return if self.address.nil? || self.address.length == 0
    loc = GoogleGeocoder.geocode("#{address}, #{city}, CA")
    if loc.success
      self.latitude  = "#{loc.lat}"
      self.longitude = "#{loc.lng}"
      self.zip_code  = "#{loc.zip}"
    end
  end
end
