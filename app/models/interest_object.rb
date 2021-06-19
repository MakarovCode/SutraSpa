class InterestObject < ApplicationRecord
  belongs_to :interest

  has_many :user_interest_objects
  has_many :users, through: :user_interest_objects
end
