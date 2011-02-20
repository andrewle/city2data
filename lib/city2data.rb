require 'sinatra/base'
require 'active_record'
require 'twitter'

class Dispatch
end

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

  post '/update' do
    last_dispatch = Dispatch.last
    Twitter.user_timeline('SBCFireDispatch', status_id: last_dispatch[:status_id])
  end
end
