require 'logger'
require 'active_record'

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
end
