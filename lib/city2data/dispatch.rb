class Dispatch < ActiveRecord::Base
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
end
