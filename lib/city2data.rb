require_relative 'city2data/init'
require_relative 'city2data/dispatch'
require_relative 'city2data/tweet'

class City2Data < Sinatra::Base
  configure do
    set :DB_CONFIG, YAML.load(File.read('config/database.yml'))
  end

  configure :development do |c|
    ActiveRecord::Base.establish_connection c.DB_CONFIG['development']
  end

  get '/' do
    erb :index
  end

  get '/update' do
    last_dispatch = Dispatch.last
    tweets = Twitter.user_timeline('SBCFireDispatch', since_id: last_dispatch[:status_id])
    tweets.each do |tweet|
      dispatch = Dispatch.new_from_tweet(tweet)
      dispatch.save!
    end
  end

  get '/seed' do
    tweets = Twitter.user_timeline('SBCFireDispatch', since_id: '39129063457177600')
    return 404 if tweets.zero?

    content_type :json
    tweets.each do |tweet|
      dispatch = Dispatch.new_from_tweet(tweet)
      dispatch.to_json
    end
  end
end
