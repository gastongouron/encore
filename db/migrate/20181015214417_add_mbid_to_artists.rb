class AddMbidToArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :mbid, :string
  end
end
