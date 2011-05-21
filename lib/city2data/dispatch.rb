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

  def self.within_last_7_days(emergencies)
    dispatches = select("emergency_type, count(emergency_type) as total_reported").
      where("reported_on > (now() - interval '7 days')").
      where("emergency_type != ''").
      group('emergency_type').
      order('emergency_type')

	unless emergencies.nil?
	  dispatches = dispatches.where(:emergency_type => emergencies)
	end
	dispatches
  end

  def self.within_last_30_days(emergencies)
    dispatches = select("emergency_type, count(emergency_type) as total_reported").
      where("reported_on > (now() - interval '30 days')").
      where("emergency_type != ''").
      group('emergency_type').
      order('emergency_type')

	unless emergencies.nil?
	  dispatches = dispatches.where(:emergency_type => emergencies)
	end

	dispatches.all
  end

  def self.within_year_to_date(emergencies)
    dispatches = select("emergency_type, count(emergency_type) as total_reported").
      where("reported_on > date '2011-01-01'").
      where("emergency_type != ''").
      group('emergency_type').
      order('emergency_type')

	unless emergencies.nil?
	  dispatches = dispatches.where(:emergency_type => emergencies)
	end

	dispatches.all
  end

  def self.within_last_24_hours(emergencies)
    dispatches = select("emergency_type, count(emergency_type) as total_reported").
      where("reported_on > (now() - interval '24 hours')").
      where("emergency_type != ''").
      group('emergency_type').
      order('emergency_type')

	unless emergencies.nil?
	  dispatches = dispatches.where(:emergency_type => emergencies)
	end

	dispatches.all
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
