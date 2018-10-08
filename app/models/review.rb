class SingleReviewValidator < ActiveModel::Validator  
	def validate(record)
		if record.artist.reviews.where(user_id: record.user.id).length >= 2
		  record.errors[:validation] << 'only one per person per artist'
		end
	end
end

class Review < ApplicationRecord
	include ActiveModel::Validations	
	validates_with SingleReviewValidator
	belongs_to :artist
	belongs_to :user

	def artist_name
		return self.artist.name
	end

end

