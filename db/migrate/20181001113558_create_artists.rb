class CreateArtists < ActiveRecord::Migration[5.1]
  def change
    create_table :artists do |t|
      t.string :name
      t.text :description_en
      t.text :description_fr
      t.timestamps
    end
  end
end
