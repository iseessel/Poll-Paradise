json.extract! answer_choice, :id, :body, :question_id, :times_chosen
json.image_url asset_path(answer_choice.image.url)
