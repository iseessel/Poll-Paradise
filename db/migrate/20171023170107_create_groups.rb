class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.integer :user_id, null: false
      t.string :title, null: false

      t.timestamps
    end

    add_index :groups, :title
    add_index :groups, :user_id
  end
end
