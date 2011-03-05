require File.join(File.dirname(__FILE__), 'lib', 'city2data')

use Rack::Rewrite do
  rewrite '/', '/index.html'
  rewrite '/graphs', '/graphs/index.html'
end 

run City2Data
