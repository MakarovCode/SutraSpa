class UserInterestObject < ApplicationRecord
  belongs_to :user
  belongs_to :interest_object
end
