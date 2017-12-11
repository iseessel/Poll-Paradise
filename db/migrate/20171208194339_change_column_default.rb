class ChangeColumnDefault < ActiveRecord::Migration[5.1]
  def change
    change_column_default :answer_choices, :times_chosen, 0

  end
end
