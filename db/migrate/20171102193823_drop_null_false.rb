class DropNullFalse < ActiveRecord::Migration[5.1]
  def change
    change_column :answer_choices, :body, :string, :null => true
  end
end
