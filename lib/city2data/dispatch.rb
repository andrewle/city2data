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

  def self.emergency_types
    select('DISTINCT(emergency_type)').collect { |d| d.emergency_type }
  end

  def self.within_last_7_days
	sql = <<-SQL
	  select emergency_type, count(emergency_type) as total_reported 
	  from dispatches 
	  where 
		reported_on > (now() - interval '7 days') 
		and emergency_type != '' 
	  group by emergency_type 
	  order by emergency_type ASC
	SQL
	find_by_sql(sql)
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
