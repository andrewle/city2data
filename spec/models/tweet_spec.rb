require 'spec_helper'

describe Tweet do
  before(:each) do
    @valid_tweet = {
      id: '39129063457177600',
      text: '4870 Calle Real *** Santa Barbara *** Public Assist - All *** 34443670 *** - 119790301'
    }
    @unparsable_tweet = {
      id: '39129063457177600',
      text: 'SANTA BARBARA CO FD C-20 FATAL SUICIDE JUMP OFF COLD SPRING BRIDGE IN SANTA BARBARA CT 16:30'
    }
    @valid_attrs = {
      status_id: '39129063457177600',
      address: '4870 Calle Real',
      city: 'Santa Barbara',
      type: 'Public Assist - All',
      incident_num_one: '34443670',
      incident_num_two: '119790301',
      json_data: @valid_tweet.to_json
    }
  end

  describe '#parsable?' do
    it "should return true when a tweet is parsable" do
      tweet = Tweet.new(@valid_tweet)
      tweet.parsable?.should be_true
    end

    it "should return false when a tweet is not parasble" do
      tweet = Tweet.new(@unparsable_tweet)
      tweet.parsable?.should be_false
    end
  end

  describe '#parse' do
    it "should separate a tweet response into its components" do
      tweet = Tweet.new(@valid_tweet)
      tweet.parse.should == @valid_attrs
    end

    it "should return false if the tweet is not parsable" do
      tweet = Tweet.new(@unparsable_tweet)
      tweet.parse.should be_false
    end
  end
end

