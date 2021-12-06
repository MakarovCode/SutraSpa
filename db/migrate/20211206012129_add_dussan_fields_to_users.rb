class AddDussanFieldsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :document, :string
    add_column :users, :table, :string
  end
end
