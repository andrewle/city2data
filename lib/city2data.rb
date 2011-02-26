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

  configure :production do |c|
    ActiveRecord::Base.establish_connection c.DB_CONFIG['production']
  end

  get '/' do
    erb :index
  end

  get '/update' do
    tweets = Twitter.user_timeline('SBCFireDispatch', since_id: Dispatch.last_status_id)
    tweets.each do |tweet|
      dispatch = Dispatch.new_from_tweet(tweet)
      dispatch.save!
    end
  end
end
