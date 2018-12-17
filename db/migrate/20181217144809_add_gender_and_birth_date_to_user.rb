class AddGenderAndBirthDateToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :gender, :string
    add_column :users, :birth_date, :date
  end
end
