class CreateUserInterestObjects < ActiveRecord::Migration[6.1]
  def change
    create_table :user_interest_objects do |t|
      t.references :user, null: false, foreign_key: true
      t.references :interest_object, null: false, foreign_key: true

      t.timestamps
    end
  end
end
