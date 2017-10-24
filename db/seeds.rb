# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# USERS
User.destroy_all
user_one = User.create(email: 'iseessel@gmail.com', first_name: "isaac",
  last_name: "seessel", password:"password")

user_two = User.create(email: 'iseessel@msn.com', first_name: "isaac",
  last_name: "seessel", password:"password")

user_three = User.create(email: 'iseessel@hotmail.com', first_name: "isaac",
  last_name: "seessel", password:"password")

user_four = User.create(email: 'iseessel@aol.com', first_name: "isaac",
  last_name: "seessel", password:"password")

user_five = User.create(email: 'iseessel@yahoo.com', first_name: "isaac",
  last_name: "seessel", password:"password")

user_six = User.create(email: 'iseessel@apple.com', first_name: "isaac",
  last_name: "seessel", password:"password")

# GROUPS
Group.destroy_all
group_one = Group.create(user_id: user_one.id, title: "Seinfeld")
group_two = Group.create(user_id: user_one.id, title: "Birds")
group_three = Group.create(user_id: user_one.id, title: "Veep")

#QUESTIONS
Question.destroy_all
question_one = Question.create(user_id: user_one.id,
    body: "Who is your favorite character?", group_id: group_one.id)
question_two = Question.create(user_id: user_one.id,
    body: "Jerry or Newman?", group_id: group_one.id)
question_three = Question.create(user_id: user_one.id,
    body: "What is your favorite bird in the whole world?", group_id: group_two.id)
question_four = Question.create(user_id: user_one.id,
    body: "How mean is Selena?", group_id: group_three.id)

#ANSWER_CHOICES
AnswerChoice.destroy_all
#question_one
AnswerChoice.create(body: "Elayne", question_id: question_one.id, times_chosen: 0)
AnswerChoice.create(body: "Jerry", question_id: question_one.id, times_chosen: 0)
AnswerChoice.create(body: "George", question_id: question_one.id, times_chosen: 0)
AnswerChoice.create(body: "Kramer", question_id: question_one.id, times_chosen: 0)

#question_two
AnswerChoice.create(body: "Jerry", question_id: question_two.id, times_chosen: 0)
AnswerChoice.create(body: "Newman", question_id: question_two.id, times_chosen: 0)

#question_three
AnswerChoice.create(body: "BlueBird", question_id: question_three.id, times_chosen: 0)
AnswerChoice.create(body: "Robin", question_id: question_three.id, times_chosen: 0)
AnswerChoice.create(body: "Eagle", question_id: question_three.id, times_chosen: 0)
AnswerChoice.create(body: "Ostrich", question_id: question_three.id, times_chosen: 0)

#question_four
AnswerChoice.create(body: "Not mean", question_id: question_four.id, times_chosen: 0)
AnswerChoice.create(body: "Pretty mean", question_id: question_four.id, times_chosen: 0)
AnswerChoice.create(body: "Very mean", question_id: question_four.id, times_chosen: 0)
AnswerChoice.create(body: "The meanest", question_id: question_four.id, times_chosen: 0)
