 # == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  group_id   :integer
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  active     :boolean          default(FALSE)
#

class Question < ApplicationRecord
  validates :user, :body, presence: true
  validate :at_least_one_answer_choice
  validate :two_questions_cannot_be_activated

  belongs_to :user, inverse_of: :questions
  belongs_to :group, optional: true
  has_many :answer_choices, inverse_of: :question, dependent: :destroy

  scope :active, -> { find_by(active: true) }

  def active?
    self.active
  end

  def at_least_one_answer_choice
    unless self.answer_choices.length > 0
      errors.add(:question, "must have at least one answer choice!")
    end
  end

  def two_questions_cannot_be_activated
    if self.user.questions.where(active: true).length > 1
      errors.add(:question, "cannot be activated. User already has
        activated a question.")
    end
  end

  def grouped?
    !!self.group_id
  end

end
