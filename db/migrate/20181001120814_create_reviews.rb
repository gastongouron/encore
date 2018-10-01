class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :score
      t.string :body
      t.integer :user_id
      t.integer :artist_id
      t.timestamps
    end
  end
end
