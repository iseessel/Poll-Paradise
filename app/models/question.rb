# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  group_id   :integer          not null
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# I may want to strip user_id it may be redunant?

class Question < ApplicationRecord
  validates :user, :body, presence: true
  validate :at_least_one_answer_choice
  belongs_to :user, inverse_of: :questions
  belongs_to :group, optional: true
  has_many :answer_choices, inverse_of: :question, dependent: :destroy

  def at_least_one_answer_choice
    unless self.answer_choices.length > 0
      errors.add(:question, "must have at least one answer choice!")
    end
  end

  def grouped?
    !!self.group_id
  end

end
