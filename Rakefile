require_relative 'lib/city2data'
require 'logger'

desc "Push to github and deploy"
task :deploy do
  system("git push && git push heroku master")
end

namespace :db do
  task :environment do
    config = YAML.load(File.read('config/database.yml'))
    environment = ENV['RACK_ENV'] || 'development'

    ActiveRecord::Base.establish_connection config[environment]
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Migration.verbose = true
  end

  desc "Migrate the database"
  task :migrate => :environment do
    ActiveRecord::Migrator.migrate("db/migrate")
  end

  desc "Rollback the database on step"
  task :rollback => :environment do
    ActiveRecord::Migrator.rollback("db/migrate")
  end

  desc "Seed the database the last 3200 tweets"
  task :seed => :environment do
    ActiveRecord::Migration.verbose = false
    count = 0

    (0..15).each do |page|
      sleep 5
      puts "Fetching page #{page}..."
      tweets = Twitter.user_timeline('SBCFireDispatch', count: 200, page: page)
      tweets.each do |tweet|
        dispatch = Dispatch.new_from_tweet(tweet)
        dispatch.save!
        count += 1
      end
    end

    puts "\n\nSaved #{count} tweets"
  end

  task :update_reported_on => :environment do
    Dispatch.find_each do |dispatch|
      tweet = JSON.parse(dispatch.json_data)
      dispatch.reported_on = tweet['created_at']
      Dispatch.skip_callback(:save, :before, :geocode)
      dispatch.save!
    end
  end
end
