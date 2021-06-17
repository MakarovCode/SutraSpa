class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

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
    attribute_names.map{|attr| attr}.delete_if {|attr| attr == "id"}
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
