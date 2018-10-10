class Artist < ApplicationRecord
	has_many :reviews
	has_many :users, through: :reviews

	def score
		scores = []
		Review.where(id: self.id).each{ |r| scores << r.score }
		scores.empty? ? 0 : scores.inject{ |sum, el| sum + el }.to_f / scores.size
	end

end
