uid = 1
aid = 1
rid = 1

5.times do 
	user = User.new
	user.first_name = Faker::Name.first_name
	user.last_name  = Faker::Name.last_name
	user.email		= "test#{uid}@mail.com"
	user.password	= "password"
	# user.skip_confirmation!
	user.save

	puts "-> user_#{uid} has been created"
	uid += 1
end

Artist.all.each do |a| 
	User.where(id: User.pluck(:id).sample(rand(1..5))).each do |u|
		Review.create(
			body: Faker::Lorem.paragraph(rand(5..10)), 
			artist_id: a.id, 
			user_id: u.id,
			score: rand(1..5)
		)
		puts "-> review_#{rid} has been created by user_#{u.id} for artist_#{a.id}"
		rid += 1
	end
end