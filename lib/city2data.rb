require 'sinatra/base'
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

  helpers do
    def find_dispatches(method)
      content_type :json
      dispatches = Dispatch.send(method, params['incident-options'])
      Dispatch::TotalsReport.new(dispatches).to_json
    end
  end

  get '/' do
    @emergency_types = Dispatch.emergency_types
    erb :index
  end

  get '/update' do
    Dispatch.updates!
    200
  end

  VALID_PERIODS = {
    'last-24-hours' => :within_last_24_hours,
    'last-7-days'   => :within_last_7_days,
    'last-30-days'  => :within_last_30_days,
    'year-to-date'  => :within_year_to_date
  }

  post '/dispatches/totals/:period' do
    begin
      method = VALID_PERIODS.fetch(params[:period])
      find_dispatches(method)
    rescue KeyError
      404
    end
  end
end
