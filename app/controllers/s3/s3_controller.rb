class S3::S3Controller < ApiController

  def create
    user_id = params[:user_id]
    artist_id = params[:artist_id]
    filename = params[:objectName]
    content_type = params[:contentType]

    bucket = Rails.env.development? ? ENV['S3_BUCKET_DEVELOPMENT'] : ENV['S3_BUCKET_PRODUCTION']

    folder = "user_uploads/#{user_id}/reviews/#{artist_id}"
    target_path = "#{folder}/#{filename}"

    options = {path_style: true}

    headers = {"Content-Type" => params[:contentType], 
               "x-amz-acl" => "public-read"}




    storage = Fog::Storage.new(
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['AWS_REGION']
    )

    get_files(storage, folder, bucket)
    
    bucket_url = storage.put_object_url(bucket, target_path, 15.minutes.from_now.to_time.to_i, headers, options)
    public_url = "https://#{bucket}.s3.amazonaws.com/user_uploads/#{user_id}/reviews/#{artist_id}/#{filename}"

    render json: { signedUrl: bucket_url, public: public_url } 

  end

  # todo: get other files and delete them later on review Save
  def get_files(storage, path, bucket)
    storage.directories.get(bucket, prefix: path).files.map do |file|
      puts file.key
    end
  end



end