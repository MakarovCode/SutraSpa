
(1..10).each do |i|
  full_name = Faker::Movies::HarryPotter.character.split(" ")
  first_name = full_name[0]
  last_name = full_name[1]
  username = Faker::Movies::HarryPotter.spell
  email = "#{username}@sutraspa.com"
  User.create username: username, first_name: first_name, last_name: last_name, email: email, phone: Faker::PhoneNumber.cell_phone_in_e164, bio: Faker::Lorem.paragraph(sentence_count: 2), bg_color: Faker::Color.hex_color, remote_photo_url: Faker::Avatar.image  
end
