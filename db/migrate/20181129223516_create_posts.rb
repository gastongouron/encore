class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.string :author
      t.string :image_url
      t.timestamps
    end
  end
end
