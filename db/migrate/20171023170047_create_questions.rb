class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.integer :user_id, null: false
      t.integer :group_id, null: false
      t.string :body, null: false

      t.timestamps
    end

    add_index :questions, :user_id
    add_index :questions, :group_id
  end
end
