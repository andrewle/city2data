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
      Twitter.stub(:user_timeline)
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
  end
end
