# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181217164620) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.text "description_en"
    t.text "description_fr"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_url"
    t.string "profile_picture_url"
    t.string "cover_url"
    t.string "mbid"
  end

  create_table "follows", force: :cascade do |t|
    t.string "followable_type", null: false
    t.bigint "followable_id", null: false
    t.string "follower_type", null: false
    t.bigint "follower_id", null: false
    t.boolean "blocked", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followable_id", "followable_type"], name: "fk_followables"
    t.index ["followable_type", "followable_id"], name: "index_follows_on_followable_type_and_followable_id"
    t.index ["follower_id", "follower_type"], name: "fk_follows"
    t.index ["follower_type", "follower_id"], name: "index_follows_on_follower_type_and_follower_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "user_id"
    t.integer "follower_id"
    t.integer "artist_id"
    t.integer "author_id"
    t.boolean "read", default: false
    t.string "kind"
    t.string "follower_display_name"
    t.string "artist_name"
    t.string "author_display_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.string "author"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.float "score"
    t.string "body"
    t.integer "user_id"
    t.integer "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "media"
    t.float "generosity"
    t.float "technics"
    t.float "ambiant"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.text "profile_picture", default: "data:image/png;base64,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"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "locale", default: "en", null: false
    t.string "gender"
    t.date "birth_date"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
