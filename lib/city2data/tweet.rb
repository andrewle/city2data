class Tweet
  SEPARATOR = '***'

  def initialize(tweet)
    @data = tweet
  end

  def parsable?
    @data[:text].include?(SEPARATOR)
  end

  def parse
    common_components.merge(parsed_components)
  end

  private
    def parsed_components 
      return {} unless parsable?
      components = @data[:text].split(SEPARATOR).map(&:strip)
      {
        address: components.fetch(0),
        city: components.fetch(1),
        emergency_type: components.fetch(2),
        incident_num_one: components.fetch(3),
        incident_num_two: components.fetch(4).sub('- ', ''),
      }
    end

    def common_components 
      { 
        status_id:   @data[:id],
        reported_on: @data[:created_at],
        json_data:   @data.to_json
      }
    end
end
