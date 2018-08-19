class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
  validates :user, presence: true
  validates :group, presence: true
  mount_uploader :image, ImageUploader
end
