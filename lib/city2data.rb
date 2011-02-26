require 'sinatra/base'
require 'active_record'
require 'twitter'
require 'geokit'

require_relative 'city2data/dispatch'
require_relative 'city2data/tweet'

class City2Data < Sinatra::Base
  configure do
    environment = ENV['RACK_ENV'] || 'development'
    DB_CONFIG = YAML.load(File.read('config/database.yml'))
    ActiveRecord::Base.establish_connection DB_CONFIG[environment]
  end

  get '/' do
    erb :index
  end

  get '/update' do
    Dispatch.updates!
    200
  end
end
