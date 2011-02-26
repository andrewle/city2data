class Tweet
  def initialize(tweet)
    @data = tweet
  end

  def parsable?
    @data[:text].include?('***')
  end

  def parse
    return false unless parsable?
    components = @data[:text].split('***').map(&:strip)
    {
      status_id: @data[:id],
      address: components.fetch(0),
      city: components.fetch(1),
      type: components.fetch(2),
      incident_num_one: components.fetch(3),
      incident_num_two: components.fetch(4).sub('- ', '')
    }
  end
end
