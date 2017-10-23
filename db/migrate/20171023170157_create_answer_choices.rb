class CreateAnswerChoices < ActiveRecord::Migration[5.1]
  def change
    create_table :answer_choices do |t|
      t.string :body, null: false
      t.integer :question_id, null: false
      t.integer :times_chosen, null: false

      t.timestamps
    end

    add_index :answer_choices, :question_id
  end
end
