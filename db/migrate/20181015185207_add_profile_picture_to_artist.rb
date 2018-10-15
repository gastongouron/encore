class AddProfilePictureToArtist < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :avatar_url, :string  	
    add_column :artists, :profile_picture_url, :string
    add_column :artists, :cover_url, :string
  end
end
