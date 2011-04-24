class Dispatch
  class TotalsReport
    def self.within_7_days
      dispatches = Dispatch.find_within_last_7_days
      dispatches.collect do |d|
        {emergency_type: d.emergency_type, total_reported: d.total_reported}
      end.to_json
    end
  end
end
