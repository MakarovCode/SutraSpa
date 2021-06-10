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
      fields[attr] = {
        name: attr,
        type: self.class.get_attribute_type(attr),
        value: nil,
        placeholder: "Write a #{attr}"
      }
    end
  end

  private

  def self.get_attribute_type(attr)
    case User.attribute_types[attr].class.name
    when "ActiveModel::Type::String"
      if attr == "email"
        "email"
      elsif attr == "phone"
        "tel"
      else
        "text"
      end
    when "ActiveModel::Type::Text"
      "textarea"
    end
  end
end
