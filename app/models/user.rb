class User < ApplicationRecord
  validates :email, :password_digest,
   :session_token, :fname, :lname, presence: true

  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.sesssion_token ||= SecureRandom.urlsafe_base64(16)
  end

end
