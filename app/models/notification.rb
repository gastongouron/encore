class Notification < ApplicationRecord
	default_scope { order("created_at DESC") }
	belongs_to :user

	def read!
		self.read = true
		self.save!
	end

end
