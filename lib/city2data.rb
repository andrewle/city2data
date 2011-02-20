require 'sinatra/base'
require 'twitter'

class Dispatch
end

class City2Data < Sinatra::Base

  get '/' do
    200
  end

  post '/update' do
    last_dispatch = Dispatch.last
    Twitter.user_timeline('SBCFireDispatch', status_id: last_dispatch[:status_id])
  end
end
