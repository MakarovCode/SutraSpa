class User < ApplicationRecord

  VALID_EMAIL_REGEX = /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  VALID_PHONE_REGEX = /\+(?:[0-9] ?){6,14}[0-9]\z/

  has_many :user_interests
  has_many :interests, through: :user_interests

  has_many :user_interest_objects
  has_many :interest_objects, through: :user_interest_objects

  validates :username, :first_name, :last_name, :email, :phone, :bio, :bg_color, presence: true

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

  def mark_interest_as(interest, selected)
    if selected
      unless self.interests.pluck(:id).include?(interest.id)
        self.user_interests.create interest_id: interest.id
      end
      true
    else
      clear_interest(interest)
      clear_interest_objects_for(interest)
      false
    end
  end

  def clear_interest(interest)
    self.user_interests.where(interest_id: interest.id).delete_all
  end

  def clear_interest_objects_for(interest)
    self.user_interest_objects.includes(:interest_object).where(interest_objects: {interest_id: interest.id}).references(:interest_object).delete_all
    false
  end

  def save_interest_objects(objects)
    objects.each do |obj|
      self.user_interest_objects.create interest_object_id: obj["id"]
    end
  end
end
