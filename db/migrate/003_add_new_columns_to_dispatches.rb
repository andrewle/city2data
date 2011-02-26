class AddNewColumnsToDispatches < ActiveRecord::Migration
  def self.up
    add_column(:dispatches, :reported_on, :datetime)
    add_index(:dispatches, :reported_on)
    add_index(:dispatches, :status_id)
  end

  def self.down
    remove_index(:dispatches, :status_id)
    remove_index(:dispatches, :reported_on)
    remove_column(:dispatches, :reported_on)
  end
end
