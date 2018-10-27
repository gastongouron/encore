class Artist < ApplicationRecord
	has_many :reviews
	has_many :users, through: :reviews
	acts_as_taggable # comment if u need to generate admin views

	def score
		scores = []
		self.reviews.each{ |r| scores << r.score }
		score = scores.empty? ? 0 : scores.inject{ |sum, el| sum + el }.to_f / scores.size
		score.round(1)
	end

	def review_count
		self.reviews.count
	end

	def tags
		self.tag_list
	end

end
