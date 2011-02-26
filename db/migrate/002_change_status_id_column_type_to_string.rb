class ChangeStatusIdColumnTypeToString < ActiveRecord::Migration
  def self.up
    change_column(:dispatches, :status_id, :string)
  end

  def self.down
    change_column(:dispatches, :status_id, :integer)
  end
end
