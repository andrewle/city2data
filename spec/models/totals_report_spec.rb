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

    Dispatch.should_receive(:find_within_last_7_days).and_return([dispatch])
    Dispatch::TotalsReport.within_7_days.should == expected_json
  end
end
