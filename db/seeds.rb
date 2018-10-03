uid = 0
aid = 0
rid = 0

5.times do 
	User.create(email:"test#{uid}@mail.com", password:"password")
	puts "-> user_#{uid} has been created"
	uid += 1
end

artists = []
50.times do 
	artists << Artist.create(name: "artist#{aid}", description: 'Artist description')
	puts "-> artist_#{aid} has been created"
	aid += 1
end

artists.each do |a| 
	User.where(id: User.pluck(:id).sample(3)).each do |u|
		Review.create(body: "Review #{rid}", artist_id: a.id, user_id: u.id )
		puts "-> review_#{rid} has been created by user_#{u.id} for artist_#{a.id}"
		rid += 1
	end
end