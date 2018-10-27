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

	def author_display_name
		return self.user.display_name
	end

	def author_profile_picture
		return self.user.profile_picture
	end

	def artist_profile_picture
		return self.artist.profile_picture_url
	end

end

