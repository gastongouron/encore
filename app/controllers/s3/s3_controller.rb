class S3::S3Controller < ApiController

  def create
    user_id = params[:user_id]
    artist_id = params[:artist_id]
    filename = params[:objectName]
    content_type = params[:contentType]

    target_path = "user_uploads/#{user_id}/reviews/#{artist_id}/#{filename}"

    options = {path_style: true}
    headers = {"Content-Type" => params[:contentType], 
               "x-amz-acl" => "public-read"}

    storage = Fog::Storage.new(
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['AWS_REGION']
    )
    
    bucket_url = storage.put_object_url(ENV['S3_BUCKET'], target_path, 15.minutes.from_now.to_time.to_i, headers, options)
    public_url = "https://#{ENV['S3_BUCKET']}.s3.amazonaws.com/user_uploads/#{user_id}/reviews/#{artist_id}/#{filename}"

    render json: { signedUrl: bucket_url, public: public_url } 

    # associate to an unexisting review oO?
    # store the link to the resource somewhere and associate it to review?

  end



end