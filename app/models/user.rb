class User < ApplicationRecord
  validates :email, :password_digest,
   :session_token, :fname, :lname, presence: true

  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  def password=(password)
  end 
end
