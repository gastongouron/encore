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
    def create
        super
    end

    def update
        super
        img = params["post"]["image_url"]    
        if img

            bucket = Rails.env.development? ? ENV['S3_BUCKET_DEVELOPMENT'] : ENV['S3_BUCKET_PRODUCTION']

            storage = Fog::Storage.new(
                provider: 'AWS',
                aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
                region: ENV['AWS_REGION'],
                path_style: true
            )

            path = "blog/post#{params[:id]}/#{img.original_filename}"
            public_url = "https://#{bucket}.s3.amazonaws.com/#{path}"
            directory = storage.directories.get(bucket)
            uploaded = directory.files.create( key: path, body: img, public: true)
            post = Post.find(params[:id])
            post.image_url = public_url
            puts post.image_url
            post.save!
    
        end

    end

  end
end
