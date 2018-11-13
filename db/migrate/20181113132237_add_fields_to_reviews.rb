class AddFieldsToReviews < ActiveRecord::Migration[5.1]
  def change
    add_column :reviews, :generosity, :float
    add_column :reviews, :technics, :float
    add_column :reviews, :ambiant, :float
  end
end
