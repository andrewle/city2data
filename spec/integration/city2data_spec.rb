require 'city2data'
require 'rspec'
require 'rack/test'

describe "City2Data application" do
  include Rack::Test::Methods

  def app
    City2Data
  end

  it "should respond to '/'" do
    get '/'
    last_response.should be_ok
  end

  describe "POST /update" do
    
    before(:each) do
      Dispatch.stub(:last).and_return(status_id: 12345)
      Twitter.stub(:user_timeline)
    end

    it "should respond ok" do
      post '/update'
      last_response.should be_ok
    end

    it "should find the last dispatch tweet" do
      Dispatch.should_receive(:last)
      post '/update'
    end

    it "should query Twitter for SBCFireDispatch's timeline since the last tweet" do
      Twitter.should_receive(:user_timeline)
             .with('SBCFireDispatch', status_id: 12345)
      post '/update'
    end
  end
end
