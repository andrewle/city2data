require 'spec_helper'

describe Dispatch do
  before(:each) do
    @valid_tweet = {
      id: '39129063457177600',
      created_at: '2011-01-25 01:53:11.000000',
      text: '4870 Calle Real *** Santa Barbara *** Public Assist - All *** 34443670 *** - 119790301'
    }
    @unparsable_tweet = {
      id: '39129063457177600',
      created_at: '2011-01-25 01:53:11.000000',
      text: 'SANTA BARBARA CO FD C-20 FATAL SUICIDE JUMP OFF COLD SPRING BRIDGE IN SANTA BARBARA CT 16:30'
    }
    @valid_attrs = {
      status_id: '39129063457177600',
      address: '4870 Calle Real',
      city: 'Santa Barbara',
      emergency_type: 'Public Assist - All',
      incident_num_one: '34443670',
      incident_num_two: '119790301',
      reported_on: '2011-01-25 01:53:11.000000',
      json_data: @valid_tweet.to_json
    }

    @location = double(
      success: true,
      lat: 34.443426,
      lng: -119.791496,
      zip: '93111'
    )
    Geokit::Geocoders::GoogleGeocoder.stub(:geocode).and_return(@location)
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
          reported_on: '2011-01-25 01:53:11.000000',
          json_data: @unparsable_tweet.to_json
        }
        dispatch_from_unparsable = Dispatch.new(unparsable_attrs)
        dispatch = Dispatch.new_from_tweet(@unparsable_tweet)
        dispatch.attributes.should == dispatch_from_unparsable.attributes
      end
    end
  end

  describe 'Geocoding' do
    it "should respond to #geocode" do
      Dispatch.new.should respond_to(:geocode)
    end

    it "#geocode should set our remaining location data" do
      Geokit::Geocoders::GoogleGeocoder.should_receive(:geocode).
        and_return(@location)

      dispatch = Dispatch.new(@valid_attrs)
      dispatch.geocode

      dispatch.latitude.should == '34.443426'
      dispatch.longitude.should == '-119.791496'
      dispatch.zip_code.should == '93111'
    end

    it "#geocode should not attempt a service call is the tweet was unparsable" do
      Geokit::Geocoders::GoogleGeocoder.should_not_receive(:geocode)
      dispatch = Dispatch.new(@unparsable_attrs)
      dispatch.geocode

      dispatch_with_blank_address = Dispatch.new(@unparsable_attrs)
      dispatch_with_blank_address.address = ""
      dispatch_with_blank_address.geocode
    end

    it "should call geocode before saving" do
      dispatch = Dispatch.new(@valid_attrs)
      dispatch.should_receive(:geocode)
      dispatch.save!
    end
  end
end
