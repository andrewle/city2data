require 'spec_helper'

describe "City2Data application" do
  include Rack::Test::Methods

  def app
    City2Data
  end

  describe "POST /dispatches/totals/last-7-days" do
    it "is successful" do
      post '/dispatches/totals/last-7-days'
      last_response.should be_ok
	  last_response.body.should_not == '[]'
    end
  end

  describe "POST /dispatches/totals/last-30-days" do
    it "is successful" do
      post '/dispatches/totals/last-30-days'
	  last_response.content_type.should == 'application/json'
	  last_response.body.should_not == '[]'
    end
  end

  describe "POST /dispatches/totals/year-to-date" do
    it "is successful" do
      post '/dispatches/totals/year-to-date'
	  last_response.content_type.should == 'application/json'
	  last_response.body.should_not == '[]'
    end
  end

  describe "POST /dispatches/totals/last-24-hours" do
    it "is successful" do
      post '/dispatches/totals/last-24-hours'
	  last_response.content_type.should == 'application/json'
	  last_response.body.should_not == '[]'
    end
  end

  describe "GET '/update'" do
    before(:each) do
      Dispatch.stub(:last_status_id).and_return(12345)
    end

    context 'when there are no tweets returned' do
      it "should not add any new dispatches" do
        Twitter.stub(:user_timeline).and_return([])
        expect { get '/update' }.to_not change{ Dispatch.count }
        last_response.should be_ok
      end
    end

    context 'when there are a few tweets returned' do
      it "should save the new dispatches to the database" do
        valid_tweets = [
          { id: '12345',
            text: '4870 Calle Real *** Santa Barbara *** Public Assist - All *** 34443670 *** - 119790301' },
          { id: '67890',
            text: '4870 Calle Real *** Santa Barbara *** Public Assist - All *** 34443670 *** - 119790301' }
        ]

        Twitter.stub(:user_timeline).and_return(valid_tweets)
        expect { get '/update' }.to change{ Dispatch.count }.by(2)
        last_response.should be_ok
      end
    end
  end
end
