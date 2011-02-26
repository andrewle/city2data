require 'geokit'

class Dispatch < ActiveRecord::Base
  include Geokit::Geocoders

  before_save :geocode

  TWITTER_USERNAME = 'SBCFireDispatch'

  def self.new_from_tweet(tweet)
    new(Tweet.new(tweet).parse)
  end

  def self.last_status_id
    Dispatch.order('status_id DESC').first.status_id
  end

  def self.updates!
    options = { since_id: last_status_id }
    Twitter.user_timeline(TWITTER_USERNAME, options).each do |tweet|
      new_from_tweet(tweet).save!
    end
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
