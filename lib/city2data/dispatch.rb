class Dispatch < ActiveRecord::Base
  def self.new_from_tweet(tweet)
    new(Tweet.new(tweet).parse)
  end

  def self.last_status_id
    Dispatch.order('status_id DESC').first.status_id
  end
end
