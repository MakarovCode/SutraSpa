class CreateInterestObjects < ActiveRecord::Migration[6.1]
  def change
    create_table :interest_objects do |t|
      t.references :interest, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
