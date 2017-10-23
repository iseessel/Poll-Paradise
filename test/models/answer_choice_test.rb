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

require 'test_helper'

class AnswerChoiceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
