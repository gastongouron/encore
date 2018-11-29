class Notification < ApplicationRecord
	default_scope { order("created_at DESC") }
	belongs_to :user

	def read!
		self.read = true
		self.save!
	end

	def picture
		id = self.author_id? ? self.author_id : self.follower_id
		User.find(id.to_i).profile_picture
	end

end
