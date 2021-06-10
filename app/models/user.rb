class User < ApplicationRecord

  VALID_EMAIL_REGEX = /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  VALID_PHONE_REGEX = /\+(?:[0-9] ?){6,14}[0-9]/

  validates :username, :first_name, :last_name, :email, :phone, :photo, :bio, :bg_color, presence: true

  validates :username, :email, :phone, uniqueness: true

  validates :email, format: { with: VALID_EMAIL_REGEX }
  validates :phone, format: { with: VALID_PHONE_REGEX }

  mount_uploader :photo, PhotoUploader

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def generate_react_form_fields
    fields = {}
    self.class.attribute_names.each do |attr|
      if self.class.editables.include?(attr)
        fields[attr] = {
          name: attr,
          type: self.class.get_attribute_type(attr),
          value: attr == "photo" ? self.photo.url : self[attr],
          placeholder: "Write a #{attr}"
        }
      end
    end
    fields
  end

  private

  def self.editables
    ["username", "first_name", "last_name", "email", "phone", "photo", "bio", "bg_color"]
  end

  def self.get_attribute_type(attr)
    case User.attribute_types[attr].class.name
    when "ActiveModel::Type::String"
      if attr == "email"
        "email"
      elsif attr == "photo"
        "file"
      elsif attr == "phone"
        "tel"
      elsif attr == "bg_color"
        "color"
      else
        "text"
      end
    when "ActiveModel::Type::Text"
      "textarea"
    end
  end
end
