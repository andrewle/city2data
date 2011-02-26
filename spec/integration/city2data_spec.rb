require 'spec_helper'

describe "City2Data application" do
  include Rack::Test::Methods

  def app
    City2Data
  end

  it "should respond to '/'" do
    get '/'
    last_response.should be_ok
  end

  describe "GET /update" do
    
    before(:each) do
      Dispatch.stub(:last).and_return(status_id: 12345)
      Twitter.stub(:user_timeline).and_return([])
    end

    it "should respond ok" do
      get '/update'
      last_response.should be_ok
    end

    it "should find the last dispatch tweet" do
      Dispatch.should_receive(:last)
      get '/update'
    end

    it "should query Twitter for SBCFireDispatch's timeline since the last tweet" do
      Twitter.should_receive(:user_timeline)
             .with('SBCFireDispatch', since_id: 12345)
      get '/update'
    end

    it "should create Dispatches from tweets and save them" do
      valid_tweets = [
        { id: '12345',
          text: '4870 Calle Real *** Santa Barbara *** Public Assist - All *** 34443670 *** - 119790301' },
        { id: '67890',
          text: '4870 Calle Real *** Santa Barbara *** Public Assist - All *** 34443670 *** - 119790301' }
      ]
      valid_attrs = {
        status_id: '39129063457177600',
        address: '4870 Calle Real',
        city: 'Santa Barbara',
        type: 'Public Assist - All',
        incident_num_one: '34443670',
        incident_num_two: '119790301'
      }

      valid_dispatch = Dispatch.new(valid_attrs)
      Twitter.stub(:user_timeline).and_return(valid_tweets)

      Dispatch.should_receive(:new_from_tweet).twice.and_return(valid_dispatch)
      valid_dispatch.should_receive(:save!).twice

      get '/update'
    end
  end
end
