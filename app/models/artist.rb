class Artist < ApplicationRecord
	has_many :reviews
	has_many :users, through: :reviews
	acts_as_taggable 

	def score
		scores = []
		self.reviews.each{ |r| scores << r.score }
		score = scores.empty? ? 0 : scores.inject{ |sum, el| sum + el }.to_f / scores.size
		score.round(1)
	end

	def reviews_count
		self.reviews.count
	end

	def tags
		self.tag_list
	end

	# def is_a_star
	# 	self.tag_list.include?('Most reviewed')
	# end

	# def check_if_most_reviewed
	# 	if Artist.joins(:reviews).group('artists.id').order('count(reviews.id) desc').limit(3).include?(self)
	# 		puts "#{self.name} IS IN TOP!"
	# 		self.is_a_star ? return : self.tag_list.add("Most reviewed")
	# 	else
	# 		puts "#{self.name} IS Not IN TOP anymore!"
	# 		self.is_a_star ? self.tag_list.remove("Most reviewed") : return
	# 	end
	# 	self.save
	# end

end


# Artist.all.each do |artist|
# if artist.tag_list.include?('Most reviewed')
# artist.tag_list.remove('Most reviewed')
# artist.save
# end
# end