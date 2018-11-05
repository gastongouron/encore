class Notification < ApplicationRecord
	belongs_to :user

	def read!
		self.read = true
		self.save!
	end

end
