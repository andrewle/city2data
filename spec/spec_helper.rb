require 'rubygems'
require 'spork'

ENV['RACK_ENV'] = 'test'

Spork.prefork do
  # Loading more in this block will cause your tests to run faster. However, 
  # if you change any configuration or code from libraries loaded here, you'll
  # need to restart spork for it take effect.
  require 'rspec'
  require 'rack/test'

end

Spork.each_run do
  # This code will be run each time you run your specs.
  require File.join(File.dirname(__FILE__), '..', 'lib', 'city2data')
  
end

