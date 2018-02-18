class Group < ApplicationRecord
  has_many :member
  has_many :users, through: :members
  validates :name, presence: true
end
