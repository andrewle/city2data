class Dispatch
  class TotalsReport
    def initialize(dispatches)
      @dispatches = dispatches
    end

    def to_json
      @dispatches.collect do |d|
        {emergency_type: d.emergency_type, total_reported: d.total_reported}
      end.to_json
    end
  end
end
