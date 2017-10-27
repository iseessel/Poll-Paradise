class AddActiveToQuestions < ActiveRecord::Migration[5.1]
  def change
    add_column :questions, :active, :boolean, default: false
  end
end
