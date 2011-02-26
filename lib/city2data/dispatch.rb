class Dispatch < ActiveRecord::Base
  def self.new_from_tweet(tweet)
    tweet = Tweet.new(tweet)
    new(tweet.parse) if tweet.parsable?
  end
end
