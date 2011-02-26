require 'city2data/init'
require 'city2data/dispatch'
require 'city2data/tweet'

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
    Twitter.user_timeline('SBCFireDispatch', since_id: last_dispatch[:status_id])
  end
end
