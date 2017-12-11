# == Schema Information
#
# Table name: answer_choices
#
#  id           :integer          not null, primary key
#  body         :string           not null
#  question_id  :integer          not null
#  times_chosen :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class AnswerChoice < ApplicationRecord
  validates :question, :times_chosen, presence: true

  has_attached_file :image
  validates_attachment_content_type :image,
    content_type: /\Aimage\/.*\Z/

  belongs_to :question, inverse_of: :answer_choices

  def update_times_chosen(differential)
    self.times_chosen += differential
    self.save
  end

end
