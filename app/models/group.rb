# == Schema Information
#
# Table name: groups
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Group < ApplicationRecord
  validates :user, :title, presence: true

  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :answer_choices, through: :questions
end
