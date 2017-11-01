class AddAttachmentImageToAnswerChoices < ActiveRecord::Migration[5.1]
  def self.up
    change_table :answer_choices do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :answer_choices, :image
  end
end
