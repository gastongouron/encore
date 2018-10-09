uid = 0
aid = 0
rid = 0

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

artists = []
30.times do 
	artists << Artist.create(
		name: Faker::Artist.unique.name,
		description: Faker::GreekPhilosophers.quote
	)
	puts "-> artist_#{aid} has been created"
	aid += 1
end

artists.each do |a| 
	User.where(id: User.pluck(:id).sample(3)).each do |u|
		Review.create(
			body: Faker::Hacker.say_something_smart, 
			artist_id: a.id, 
			user_id: u.id,
			score: rand(1..100)
		)
		puts "-> review_#{rid} has been created by user_#{u.id} for artist_#{a.id}"
		rid += 1
	end
end