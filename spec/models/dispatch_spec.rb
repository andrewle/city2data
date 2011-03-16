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

  describe "#updates!" do
    before(:each) do
      Dispatch.stub(:last_status_id).and_return(1234)
    end

    describe 'when tweets are returned' do
      it 'adds the new Dispatches to the db' do
        tweets = [@valid_attrs, @valid_attrs]
        Tweet.stub(:find_since_last_status_id).and_return(tweets)
        expect { Dispatch.updates! }.to change { Dispatch.count }.by(2)
      end
    end

    describe 'when no tweets are returned' do
      it 'does not add any Dispatches to the db' do
        Tweet.stub(:find_since_last_status_id).and_return([])
        expect { Dispatch.updates! }.to_not change { Dispatch.count }
      end
    end
  end

  describe '#geocode' do
    it "should be an instance method on Dispatch" do
      Dispatch.new.should respond_to(:geocode)
    end

    it "should set our remaining location data" do
      Geokit::Geocoders::GoogleGeocoder.should_receive(:geocode).
        and_return(@location)

      dispatch = Dispatch.new(@valid_attrs)
      dispatch.geocode

      dispatch.latitude.should == '34.443426'
      dispatch.longitude.should == '-119.791496'
      dispatch.zip_code.should == '93111'
    end

    it "should not attempt a service call if the tweet was unparsable" do
      Geokit::Geocoders::GoogleGeocoder.should_not_receive(:geocode)
      dispatch = Dispatch.new(@unparsable_attrs)
      dispatch.geocode
    end

    it "should not not attempt a service call if the address field is blank" do
      Geokit::Geocoders::GoogleGeocoder.should_not_receive(:geocode)
      dispatch_with_blank_address = Dispatch.new(@unparsable_attrs)
      dispatch_with_blank_address.address = ""
      dispatch_with_blank_address.geocode
    end

    it "should get called before saving" do
      dispatch = Dispatch.new(@valid_attrs)
      dispatch.should_receive(:geocode)
      dispatch.save!
    end
  end
end
