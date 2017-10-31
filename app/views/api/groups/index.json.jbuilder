json.groups do
  @groups.each do |group|
    json.set! group.id do
      json.extract! group, :question_ids
      json.partial! 'api/groups/group', group: group
    end
  end
end

json.questions do
  @groups.each do |group|
    group.questions.each do |question|
      json.set! question.id do
        json.partial! 'api/questions/question', question: question
      end
    end
  end
end


json.lastUpdatedGroupId @last_updated_id 
