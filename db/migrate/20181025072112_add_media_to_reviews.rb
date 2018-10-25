class AddMediaToReviews < ActiveRecord::Migration[5.1]
  def change
	add_column :reviews, :media, :string
  end
end
