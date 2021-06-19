object @interests

attributes :id, :name

node :selected do |interest|
  interest.users.pluck(:id).include?(@user.id)
end

child interest_objects: :objects do
  attributes :id, :name

  node :selected do |obj|
    obj.users.pluck(:id).include?(@user.id)
  end
end
