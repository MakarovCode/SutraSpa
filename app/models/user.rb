class User < ApplicationRecord

  VALID_EMAIL_REGEX = /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  VALID_PHONE_REGEX = /\+(?:[0-9] ?){6,14}[0-9]\z/

  validates :username, :first_name, :last_name, :email, :phone, :photo, :bio, :bg_color, presence: true

  validates :username, :email, :phone, uniqueness: true

  validates :email, format: { with: VALID_EMAIL_REGEX }
  validates :phone, format: { with: VALID_PHONE_REGEX }

  mount_uploader :photo, PhotoUploader

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def self.editables
    ["username", "first_name", "last_name", "email", "phone", "photo", "bio", "bg_color"]
  end
end
