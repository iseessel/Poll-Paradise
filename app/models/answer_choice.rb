# == Schema Information
#
# Table name: answer_choices
#
#  id           :integer          not null, primary key
#  body         :string
#  question_id  :integer
#  times_chosen :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class AnswerChoice < ApplicationRecord
  validates :body, :question, :times_chosen, presence: true

  belongs_to :question, inverse_of: :answer_choices
end
