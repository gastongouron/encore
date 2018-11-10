class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.integer :follower_id
      t.integer :artist_id
      t.integer :author_id
      t.boolean :read, default: false
      t.string :kind
      t.string :follower_display_name
      t.string :artist_name
      t.string :author_display_name

      t.timestamps
    end
  end
end
