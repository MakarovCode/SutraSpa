
(1..10).each do |i|
  full_name = Faker::Movies::HarryPotter.character.split(" ")
  first_name = full_name[0]
  last_name = full_name[1]
  username = Faker::Movies::HarryPotter.spell
  email = "#{username}@sutraspa.com"
  User.create username: username, first_name: first_name, last_name: last_name, email: email, phone: Faker::PhoneNumber.cell_phone_in_e164, bio: Faker::Lorem.paragraph(sentence_count: 2), bg_color: Faker::Color.hex_color, remote_photo_url: Faker::Avatar.image
end

puts "===> 1"

i = Interest.create name: "Sports"
i.interest_objects.create name: "Soccer"
i.interest_objects.create name: "Basketball"
i.interest_objects.create name: "Tenis"
i.interest_objects.create name: "Golf"


puts "===> 2"
i2 = Interest.create name: "Reading"
(1..5).each do |x|
  i2.interest_objects.create name: Faker::Book.title
end

puts "===> 3"
i3 = Interest.create name: "Business"
i3.interest_objects.create name: "Agro"
i3.interest_objects.create name: "Construction"
i3.interest_objects.create name: "E-learning"
i3.interest_objects.create name: "Finances"


puts "===> 4"
i4 = Interest.create name: "Freelancing"
i4.interest_objects.create name: "Full-time"
i4.interest_objects.create name: "half-time"
i4.interest_objects.create name: "Improving"
i4.interest_objects.create name: "Bla"

puts "===> 5"
i5 = Interest.create name: "Coding"
i5.interest_objects.create name: "JS"
i5.interest_objects.create name: "PHP"
i5.interest_objects.create name: "Ruby"
i5.interest_objects.create name: "Java"

puts "===> 6"

User.all.each do |u|
  i = Interest.order('RANDOM()').first
  u.user_interests.create interest_id: i.id

  io = InterestObject.where(interest_id: i.id).order('RANDOM()').first
  u.user_interest_objects.create interest_object_id: io.id
end
