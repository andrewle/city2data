require 'spec_helper'

describe "City2Data application" do
  include Rack::Test::Methods

  def app
    City2Data
  end

  it "GET '/' should be successful" do
    get '/'
    last_response.should be_ok
  end

  describe "GET '/update'" do
    
    before(:each) do
      Dispatch.stub(:last_status_id).and_return(12345)
    end

    after(:each) do
      Dispatch.delete_all
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
