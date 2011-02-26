class Dispatch < ActiveRecord::Base
  def self.new_from_tweet(tweet)
    new(Tweet.new(tweet).parse)
  end
end
