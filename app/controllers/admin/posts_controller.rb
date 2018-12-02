module Admin
  class PostsController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # you can overwrite any of the RESTful actions. For example:
    #
    def index
      super
      @resources = Post.
        page(params[:page]).
        per(10)
    end

    # Define a custom finder by overriding the `find_resource` method:

    def update
        super
        img = params["post"]["image_url"]
        if img
            puts '---------------------------------------------'
            puts params["post"]["original_filename"]
            puts '---------------------------------------------'
            puts img
            puts '---------------------------------------------'
            File.open(Rails.root.join('public', 'uploads', img.original_filename), 'wb') do |file|
              file.write(img.read)
            end
        end
      # post = Post.find(params[:id])
      #   puts '-------------'
      #   puts params
      # post.update(params["post"])
    end

  end
end
