require 'city2data'
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
end
