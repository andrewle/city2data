class Init < ActiveRecord::Migration
  def self.up
    create_table :dispatches do |t|
      t.integer :status_id
      t.string  :address
      t.string  :city
      t.string  :zip_code
      t.string  :emergency_type
      t.string  :incident_num_one
      t.string  :incident_num_two
      t.string  :latitude
      t.string  :longitude
      t.text    :json_data
      t.timestamps
    end
  end

  def self.down
    drop_table :dispatches
  end
end
