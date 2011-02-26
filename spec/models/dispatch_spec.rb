require 'spec_helper'

describe Dispatch do
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

  describe "#new_from_tweet" do
    it "should respond" do
      Dispatch.should respond_to(:new_from_tweet)
    end

    describe 'for a parsable tweet' do
      it "should create a new Dispatch with attributes filled in" do
        @valid_dispatch = Dispatch.new(@valid_attrs)
        dispatch_from_tweet = Dispatch.new_from_tweet(@valid_tweet)
        dispatch_from_tweet.attributes.should == @valid_dispatch.attributes
      end
    end

    describe 'for an unparsable tweet' do
      it "should return a Dispatch with only the json data filled in" do
        unparsable_attrs = {
          status_id: '39129063457177600',
          json_data: @unparsable_tweet.to_json
        }
        dispatch_from_unparsable = Dispatch.new(unparsable_attrs)
        dispatch = Dispatch.new_from_tweet(@unparsable_tweet)
        dispatch.attributes.should == dispatch_from_unparsable.attributes
      end
    end
  end
end
