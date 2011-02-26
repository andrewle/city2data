require 'city2data/init'

class Dispatch < ActiveRecord::Base
  def self.parse(tweet)
    components = tweet[:text].split('***').map(&:strip)
    {
      status_id: tweet[:id],
      address: components.fetch(0),
      city: components.fetch(1),
      type: components.fetch(2),
      incident_num_one: components.fetch(3),
      incident_num_two: components.fetch(4).sub('- ', '')
    }
  end
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

  get '/update' do
    last_dispatch = Dispatch.last
    Twitter.user_timeline('SBCFireDispatch', status_id: last_dispatch[:status_id])
  end
end
