class Artist < ApplicationRecord
	has_many :reviews
	has_many :users, through: :reviews
	acts_as_taggable

	def score
		scores = []
		Review.where(artist_id: self.id).each{ |r| scores << r.score }
		score = scores.empty? ? 0 : scores.inject{ |sum, el| sum + el }.to_f / scores.size
	end

end
