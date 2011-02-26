class Tweet
  def initialize(tweet)
    @data = tweet
  end

  def parsable?
    @data[:text].include?('***')
  end

  def parse
    if parsable?
      components_for_parsable
    else
      components_for_unparsable
    end
  end

  private
    def components_for_parsable
      components = @data[:text].split('***').map(&:strip)
      {
        status_id: @data[:id],
        address: components.fetch(0),
        city: components.fetch(1),
        type: components.fetch(2),
        incident_num_one: components.fetch(3),
        incident_num_two: components.fetch(4).sub('- ', ''),
        json_data: @data.to_json
      }
    end

    def components_for_unparsable
      { 
        status_id: @data[:id],
        json_data: @data.to_json 
      }
    end
end
