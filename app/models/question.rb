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
  validate :twoQuestionsCannotBeActivated
  belongs_to :user, inverse_of: :questions
  belongs_to :group, optional: true
  has_many :answer_choices, inverse_of: :question, dependent: :destroy

  has_attached_file :image, default_url: "background-image.jpg"
  validates_attachment_content_type :image,
    content_type: /\Aimage\/.*\Z/

  def active?
    self.active
  end

  def at_least_one_answer_choice
    unless self.answer_choices.length > 0
      errors.add(:question, "must have at least one answer choice!")
    end
  end

  def twoQuestionsCannotBeActivated
    if self.user.questions.where(active: true).length > 1
      errors.add(:question, "cannot be activated. User already has
        activated a question.")
    end
  end

  def grouped?
    !!self.group_id
  end

end
