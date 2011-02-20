require 'city2data'

describe 'Dispatch' do

  describe '#parse' do
    it 'should respond' do
      Dispatch.should respond_to(:parse)
    end

    it "should separate a tweet response into its components" do
      @tweet = {
        id: '39129063457177600',
        text: '4870 Calle Real *** Santa Barbara *** Public Assist - All *** 34443670 *** - 119790301'
      }
      valid_components = {
        status_id: '39129063457177600',
        address: '4870 Calle Real',
        city: 'Santa Barbara',
        type: 'Public Assist - All',
        incident_num_one: '34443670',
        incident_num_two: '119790301'
      }
      Dispatch.parse(@tweet).should == valid_components
    end
  end
end
