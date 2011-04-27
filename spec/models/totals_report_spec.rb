require 'json'
require 'city2data/totals_report'

describe Dispatch::TotalsReport do
  it '#within_7_days returns a json object with just the emergency type and total reported' do
    dispatch = double('dispatch', 
                      :emergency_type => 'Couch Fire',
                      :total_reported => '10',
                      :created_at => 'yesterday')
    expected_json = [
      {:emergency_type => 'Couch Fire', :total_reported => '10' }
    ].to_json

    report = Dispatch::TotalsReport.new([dispatch])
    report.to_json.should == expected_json
  end
end
