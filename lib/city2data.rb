require 'sinatra/base'
require 'rack-rewrite'
require 'active_record'
require 'twitter'
require 'geokit'

require 'city2data/dispatch'
require 'city2data/totals_report'
require 'city2data/tweet'

class City2Data < Sinatra::Base
  configure do
    set :public, File.expand_path(File.dirname(__FILE__) + '/../public')

    environment = ENV['RACK_ENV'] || 'development'
    DB_CONFIG = YAML.load(File.read('config/database.yml'))
    ActiveRecord::Base.establish_connection DB_CONFIG[environment]
  end

  get '/' do
    @emergency_types = Dispatch.emergency_types
    erb :index
  end

  get '/update' do
    Dispatch.updates!
    200
  end

  get '/dispatches/totals/last-7-days' do
    content_type :json
    Dispatch::TotalsReport.new(Dispatch.within_last_7_days).to_json
  end

  post '/dispatches/totals/last-7-days' do
    content_type :json
    dispatches = Dispatch.within_last_7_days_for_types(params['incident-options'])
    Dispatch::TotalsReport.new(dispatches).to_json
  end
end
